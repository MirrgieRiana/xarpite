package mirrg.xarpite.compilers.objects

import mirrg.xarpite.mounts.usage

class FluoriteNativeException(val throwable: Throwable) : FluoriteValue {
    companion object {
        val fluoriteClass by lazy {
            FluoriteObject(
                FluoriteValue.fluoriteClass, mutableMapOf(
                    "message" to FluoriteFunction.immediate { arguments ->
                        if (arguments.size != 1) usage("EXCEPTION::message(): STRING | NULL")
                        val exception = arguments[0] as FluoriteNativeException
                        exception.throwable.message?.toFluoriteString() ?: FluoriteNull
                    },
                )
            )
        }
    }

    override fun toString() = throwable.message ?: throwable.toString()
    override val parent get() = fluoriteClass
}
