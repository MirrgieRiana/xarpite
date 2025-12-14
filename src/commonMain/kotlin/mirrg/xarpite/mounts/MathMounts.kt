package mirrg.xarpite.mounts

import mirrg.xarpite.compilers.objects.FluoriteDouble
import mirrg.xarpite.compilers.objects.FluoriteFunction
import mirrg.xarpite.compilers.objects.FluoriteInt
import mirrg.xarpite.compilers.objects.FluoriteNumber
import mirrg.xarpite.compilers.objects.FluoriteObject
import mirrg.xarpite.compilers.objects.FluoriteValue
import mirrg.xarpite.compilers.objects.toFluoriteNumber
import kotlin.math.abs
import kotlin.math.cos
import kotlin.math.exp
import kotlin.math.floor
import kotlin.math.ln
import kotlin.math.pow
import kotlin.math.sin
import kotlin.math.sqrt
import kotlin.math.tan
import kotlin.random.Random

fun createMathMounts(): List<Map<String, FluoriteValue>> {
    return mapOf(
        "MATH" to FluoriteObject(
            FluoriteObject.fluoriteClass, mutableMapOf(
                "PI" to FluoriteDouble(3.141592653589793), // TODO kotlinアップデート時に定数に置換し直す
                "E" to FluoriteDouble(2.718281828459045), // TODO kotlinアップデート時に定数に置換し直す
            )
        ),
        "PI" to FluoriteDouble(3.141592653589793), // TODO kotlinアップデート時に定数に置換し直す
        "ABS" to FluoriteFunction { arguments ->
            when (arguments.size) {
                1 -> {
                    val number = arguments[0].toFluoriteNumber()
                    when (number) {
                        is FluoriteInt -> {
                            // INT_MINの場合、absが存在しないのでDoubleにフォールバック
                            if (number.value == Int.MIN_VALUE) {
                                FluoriteDouble(abs(number.value.toDouble()))
                            } else {
                                FluoriteInt(abs(number.value))
                            }
                        }
                        is FluoriteDouble -> FluoriteDouble(abs(number.value))
                        else -> usage("ABS(value: NUMBER): NUMBER")
                    }
                }

                else -> usage("ABS(value: NUMBER): NUMBER")
            }
        },
        "FLOOR" to FluoriteFunction { arguments ->
            when (arguments.size) {
                1 -> when (val number = arguments[0]) {
                    is FluoriteDouble -> FluoriteInt(floor(number.value).toInt())
                    is FluoriteInt -> number
                    else -> usage("FLOOR(number: NUMBER): INTEGER")
                }

                else -> usage("FLOOR(number: NUMBER): INTEGER")
            }
        },
        "DIV" to FluoriteFunction { arguments ->
            if (arguments.size == 2) {
                val left = arguments[0]
                val right = arguments[1]
                when (left) {
                    is FluoriteInt -> when (right) {
                        is FluoriteInt -> FluoriteInt(left.value / right.value)
                        is FluoriteDouble -> FluoriteDouble((left.value / right.value).let { it - it.rem(1.0) })
                        else -> usage("DIV(x: NUMBER; y: NUMBER): NUMBER")
                    }

                    is FluoriteDouble -> when (right) {
                        is FluoriteInt -> FluoriteDouble((left.value / right.value).let { it - it.rem(1.0) })
                        is FluoriteDouble -> FluoriteDouble((left.value / right.value).let { it - it.rem(1.0) })
                        else -> usage("DIV(x: NUMBER; y: NUMBER): NUMBER")
                    }

                    else -> usage("DIV(x: NUMBER; y: NUMBER): NUMBER")
                }
            } else {
                usage("DIV(x: NUMBER; y: NUMBER): NUMBER")
            }
        },
        "SQRT" to FluoriteFunction { arguments ->
            when (arguments.size) {
                1 -> FluoriteDouble(sqrt((arguments[0] as FluoriteNumber).toDouble()))
                else -> usage("SQRT(number: NUMBER): NUMBER")
            }
        },
        "SIN" to FluoriteFunction { arguments ->
            when (arguments.size) {
                1 -> FluoriteDouble(sin((arguments[0] as FluoriteNumber).toDouble()))
                else -> usage("SIN(number: NUMBER): NUMBER")
            }
        },
        "COS" to FluoriteFunction { arguments ->
            when (arguments.size) {
                1 -> FluoriteDouble(cos((arguments[0] as FluoriteNumber).toDouble()))
                else -> usage("COS(number: NUMBER): NUMBER")
            }
        },
        "TAN" to FluoriteFunction { arguments ->
            when (arguments.size) {
                1 -> FluoriteDouble(tan((arguments[0] as FluoriteNumber).toDouble()))
                else -> usage("TAN(number: NUMBER): NUMBER")
            }
        },
        "POW" to FluoriteFunction { arguments ->
            when (arguments.size) {
                2 -> {
                    val base = arguments[0] as FluoriteNumber
                    val exponent = arguments[1] as FluoriteNumber
                    FluoriteDouble(base.toDouble().pow(exponent.toDouble()))
                }

                else -> usage("POW(base: NUMBER; exponent: NUMBER): NUMBER")
            }
        },
        "EXP" to FluoriteFunction { arguments ->
            when (arguments.size) {
                1 -> FluoriteDouble(exp((arguments[0] as FluoriteNumber).toDouble()))
                else -> usage("EXP(number: NUMBER): NUMBER")
            }
        },
        "LOG" to FluoriteFunction { arguments ->
            when (arguments.size) {
                1 -> FluoriteDouble(ln((arguments[0] as FluoriteNumber).toDouble()))
                else -> usage("LOG(number: NUMBER): NUMBER")
            }
        },
        "RAND" to FluoriteFunction { arguments ->
            when (arguments.size) {
                0 -> {
                    FluoriteDouble(Random.nextDouble())
                }

                1 -> {
                    val until = arguments[0].toFluoriteNumber().toInt()
                    FluoriteInt(Random.nextInt(until))
                }

                2 -> {
                    val from = arguments[0].toFluoriteNumber().toInt()
                    val until = arguments[1].toFluoriteNumber().toInt()
                    FluoriteInt(Random.nextInt(from, until))
                }

                else -> usage(
                    "RAND(): DOUBLE",
                    "RAND([from: NUMBER; ]until: NUMBER): INT",
                )
            }
        },
    ).let { listOf(it) }
}
