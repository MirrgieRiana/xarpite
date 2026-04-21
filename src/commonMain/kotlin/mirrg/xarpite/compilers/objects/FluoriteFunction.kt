package mirrg.xarpite.compilers.objects

import mirrg.xarpite.OperatorMethod

class FluoriteFunction private constructor(private val function: suspend (Array<suspend () -> FluoriteValue>) -> FluoriteValue) : FluoriteValue {
    companion object {
        val fluoriteClass by lazy {
            FluoriteObject(
                FluoriteValue.fluoriteClass, mutableMapOf(
                    OperatorMethod.CALL.methodName to immediate { arguments ->
                        val function = arguments[0] as FluoriteFunction
                        val arguments1 = arguments.sliceArray(1 until arguments.size)
                        function.callImmediate(arguments1)
                    },
                    OperatorMethod.SET_CALL.methodName to immediate { arguments ->
                        val function = arguments[0] as FluoriteFunction
                        val arguments1 = arguments.sliceArray(1 until arguments.size)
                        function.callImmediate(arguments1)
                    },
                    OperatorMethod.BIND.methodName to immediate { arguments ->
                        val function = arguments[0] as FluoriteFunction
                        val arguments1 = arguments.sliceArray(1 until arguments.size)
                        immediate { arguments2 ->
                            function.callImmediate(arguments1 + arguments2)
                        }
                    },
                )
            )
        }

        fun create(function: suspend (Array<suspend () -> FluoriteValue>) -> FluoriteValue) = FluoriteFunction(function)
        fun immediate(function: suspend (Array<FluoriteValue>) -> FluoriteValue) = FluoriteFunction { arguments -> function(arguments.map { it() }.toTypedArray()) }
    }

    override val parent get() = fluoriteClass

    suspend fun call(arguments: Array<suspend () -> FluoriteValue>) = function(arguments)
    suspend fun callImmediate(arguments: Array<FluoriteValue>) = function(arguments.map { suspend { it } }.toTypedArray())
}
