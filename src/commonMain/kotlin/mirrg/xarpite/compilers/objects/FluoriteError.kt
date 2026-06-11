package mirrg.xarpite.compilers.objects

import mirrg.xarpite.OperatorMethod
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
                )
            )
        }
    }

    override fun toString() = throwable.message ?: throwable.toString()
    override val parent get() = fluoriteClass
}
