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
                        @OptIn(ExperimentalUnsignedTypes::class)
                        suspend fun processItem(item: FluoriteValue): UByteArray {
                            return when (item) {
                                is FluoriteArray -> {
                                    UByteArray(item.values.size) { i ->
                                        val number = item.values[i]
                                        number as? FluoriteNumber ?: throw IllegalArgumentException("Invalid element for BLOB: array[$i]: ${"$number".truncate(20)}")
                                        number.roundToInt().toUByte()
                                    }
                                }
                                is FluoriteBlob -> {
                                    item.value.copyOf()
                                }
                                else -> throw IllegalArgumentException("Invalid argument for BLOB.of: ${"$item".truncate(20)}")
                            }
                        }

                        @OptIn(ExperimentalUnsignedTypes::class)
                        if (arguments.size == 1) {
                            val arg = arguments[0]
                            // Handle stream case
                            if (arg is FluoriteStream) {
                                val allBytes = mutableListOf<UByte>()
                                arg.collect { item ->
                                    allBytes.addAll(processItem(item).toList())
                                }
                                allBytes.toUByteArray().asFluoriteBlob()
                            } else {
                                // Handle single array or BLOB
                                processItem(arg).asFluoriteBlob()
                            }
                        } else {
                            usage("BLOB.of(array: STREAM<BLOB | ARRAY<NUMBER>>): BLOB")
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
