package mirrg.xarpite.compilers.objects

import mirrg.xarpite.OperatorMethod

enum class FluoriteBoolean(val value: Boolean) : FluoriteValue {
    TRUE(true),
    FALSE(false),
    ;

    companion object {
        val fluoriteClass by lazy {
            FluoriteObject(
                FluoriteValue.fluoriteClass, mutableMapOf(
                    OperatorMethod.TO_NUMBER.methodName to FluoriteFunction { if ((it[0] as FluoriteBoolean).value) FluoriteInt.ONE else FluoriteInt.ZERO },
                    OperatorMethod.TO_BOOLEAN.methodName to FluoriteFunction { it[0] as FluoriteBoolean },
                )
            )
        }
    }

    override fun toString() = if (value) "TRUE" else "FALSE"
    override val parent get() = fluoriteClass
    fun not() = if (value) FALSE else TRUE
}

fun Boolean.toFluoriteBoolean() = if (this) FluoriteBoolean.TRUE else FluoriteBoolean.FALSE
