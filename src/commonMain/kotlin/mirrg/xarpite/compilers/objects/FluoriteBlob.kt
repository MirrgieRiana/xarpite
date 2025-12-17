package mirrg.xarpite.compilers.objects

import mirrg.kotlin.helium.truncate
import mirrg.xarpite.OperatorMethod
import mirrg.xarpite.mounts.usage
import mirrg.xarpite.operations.FluoriteException
import okio.Buffer
import okio.use

class FluoriteBlob @OptIn(ExperimentalUnsignedTypes::class) constructor(val value: UByteArray) : FluoriteValue {
    companion object {
        val fluoriteClass by lazy {
            FluoriteObject(
                FluoriteValue.fluoriteClass, mutableMapOf(
                    "of" to FluoriteFunction { arguments ->
                        if (arguments.size == 1) {
                            aggregateToBlob(arguments[0])
                        } else {
                            usage("BLOB.of(array: STREAM<NUMBER | ARRAY<NUMBER> | BLOB>): BLOB")
                        }
                    },
                    OperatorMethod.TO_STRING.methodName to FluoriteFunction { arguments ->
                        @OptIn(ExperimentalUnsignedTypes::class)
                        val byteArray = (arguments[0] as FluoriteBlob).value
                        val sb = StringBuilder()
                        sb.append("BLOB[")
                        @OptIn(ExperimentalUnsignedTypes::class)
                        byteArray.forEachIndexed { i, value ->
                            if (i != 0) sb.append(';')
                            sb.append(value)
                        }
                        sb.append(']')
                        sb.toString().toFluoriteString()
                    },
                    // BLOB::toArray(): ARRAY<INT>
                    "toArray" to FluoriteFunction { arguments ->
                        @OptIn(ExperimentalUnsignedTypes::class)
                        val byteArray = (arguments[0] as FluoriteBlob).value
                        @OptIn(ExperimentalUnsignedTypes::class)
                        byteArray.map { FluoriteInt(it.toInt()) }.toFluoriteArray()
                    },
                )
            )
        }
    }

    @OptIn(ExperimentalUnsignedTypes::class)
    override fun toString() = "FluoriteBlob(size=${value.size})"
    override val parent get() = fluoriteClass
}

@OptIn(ExperimentalUnsignedTypes::class)
fun UByteArray.asFluoriteBlob() = FluoriteBlob(this)

/**
 * Aggregates one or more FluoriteValues (NUMBER, ARRAY<NUMBER>, or BLOB) into a single FluoriteBlob.
 * 
 * - If the value is a FluoriteNumber, it is rounded to an integer and the lower 8 bits are written to the blob.
 * - If the value is a FluoriteArray, each element (must be a FluoriteNumber) is processed as above.
 * - If the value is a FluoriteBlob, its bytes are copied directly to the result.
 * - If the value is a FluoriteStream, each element is processed recursively.
 * - Any other type throws a FluoriteException.
 *
 * @param value The FluoriteValue to aggregate into a blob
 * @return A new FluoriteBlob containing the aggregated bytes
 */
suspend fun aggregateToBlob(value: FluoriteValue): FluoriteBlob {
    return Buffer().use { buffer ->
        fun processItem(item: FluoriteValue) {
            when (item) {
                is FluoriteNumber -> {
                    buffer.writeByte(item.roundToInt())
                }

                is FluoriteArray -> {
                    item.values.forEach { value ->
                        value as? FluoriteNumber ?: throw FluoriteException("Invalid element for BLOB: ${"$value".truncate(20)}".toFluoriteString())
                        buffer.writeByte(value.roundToInt())
                    }
                }

                is FluoriteBlob -> {
                    @OptIn(ExperimentalUnsignedTypes::class)
                    buffer.write(item.value.asByteArray())
                }

                else -> throw FluoriteException("Invalid element for BLOB: ${"$item".truncate(20)}".toFluoriteString())
            }
        }
        
        if (value is FluoriteStream) {
            value.collect { item ->
                processItem(item)
            }
        } else {
            processItem(value)
        }
        
        @OptIn(ExperimentalUnsignedTypes::class)
        buffer.readByteArray().asUByteArray().asFluoriteBlob()
    }
}
