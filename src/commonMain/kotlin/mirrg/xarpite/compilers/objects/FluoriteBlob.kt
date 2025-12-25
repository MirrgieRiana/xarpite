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
                        sb.append("BLOB.of([")
                        @OptIn(ExperimentalUnsignedTypes::class)
                        byteArray.forEachIndexed { i, value ->
                            if (i != 0) sb.append(';')
                            sb.append(value)
                        }
                        sb.append("])")
                        sb.toString().toFluoriteString()
                    },
                    OperatorMethod.GET_LENGTH.methodName to FluoriteFunction { arguments ->
                        @OptIn(ExperimentalUnsignedTypes::class)
                        val blob = arguments[0] as FluoriteBlob
                        FluoriteInt(blob.value.size)
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

private suspend fun aggregateValueToBytes(value: FluoriteValue): ByteArray {
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

        buffer.readByteArray()
    }
}

suspend fun aggregateToBlob(value: FluoriteValue): FluoriteBlob {
    val bytes = aggregateValueToBytes(value)
    @OptIn(ExperimentalUnsignedTypes::class)
    return bytes.asUByteArray().asFluoriteBlob()
}

suspend fun iterateBlobs(value: FluoriteValue, callback: suspend (ByteArray) -> Unit) {
    if (value is FluoriteStream) {
        value.collect { item ->
            callback(aggregateValueToBytes(item))
        }
    } else {
        callback(aggregateValueToBytes(value))
    }
}
