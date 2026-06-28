package mirrg.xarpite.compilers.objects

import mirrg.xarpite.OperatorMethod

object FluoriteNull : FluoriteValue {
    val fluoriteClass by lazy {
        FluoriteObject(
            FluoriteValue.fluoriteClass, mutableMapOf(
                OperatorMethod.TO_NUMBER.methodName to FluoriteFunction.immediate { FluoriteInt.ZERO },
                OperatorMethod.TO_BOOLEAN.methodName to FluoriteFunction.immediate { FluoriteBoolean.FALSE },
            )
        )
    }
    override val parent = fluoriteClass
    override fun toString() = "NULL"
    override fun strictEquals(other: FluoriteValue) = this == other
}
