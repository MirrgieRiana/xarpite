package mirrg.xarpite.compilers.objects

import mirrg.kotlin.helium.truncate
import mirrg.xarpite.OperatorMethod
import mirrg.xarpite.mounts.usage

class FluoriteBlob @OptIn(ExperimentalUnsignedTypes::class) constructor(val value: UByteArray) : FluoriteValue {
    companion object {
        val fluoriteClass by lazy {
            FluoriteObject(
                FluoriteValue.fluoriteClass, mutableMapOf(
                    "of" to FluoriteFunction { arguments ->
                        if (arguments.size == 1) {
                            val array = arguments[0]
                            if (array is FluoriteArray) {
                                @OptIn(ExperimentalUnsignedTypes::class)
                                val byteArray = UByteArray(array.values.size) { i ->
                                    val number = array.values[i]
                                    number as? FluoriteNumber ?: throw IllegalArgumentException("Invalid element for BLOB: array[$i]: ${"$number".truncate(20)}")
                                    number.roundToInt().toUByte()
                                }
                                @OptIn(ExperimentalUnsignedTypes::class)
                                return@FluoriteFunction byteArray.asFluoriteBlob()
                            }
                        }
                        usage("BLOB.of(array: ARRAY<NUMBER>): BLOB")
                    },
                    OperatorMethod.TO_STRING.methodName to FluoriteFunction { arguments ->
                        @OptIn(ExperimentalUnsignedTypes::class)
                        val byteArray = (arguments[0] as FluoriteBlob).value
                        val sb = StringBuilder()
                        sb.append('[')
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
