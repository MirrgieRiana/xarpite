package mirrg.xarpite.compilers.objects

import mirrg.xarpite.OperatorMethod
import mirrg.xarpite.mounts.usage
import mirrg.xarpite.operations.FluoriteException

class FluoriteError(val throwable: Throwable) : FluoriteValue {
    companion object {
        val fluoriteClass by lazy {
            FluoriteObject(
                FluoriteValue.fluoriteClass, mutableMapOf(
                    OperatorMethod.PROPERTY.methodName to FluoriteFunction.immediate { arguments ->
                        val error = arguments[0] as FluoriteError
                        val key = arguments[1].toFluoriteString(null).value
                        when (key) {
                            "message" -> error.throwable.message?.toFluoriteString() ?: FluoriteNull
                            else -> throw FluoriteException("No such property: $key".toFluoriteString())
                        }
                    },
                    "throwNativeError" to FluoriteFunction.immediate { arguments ->
                        if (arguments.size != 1) usage("ERROR.throwNativeError(message: STRING): NOTHING")
                        val message = arguments[0].toFluoriteString(null).value
                        throw RuntimeException(message)
                    },
                )
            )
        }
    }

    override fun toString() = throwable.message ?: throwable.toString()
    override val parent get() = fluoriteClass
}

fun Throwable.toFluoriteValue(): FluoriteValue = if (this is FluoriteException) this.value else FluoriteError(this)
fun FluoriteValue.toThrowable(): Throwable = if (this is FluoriteError) this.throwable else FluoriteException(this)
