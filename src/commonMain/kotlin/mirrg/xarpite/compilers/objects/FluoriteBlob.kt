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
                // BLOBクラスオブジェクト自身を呼び出し可能にするため、CALLを提供するメタクラスを親に挟むのだ
                FluoriteObject(
                    FluoriteValue.fluoriteClass, mutableMapOf(
                        OperatorMethod.CALL.methodName to FluoriteFunction.immediate { arguments ->
                            val receiver = arguments[0]
                            if (arguments.size == 2) {
                                arguments[1].toBlobAsBlobLike()
                            } else if (arguments.size == 1 && receiver is FluoriteBlob) {
                                // BLOBインスタンスの引数なし呼び出しで、各バイトのストリームを返すのだ
                                FluoriteStream {
                                    @OptIn(ExperimentalUnsignedTypes::class)
                                    receiver.value.forEach { emit(FluoriteInt(it.toInt())) }
                                }
                            } else {
                                usage("BLOB(array: STREAM<NUMBER | ARRAY<NUMBER> | BLOB>): BLOB")
                            }
                        },
                    )
                ), mutableMapOf(
                    "of" to FluoriteFunction.immediate { arguments ->
                        if (arguments.size == 1) {
                            arguments[0].toBlobAsBlobLike()
                        } else {
                            usage("BLOB.of(array: STREAM<NUMBER | ARRAY<NUMBER> | BLOB>): BLOB")
                        }
                    },
                    OperatorMethod.TO_STRING.methodName to FluoriteFunction.immediate { arguments ->
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
                    OperatorMethod.GET_LENGTH.methodName to FluoriteFunction.immediate { arguments ->
                        @OptIn(ExperimentalUnsignedTypes::class)
                        val blob = arguments[0] as FluoriteBlob
                        FluoriteInt(blob.value.size)
                    },
                    // BLOB::toArray(): ARRAY<INT>
                    "toArray" to FluoriteFunction.immediate { arguments ->
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
    override fun strictEquals(other: FluoriteValue) = this === other
}

@OptIn(ExperimentalUnsignedTypes::class)
fun UByteArray.asFluoriteBlob() = FluoriteBlob(this)

@OptIn(ExperimentalUnsignedTypes::class)
fun ByteArray.asFluoriteBlob() = this.asUByteArray().asFluoriteBlob()

suspend fun FluoriteValue.toByteArrayAsBlobLike(): ByteArray {
    return Buffer().use { buffer ->
        fun processItem(item: FluoriteValue) {
            when (item) {
                is FluoriteNumber -> {
                    buffer.writeByte(item.roundToInt())
                }

                is FluoriteArray -> {
                    item.values.forEach { value ->
                        processItem(value)
                    }
                }

                is FluoriteBlob -> {
                    @OptIn(ExperimentalUnsignedTypes::class)
                    buffer.write(item.value.asByteArray())
                }

                else -> throw FluoriteException("Invalid element for BLOB: ${"$item".truncate(20)}".toFluoriteString())
            }
        }

        if (this is FluoriteStream) {
            this.collect { item ->
                processItem(item)
            }
        } else {
            processItem(this)
        }

        buffer.readByteArray()
    }
}

suspend fun FluoriteValue.toBlobAsBlobLike() = toByteArrayAsBlobLike().asFluoriteBlob()

suspend fun iterateBlobs(value: FluoriteValue, callback: suspend (ByteArray) -> Unit) {
    if (value is FluoriteStream) {
        value.collect { item ->
            callback(item.toByteArrayAsBlobLike())
        }
    } else {
        callback(value.toByteArrayAsBlobLike())
    }
}
