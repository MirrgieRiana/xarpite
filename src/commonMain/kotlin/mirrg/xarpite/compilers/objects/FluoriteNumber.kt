package mirrg.xarpite.compilers.objects

import com.ionspin.kotlin.bignum.decimal.toBigDecimal
import mirrg.xarpite.OperatorMethod
import mirrg.xarpite.toFluoriteIntAsCompared
import kotlin.math.roundToInt

interface FluoriteNumber : FluoriteValue {
    fun toInt(): Int
    fun toDouble(): Double
    fun negate(): FluoriteNumber
    fun roundToInt(): Int
}

data class FluoriteInt(val value: Int) : FluoriteNumber {
    companion object {
        val fluoriteClass by lazy {
            FluoriteObject(
                FluoriteValue.fluoriteClass, mutableMapOf(
                    OperatorMethod.TO_NUMBER.methodName to FluoriteFunction { it[0] as FluoriteInt },
                    OperatorMethod.TO_BOOLEAN.methodName to FluoriteFunction { ((it[0] as FluoriteInt).value != 0).toFluoriteBoolean() },
                    OperatorMethod.PLUS.methodName to FluoriteFunction { arguments ->
                        val left = arguments[0] as FluoriteInt
                        when (val right = arguments[1]) {
                            is FluoriteInt -> FluoriteInt(left.value + right.value)
                            is FluoriteDouble -> FluoriteDouble(left.value + right.value)
                            else -> throw IllegalArgumentException("Can not convert to number: ${right::class}")
                        }
                    },
                    OperatorMethod.COMPARE.methodName to FluoriteFunction { arguments ->
                        val left = arguments[0] as FluoriteInt
                        when (val right = arguments[1]) {
                            is FluoriteInt -> left.value.compareTo(right.value).toFluoriteIntAsCompared()
                            is FluoriteDouble -> left.value.compareTo(right.value).toFluoriteIntAsCompared()
                            else -> throw IllegalArgumentException("Can not convert to number: ${right::class}")
                        }
                    },
                )
            )
        }
        val MINUS_ONE = FluoriteInt(-1)
        val ZERO = FluoriteInt(0)
        val ONE = FluoriteInt(1)
    }

    override fun toString() = value.toString()
    override val parent get() = fluoriteClass
    override fun toInt() = value
    override fun toDouble() = value.toDouble()
    override fun negate() = FluoriteInt(-value)
    override fun roundToInt() = value
}

data class FluoriteDouble(val value: Double) : FluoriteNumber {
    companion object {
        val fluoriteClass by lazy {
            FluoriteObject(
                FluoriteValue.fluoriteClass, mutableMapOf(
                    OperatorMethod.TO_NUMBER.methodName to FluoriteFunction { it[0] as FluoriteDouble },
                    OperatorMethod.TO_BOOLEAN.methodName to FluoriteFunction { ((it[0] as FluoriteDouble).value != 0.0).toFluoriteBoolean() },
                    OperatorMethod.PLUS.methodName to FluoriteFunction { arguments ->
                        val left = arguments[0] as FluoriteDouble
                        when (val right = arguments[1]) {
                            is FluoriteInt -> FluoriteDouble(left.value + right.value)
                            is FluoriteDouble -> FluoriteDouble(left.value + right.value)
                            else -> throw IllegalArgumentException("Can not convert to number: ${right::class}")
                        }
                    },
                    OperatorMethod.COMPARE.methodName to FluoriteFunction { arguments ->
                        val left = arguments[0] as FluoriteDouble
                        when (val right = arguments[1]) {
                            is FluoriteInt -> left.value.compareTo(right.value).toFluoriteIntAsCompared()
                            is FluoriteDouble -> left.value.compareTo(right.value).toFluoriteIntAsCompared()
                            else -> throw IllegalArgumentException("Can not convert to number: ${right::class}")
                        }
                    },
                )
            )
        }
        val ZERO = FluoriteDouble(0.0)
    }

    override fun toString() = value.toString()
    override val parent get() = fluoriteClass
    override fun toInt() = value.toBigDecimal().intValue(true)
    override fun toDouble() = value
    override fun negate() = FluoriteDouble(-value)
    override fun roundToInt() = value.roundToInt()
}

fun String.toFluoriteNumber(): FluoriteNumber {
    fun toFluoriteDouble() = when (val double = this.toDoubleOrNull()) {
        null -> throw IllegalArgumentException("Cannot convert to number: ${if (this.length > 20) "${this.take(20)}..." else this}")
        0.0 -> FluoriteDouble.ZERO
        else -> FluoriteDouble(double)
    }
    return when {
        "." !in this -> when (val int = this.toIntOrNull()) {
            0 -> FluoriteInt.ZERO
            1 -> FluoriteInt.ONE
            null -> toFluoriteDouble()
            else -> FluoriteInt(int)
        }

        else -> toFluoriteDouble()
    }
}
