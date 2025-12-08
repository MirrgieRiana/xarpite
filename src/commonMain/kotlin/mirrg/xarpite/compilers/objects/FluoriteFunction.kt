package mirrg.xarpite.compilers.objects

import mirrg.xarpite.OperatorMethod

class FluoriteFunction(val function: suspend (Array<FluoriteValue>) -> FluoriteValue) : FluoriteValue {
    companion object {
        val fluoriteClass by lazy {
            FluoriteObject(
                FluoriteValue.fluoriteClass, mutableMapOf(
                    OperatorMethod.CALL.methodName to FluoriteFunction { arguments ->
                        val function = arguments[0] as FluoriteFunction
                        val arguments1 = arguments.sliceArray(1 until arguments.size)
                        function.function(arguments1)
                    },
                    OperatorMethod.SET_CALL.methodName to FluoriteFunction { arguments ->
                        val function = arguments[0] as FluoriteFunction
                        val arguments1 = arguments.sliceArray(1 until arguments.size)
                        function.function(arguments1)
                    },
                    OperatorMethod.BIND.methodName to FluoriteFunction { arguments ->
                        val function = arguments[0] as FluoriteFunction
                        val arguments1 = arguments.sliceArray(1 until arguments.size)
                        FluoriteFunction { arguments2 ->
                            function.function(arguments1 + arguments2)
                        }
                    },
                )
            )
        }
    }

    override val parent get() = fluoriteClass
}
