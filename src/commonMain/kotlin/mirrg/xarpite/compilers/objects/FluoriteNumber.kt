package mirrg.xarpite.compilers.objects

import com.ionspin.kotlin.bignum.decimal.toBigDecimal
import com.ionspin.kotlin.bignum.integer.BigInteger
import com.ionspin.kotlin.bignum.integer.toBigInteger
import mirrg.xarpite.OperatorMethod
import mirrg.xarpite.mounts.usage
import mirrg.xarpite.operations.FluoriteException
import mirrg.xarpite.toFluoriteIntAsCompared
import kotlin.math.abs
import kotlin.math.floor
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
                    OperatorMethod.TO_NUMBER.methodName to FluoriteFunction.immediate { it[0] as FluoriteInt },
                    OperatorMethod.TO_BOOLEAN.methodName to FluoriteFunction.immediate { ((it[0] as FluoriteInt).value != 0).toFluoriteBoolean() },
                    OperatorMethod.GET_LENGTH.methodName to FluoriteFunction.immediate { arguments ->
                        val number = arguments[0] as FluoriteInt
                        if (number.value == Int.MIN_VALUE) {
                            FluoriteDouble(abs(number.value.toDouble()))
                        } else {
                            FluoriteInt(abs(number.value))
                        }
                    },
                    OperatorMethod.PLUS.methodName to FluoriteFunction.immediate { arguments ->
                        val left = arguments[0] as FluoriteInt
                        when (val right = arguments[1]) {
                            is FluoriteInt -> FluoriteInt(left.value + right.value)
                            is FluoriteBig -> FluoriteBig(left.value.toBigInteger() + right.value)
                            is FluoriteDouble -> FluoriteDouble(left.value + right.value)
                            else -> throw IllegalArgumentException("Can not convert to number: ${right::class}")
                        }
                    },
                    OperatorMethod.MINUS.methodName to FluoriteFunction.immediate { arguments ->
                        val left = arguments[0] as FluoriteInt
                        when (val right = arguments[1]) {
                            is FluoriteInt -> FluoriteInt(left.value - right.value)
                            is FluoriteBig -> FluoriteBig(left.value.toBigInteger() - right.value)
                            is FluoriteDouble -> FluoriteDouble(left.value - right.value)
                            else -> throw IllegalArgumentException("Can not convert to number: ${right::class}")
                        }
                    },
                    OperatorMethod.COMPARE.methodName to FluoriteFunction.immediate { arguments ->
                        val left = arguments[0] as FluoriteInt
                        when (val right = arguments[1]) {
                            is FluoriteInt -> left.value.compareTo(right.value).toFluoriteIntAsCompared()
                            is FluoriteBig -> left.value.toBigInteger().compareTo(right.value).toFluoriteIntAsCompared()
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
    override fun strictEquals(other: FluoriteValue) = this == other
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
                    "of" to FluoriteFunction.immediate { arguments ->
                        if (arguments.size != 1) usage("DOUBLE.of(value: STRING | NUMBER): DOUBLE")
                        when (val argument = arguments[0]) {
                            is FluoriteString -> FluoriteDouble(argument.value.toDouble())
                            is FluoriteDouble -> argument
                            is FluoriteInt -> FluoriteDouble(argument.value.toDouble())
                            is FluoriteBig -> FluoriteDouble(argument.value.doubleValue(false))
                            else -> usage("DOUBLE.of(value: STRING | NUMBER): DOUBLE")
                        }
                    },
                    OperatorMethod.TO_NUMBER.methodName to FluoriteFunction.immediate { it[0] as FluoriteDouble },
                    OperatorMethod.TO_BOOLEAN.methodName to FluoriteFunction.immediate { ((it[0] as FluoriteDouble).value != 0.0).toFluoriteBoolean() },
                    OperatorMethod.GET_LENGTH.methodName to FluoriteFunction.immediate { arguments ->
                        val number = arguments[0] as FluoriteDouble
                        FluoriteDouble(abs(number.value))
                    },
                    OperatorMethod.PLUS.methodName to FluoriteFunction.immediate { arguments ->
                        val left = arguments[0] as FluoriteDouble
                        when (val right = arguments[1]) {
                            is FluoriteInt -> FluoriteDouble(left.value + right.value)
                            is FluoriteBig -> FluoriteDouble(left.value + right.value.doubleValue(false))
                            is FluoriteDouble -> FluoriteDouble(left.value + right.value)
                            else -> throw IllegalArgumentException("Can not convert to number: ${right::class}")
                        }
                    },
                    OperatorMethod.MINUS.methodName to FluoriteFunction.immediate { arguments ->
                        val left = arguments[0] as FluoriteDouble
                        when (val right = arguments[1]) {
                            is FluoriteInt -> FluoriteDouble(left.value - right.value)
                            is FluoriteBig -> FluoriteDouble(left.value - right.value.doubleValue(false))
                            is FluoriteDouble -> FluoriteDouble(left.value - right.value)
                            else -> throw IllegalArgumentException("Can not convert to number: ${right::class}")
                        }
                    },
                    OperatorMethod.COMPARE.methodName to FluoriteFunction.immediate { arguments ->
                        val left = arguments[0] as FluoriteDouble
                        when (val right = arguments[1]) {
                            is FluoriteInt -> left.value.compareTo(right.value).toFluoriteIntAsCompared()
                            is FluoriteBig -> (-compare(right.value, left.value)).toFluoriteIntAsCompared()
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
    override fun strictEquals(other: FluoriteValue) = this == other
    override fun toInt() = value.toBigDecimal().intValue(true)
    override fun toDouble() = value
    override fun negate() = FluoriteDouble(-value)
    override fun roundToInt(): Int {
        if (value.isNaN()) throw FluoriteException("Cannot round NaN to an integer".toFluoriteString())
        return value.roundToInt()
    }
}

data class FluoriteBig(val value: BigInteger) : FluoriteNumber {
    companion object {
        val fluoriteClass by lazy {
            FluoriteObject(
                FluoriteValue.fluoriteClass, mutableMapOf(
                    "of" to FluoriteFunction.immediate { arguments ->
                        if (arguments.size != 1) usage("BIG.of(value: STRING | NUMBER): BIG")
                        when (val argument = arguments[0]) {
                            is FluoriteString -> FluoriteBig(argument.value.toBigInteger())
                            is FluoriteBig -> argument
                            is FluoriteInt -> FluoriteBig(argument.value.toBigInteger())
                            is FluoriteDouble -> {
                                if (!argument.value.isFinite()) throw FluoriteException("Cannot convert to BIG: ${argument.value}".toFluoriteString())
                                FluoriteBig(BigInteger.tryFromDouble(argument.value, false))
                            }
                            else -> usage("BIG.of(value: STRING | NUMBER): BIG")
                        }
                    },
                    OperatorMethod.TO_NUMBER.methodName to FluoriteFunction.immediate { it[0] as FluoriteBig },
                    OperatorMethod.TO_BOOLEAN.methodName to FluoriteFunction.immediate { ((it[0] as FluoriteBig).value != BigInteger.ZERO).toFluoriteBoolean() },
                    OperatorMethod.PLUS.methodName to FluoriteFunction.immediate { arguments ->
                        val left = arguments[0] as FluoriteBig
                        when (val right = arguments[1]) {
                            is FluoriteInt -> FluoriteBig(left.value + right.value.toBigInteger())
                            is FluoriteBig -> FluoriteBig(left.value + right.value)
                            is FluoriteDouble -> FluoriteDouble(left.value.doubleValue(false) + right.value)
                            else -> throw IllegalArgumentException("Can not convert to number: ${right::class}")
                        }
                    },
                    OperatorMethod.MINUS.methodName to FluoriteFunction.immediate { arguments ->
                        val left = arguments[0] as FluoriteBig
                        when (val right = arguments[1]) {
                            is FluoriteInt -> FluoriteBig(left.value - right.value.toBigInteger())
                            is FluoriteBig -> FluoriteBig(left.value - right.value)
                            is FluoriteDouble -> FluoriteDouble(left.value.doubleValue(false) - right.value)
                            else -> throw IllegalArgumentException("Can not convert to number: ${right::class}")
                        }
                    },
                    OperatorMethod.COMPARE.methodName to FluoriteFunction.immediate { arguments ->
                        val left = arguments[0] as FluoriteBig
                        when (val right = arguments[1]) {
                            is FluoriteInt -> left.value.compareTo(right.value.toBigInteger()).toFluoriteIntAsCompared()
                            is FluoriteBig -> left.value.compareTo(right.value).toFluoriteIntAsCompared()
                            is FluoriteDouble -> compare(left.value, right.value).toFluoriteIntAsCompared()
                            else -> throw IllegalArgumentException("Can not convert to number: ${right::class}")
                        }
                    },
                )
            )
        }
    }

    override fun toString() = value.toString()
    override val parent get() = fluoriteClass
    override fun strictEquals(other: FluoriteValue) = this == other
    override fun toInt() = value.intValue(true)
    override fun toDouble() = value.doubleValue(false)
    override fun negate() = FluoriteBig(value.negate())
    override fun roundToInt() = value.intValue(true)
}

private fun compare(left: BigInteger, right: Double): Int {
    // 無限大・NaN・符号付きゼロとの大小関係はleftの符号だけで決まり、Double.compareToの順序に従う
    if (!right.isFinite() || right == 0.0) return left.signum().toDouble().compareTo(right)
    // bignumのDoubleからの整数変換は10進文字列を経由するため、2進表現から正確に比較する
    // IEEE 754の符号1ビット・指数部11ビット・小数部52ビットを、そのままLongとして取得する
    val bits = right.toBits()
    // 下位52ビットの小数部を除き、上位の符号ビットをマスクして、バイアス1023付きの指数部を取り出す
    val exponent = ((bits ushr 52) and 0x7ffL).toInt()
    // 小数部に正規化数の暗黙の先頭1を補い、仮数を整数として取り出す（非正規化数では補わない）
    val significand = (bits and 0x000fffffffffffffL) or if (exponent == 0) 0L else 0x0010000000000000L
    // 仮数に元の値の符号を付け、以降のビットシフトで桁あふれしないよう任意精度整数にする
    val integer = (if (right < 0.0) -significand else significand).toBigInteger()
    // 仮数を整数化した分の52ビットを指数から引くと、正規化数はexponent - 1023 - 52になる
    // 非正規化数の指数は1 - 1023で固定されるため、同じく52を引いて-1074になる
    val shift = if (exponent == 0) -1074 else exponent - 1075
    // right = integer × 2^shiftなので、指数が非負なら右辺を、負なら両辺に2^-shiftを掛けて左辺をシフトする
    // どちらも整数同士の比較となり、丸め誤差を生じさせずに元の大小関係を得られる
    return if (shift >= 0) left.compareTo(integer shl shift) else (left shl -shift).compareTo(integer)
}

fun FluoriteValue.checkNonZeroIntegerDivisor() {
    if (this is FluoriteInt && this.value == 0 || this is FluoriteBig && this.value.isZero()) throw FluoriteException("Division by zero".toFluoriteString())
}

infix fun FluoriteValue.div(right: FluoriteValue): FluoriteNumber {
    return when (this) {
        is FluoriteInt -> when (right) {
            is FluoriteInt -> FluoriteInt(this.value / right.value)
            is FluoriteBig -> FluoriteBig(this.value.toBigInteger() / right.value)
            is FluoriteDouble -> FluoriteDouble((this.value / right.value).let { it - it.rem(1.0) })
            else -> throw IllegalArgumentException("Can not convert to number: ${right::class}")
        }

        is FluoriteBig -> when (right) {
            is FluoriteInt -> FluoriteBig(this.value / right.value.toBigInteger())
            is FluoriteBig -> FluoriteBig(this.value / right.value)
            is FluoriteDouble -> FluoriteDouble((this.value.doubleValue(false) / right.value).let { it - it.rem(1.0) })
            else -> throw IllegalArgumentException("Can not convert to number: ${right::class}")
        }

        is FluoriteDouble -> when (right) {
            is FluoriteInt -> FluoriteDouble((this.value / right.value).let { it - it.rem(1.0) })
            is FluoriteBig -> FluoriteDouble((this.value / right.value.doubleValue(false)).let { it - it.rem(1.0) })
            is FluoriteDouble -> FluoriteDouble((this.value / right.value).let { it - it.rem(1.0) })
            else -> throw IllegalArgumentException("Can not convert to number: ${right::class}")
        }

        else -> throw IllegalArgumentException("Can not convert to number: ${this::class}")
    }
}

infix fun FluoriteValue.floorDiv(right: FluoriteValue): FluoriteNumber {
    return when (this) {
        is FluoriteInt -> when (right) {
            is FluoriteInt -> FluoriteInt(this.value.floorDiv(right.value))
            is FluoriteBig -> floorDiv(this.value.toBigInteger(), right.value)
            is FluoriteDouble -> FluoriteDouble(floor(this.value / right.value))
            else -> throw IllegalArgumentException("Can not convert to number: ${right::class}")
        }

        is FluoriteBig -> when (right) {
            is FluoriteInt -> floorDiv(this.value, right.value.toBigInteger())
            is FluoriteBig -> floorDiv(this.value, right.value)
            is FluoriteDouble -> FluoriteDouble(floor(this.value.doubleValue(false) / right.value))
            else -> throw IllegalArgumentException("Can not convert to number: ${right::class}")
        }

        is FluoriteDouble -> when (right) {
            is FluoriteInt -> FluoriteDouble(floor(this.value / right.value))
            is FluoriteBig -> FluoriteDouble(floor(this.value / right.value.doubleValue(false)))
            is FluoriteDouble -> FluoriteDouble(floor(this.value / right.value))
            else -> throw IllegalArgumentException("Can not convert to number: ${right::class}")
        }

        else -> throw IllegalArgumentException("Can not convert to number: ${this::class}")
    }
}

private fun floorDiv(left: BigInteger, right: BigInteger): FluoriteBig {
    val (quotient, remainder) = left.divideAndRemainder(right)
    return FluoriteBig(if (!remainder.isZero() && remainder.signum() != right.signum()) quotient - 1.toBigInteger() else quotient)
}

infix fun FluoriteValue.mod(right: FluoriteValue): FluoriteNumber {
    return when (this) {
        is FluoriteInt -> when (right) {
            is FluoriteInt -> FluoriteInt(this.value.mod(right.value))
            is FluoriteBig -> mod(this.value.toBigInteger(), right.value)
            is FluoriteDouble -> FluoriteDouble(this.value.toDouble().mod(right.value))
            else -> throw IllegalArgumentException("Can not convert to number: ${right::class}")
        }

        is FluoriteBig -> when (right) {
            is FluoriteInt -> mod(this.value, right.value.toBigInteger())
            is FluoriteBig -> mod(this.value, right.value)
            is FluoriteDouble -> FluoriteDouble(this.value.doubleValue(false).mod(right.value))
            else -> throw IllegalArgumentException("Can not convert to number: ${right::class}")
        }

        is FluoriteDouble -> when (right) {
            is FluoriteInt -> FluoriteDouble(this.value.mod(right.value.toDouble()))
            is FluoriteBig -> FluoriteDouble(this.value.mod(right.value.doubleValue(false)))
            is FluoriteDouble -> FluoriteDouble(this.value.mod(right.value))
            else -> throw IllegalArgumentException("Can not convert to number: ${right::class}")
        }

        else -> throw IllegalArgumentException("Can not convert to number: ${this::class}")
    }
}

private fun mod(left: BigInteger, right: BigInteger): FluoriteBig {
    // bignum 0.3.10のremainderは負の除数で余りの符号を誤るため、divideAndRemainderを使う
    val remainder = left.divideAndRemainder(right).second
    return FluoriteBig(if (!remainder.isZero() && remainder.signum() != right.signum()) remainder + right else remainder)
}

infix fun FluoriteValue.rem(right: FluoriteValue): FluoriteNumber {
    return when (this) {
        is FluoriteInt -> when (right) {
            is FluoriteInt -> FluoriteInt(this.value.rem(right.value))
            is FluoriteBig -> rem(this.value.toBigInteger(), right.value)
            is FluoriteDouble -> FluoriteDouble(this.value.toDouble().rem(right.value))
            else -> throw IllegalArgumentException("Can not convert to number: ${right::class}")
        }

        is FluoriteBig -> when (right) {
            is FluoriteInt -> rem(this.value, right.value.toBigInteger())
            is FluoriteBig -> rem(this.value, right.value)
            is FluoriteDouble -> FluoriteDouble(this.value.doubleValue(false).rem(right.value))
            else -> throw IllegalArgumentException("Can not convert to number: ${right::class}")
        }

        is FluoriteDouble -> when (right) {
            is FluoriteInt -> FluoriteDouble(this.value.rem(right.value.toDouble()))
            is FluoriteBig -> FluoriteDouble(this.value.rem(right.value.doubleValue(false)))
            is FluoriteDouble -> FluoriteDouble(this.value.rem(right.value))
            else -> throw IllegalArgumentException("Can not convert to number: ${right::class}")
        }

        else -> throw IllegalArgumentException("Can not convert to number: ${this::class}")
    }
}

private fun rem(left: BigInteger, right: BigInteger): FluoriteBig {
    // bignum 0.3.10のremainderは負の除数で余りの符号を誤るため、divideAndRemainderを使う
    val remainder = left.divideAndRemainder(right).second
    return FluoriteBig(remainder)
}

private val INTEGER_PATTERN = Regex("""[+-]?[0-9]+""")

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
            null -> {
                if (INTEGER_PATTERN.matches(this)) {
                    FluoriteBig(this.toBigInteger())
                } else {
                    toFluoriteDouble()
                }
            }

            else -> FluoriteInt(int)
        }

        else -> toFluoriteDouble()
    }
}
