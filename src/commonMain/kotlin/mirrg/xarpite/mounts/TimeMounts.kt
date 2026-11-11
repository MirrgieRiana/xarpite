package mirrg.xarpite.mounts

import com.ionspin.kotlin.bignum.integer.BigInteger
import com.ionspin.kotlin.bignum.integer.toBigInteger
import kotlinx.datetime.FixedOffsetTimeZone
import kotlinx.datetime.LocalDateTime
import kotlinx.datetime.TimeZone
import kotlinx.datetime.UtcOffset
import kotlinx.datetime.offsetAt
import kotlinx.datetime.toInstant
import kotlinx.datetime.toLocalDateTime
import mirrg.xarpite.Mount
import mirrg.xarpite.OperatorMethod
import mirrg.xarpite.RuntimeContext
import mirrg.xarpite.compilers.objects.FluoriteBig
import mirrg.xarpite.compilers.objects.FluoriteDouble
import mirrg.xarpite.compilers.objects.FluoriteFunction
import mirrg.xarpite.compilers.objects.FluoriteInt
import mirrg.xarpite.compilers.objects.FluoriteNumber
import mirrg.xarpite.compilers.objects.FluoriteObject
import mirrg.xarpite.compilers.objects.FluoriteString
import mirrg.xarpite.compilers.objects.FluoriteValue
import mirrg.xarpite.compilers.objects.createFluoriteObject
import mirrg.xarpite.compilers.objects.toFluoriteString
import mirrg.xarpite.define
import mirrg.xarpite.toBigIntegerExact
import kotlin.math.floor
import kotlin.math.roundToInt
import kotlin.time.Instant

private const val EPOCH_SECONDS = "_epochSeconds"
private const val NANOSECONDS_OF_SECOND = "_nanosecondsOfSecond"
private const val OFFSET_SECONDS = "_offsetSeconds"

private val TIME_PATTERN = Regex("""([0-9]{4}-[0-9]{2}-[0-9]{2})(?:T([0-9]{2}:[0-9]{2}:[0-9]{2})(\.[0-9]{1,9})?)?(Z|[+-][0-9]{2}:[0-9]{2})?""")

context(context: RuntimeContext)
fun createTimeMounts(): List<Map<String, Mount>> {
    return mapOf(
        "NOW" define FluoriteFunction.immediate { arguments ->
            if (arguments.size != 0) usage("NOW(): BIG")
            FluoriteBig(context.io.getCurrentInstant().epochSeconds.toBigInteger())
        },
        *run {
            abstract class TimeImplementation(
                private val parentObject: FluoriteObject?,
                val name: String,
            ) {

                protected fun Map<String, FluoriteValue>.new() = FluoriteObject(parentObject, this.toMutableMap())


                private fun FluoriteNumber.splitTimeNumber(): Pair<BigInteger, Double> {
                    return when (this) {
                        is FluoriteInt -> Pair(this.value.toBigInteger(), 0.0)
                        is FluoriteBig -> Pair(this.value, 0.0)
                        is FluoriteDouble -> {
                            require(this.value.isFinite()) { "Time components must be finite" }
                            val integer = floor(this.value)
                            val bigInteger = integer.toBigIntegerExact()
                            Pair(bigInteger, this.value - integer)
                        }

                        else -> throw IllegalArgumentException("Unsupported time component: ${this::class}")
                    }
                }

                private val NANOSECONDS_PER_SECOND = 1_000_000_000.toBigInteger()

                protected fun FluoriteNumber.toInstant(nanosecondsOfSecond: FluoriteNumber): Instant {
                    val (seconds, secondsFraction) = this.splitTimeNumber()
                    val (nanoseconds, nanosecondsFraction) = nanosecondsOfSecond.splitTimeNumber()

                    val adjustment = nanoseconds + (1_000_000_000 * secondsFraction + nanosecondsFraction).roundToInt().toBigInteger()

                    val epochSeconds = seconds + adjustment / NANOSECONDS_PER_SECOND
                    val remainder = adjustment % NANOSECONDS_PER_SECOND

                    val instant = Instant.fromEpochSeconds(epochSeconds.longValue(true), remainder.intValue(true))
                    val a = instant.epochSeconds.toBigInteger() * NANOSECONDS_PER_SECOND + instant.nanosecondsOfSecond.toBigInteger()
                    val b = seconds * NANOSECONDS_PER_SECOND + adjustment
                    require(a == b) { "Time is out of range" }

                    return instant
                }

                abstract fun of(arguments: Array<FluoriteValue>): FluoriteValue


                protected fun String.parseTime(): Pair<LocalDateTime, UtcOffset?> {
                    val matchResult = TIME_PATTERN.matchEntire(this) ?: throw IllegalArgumentException("Invalid time representation: $this")
                    val localDateTime = LocalDateTime.parse("${matchResult.groupValues[1]}T${matchResult.groupValues[2].ifEmpty { "00:00:00" }}${matchResult.groupValues[3]}")
                    val offset = matchResult.groups[4]?.value?.let { UtcOffset.parse(it) }
                    return Pair(localDateTime, offset)
                }

                abstract fun parse(text: String): FluoriteValue


                abstract fun now(): FluoriteValue


                protected fun FluoriteObject.toInstant(): Instant {
                    val epochSeconds = (this.map[EPOCH_SECONDS] as FluoriteBig).value.longValue(true)
                    val nanosecondsOfSecond = (this.map[NANOSECONDS_OF_SECOND] as FluoriteInt).value
                    return Instant.fromEpochSeconds(epochSeconds, nanosecondsOfSecond)
                }

                protected fun LocalDateTime.formatTime(): String {
                    return if (this.second == 0 && this.nanosecond == 0) "${this}:00" else this.toString()
                }

                abstract fun toString(obj: FluoriteObject): String


                fun createMap(): Map<String, FluoriteValue> {
                    return mapOf(
                        "of" to FluoriteFunction.immediate { arguments ->
                            of(arguments)
                        },
                        "parse" to FluoriteFunction.immediate { arguments ->
                            fun usage(): Nothing = usage("$name.parse(text: STRING): $name")
                            if (arguments.size != 1) usage()
                            val text = arguments[0] as? FluoriteString ?: usage()
                            parse(text.value)
                        },
                        "now" to FluoriteFunction.immediate { arguments ->
                            if (arguments.size != 0) usage("$name.now(): $name")
                            now()
                        },
                        OperatorMethod.TO_STRING.methodName to FluoriteFunction.immediate { arguments ->
                            val obj = arguments[0] as FluoriteObject
                            toString(obj).toFluoriteString()
                        },
                    )
                }

            }

            fun create(implementationFactory: (FluoriteObject?) -> TimeImplementation) = createFluoriteObject(FluoriteObject.fluoriteClass) { parentObject ->
                val implementation = implementationFactory(parentObject)
                implementation.createMap()
            }

            arrayOf(
                "INSTANT" define create { parentObject ->
                    object : TimeImplementation(parentObject, "INSTANT") {
                        private fun new(instant: Instant) = mapOf(
                            EPOCH_SECONDS to FluoriteBig(instant.epochSeconds.toBigInteger()),
                            NANOSECONDS_OF_SECOND to FluoriteInt(instant.nanosecondsOfSecond),
                        ).new()

                        override fun of(arguments: Array<FluoriteValue>): FluoriteValue {
                            fun usage(): Nothing = usage("INSTANT.of(epochSeconds: NUMBER[; nanosecondsOfSecond: NUMBER]): INSTANT")
                            val epochSeconds: FluoriteNumber
                            val nanosecondsOfSecond: FluoriteNumber
                            when (arguments.size) {
                                1 -> {
                                    epochSeconds = arguments[0] as? FluoriteNumber ?: usage()
                                    nanosecondsOfSecond = FluoriteInt.ZERO
                                }

                                2 -> {
                                    epochSeconds = arguments[0] as? FluoriteNumber ?: usage()
                                    nanosecondsOfSecond = arguments[1] as? FluoriteNumber ?: usage()
                                }

                                else -> usage()
                            }
                            val instant = epochSeconds.toInstant(nanosecondsOfSecond)
                            return new(instant)
                        }

                        override fun parse(text: String): FluoriteValue {
                            val (localDateTime, offset) = text.removeSuffix("Z").parseTime()
                            require(offset == null) { "UTC offset is not allowed for INSTANT" }
                            val instant = localDateTime.toInstant(TimeZone.UTC)
                            return new(instant)
                        }

                        override fun now(): FluoriteValue {
                            val instant = context.io.getCurrentInstant()
                            return new(instant)
                        }

                        override fun toString(obj: FluoriteObject): String {
                            return obj.toInstant().toString()
                        }
                    }
                },
                "TIME" define create { parentObject ->
                    object : TimeImplementation(parentObject, "TIME") {
                        private fun new(instant: Instant, offset: UtcOffset) = mapOf(
                            EPOCH_SECONDS to FluoriteBig(instant.epochSeconds.toBigInteger()),
                            NANOSECONDS_OF_SECOND to FluoriteInt(instant.nanosecondsOfSecond),
                            OFFSET_SECONDS to FluoriteInt(offset.totalSeconds),
                        ).new()

                        override fun of(arguments: Array<FluoriteValue>): FluoriteValue {
                            fun usage(): Nothing = usage("TIME.of(epochSeconds: NUMBER[; nanosecondsOfSecond: NUMBER]; offsetSeconds: NUMBER): TIME")
                            val epochSeconds: FluoriteNumber
                            val nanosecondsOfSecond: FluoriteNumber
                            val offsetSeconds: FluoriteNumber
                            when (arguments.size) {
                                2 -> {
                                    epochSeconds = arguments[0] as? FluoriteNumber ?: usage()
                                    nanosecondsOfSecond = FluoriteInt.ZERO
                                    offsetSeconds = arguments[1] as? FluoriteNumber ?: usage()
                                }

                                3 -> {
                                    epochSeconds = arguments[0] as? FluoriteNumber ?: usage()
                                    nanosecondsOfSecond = arguments[1] as? FluoriteNumber ?: usage()
                                    offsetSeconds = arguments[2] as? FluoriteNumber ?: usage()
                                }

                                else -> usage()
                            }
                            val instant = epochSeconds.toInstant(nanosecondsOfSecond)
                            val offset = UtcOffset(seconds = offsetSeconds.roundToInt())
                            return new(instant, offset)
                        }

                        override fun parse(text: String): FluoriteValue {
                            val (localDateTime, parsedOffset) = text.parseTime()
                            val offset = parsedOffset ?: throw IllegalArgumentException("UTC offset is required for TIME")
                            val instant = localDateTime.toInstant(FixedOffsetTimeZone(offset))
                            return new(instant, offset)
                        }

                        override fun now(): FluoriteValue {
                            val instant = context.io.getCurrentInstant()
                            val offset = context.io.getSystemTimeZone().offsetAt(instant)
                            return new(instant, offset)
                        }

                        override fun toString(obj: FluoriteObject): String {
                            val instant = obj.toInstant()
                            val offset = UtcOffset(seconds = (obj.map[OFFSET_SECONDS] as FluoriteInt).value)
                            return ("${instant.toLocalDateTime(FixedOffsetTimeZone(offset)).formatTime()}$offset")
                        }
                    }
                },
                "LOCAL_TIME" define create { parentObject ->
                    object : TimeImplementation(parentObject, "LOCAL_TIME") {
                        // オフセット不明の年月日時分秒をUTCと仮定して符号化する
                        private fun new(instant: Instant, offset: UtcOffset) = mapOf(
                            EPOCH_SECONDS to FluoriteBig((instant.epochSeconds + offset.totalSeconds).toBigInteger()),
                            NANOSECONDS_OF_SECOND to FluoriteInt(instant.nanosecondsOfSecond),
                        ).new()

                        override fun of(arguments: Array<FluoriteValue>): FluoriteValue {
                            fun usage(): Nothing = usage("LOCAL_TIME.of(epochSeconds: NUMBER[; nanosecondsOfSecond: NUMBER]): LOCAL_TIME")
                            val epochSeconds: FluoriteNumber
                            val nanosecondsOfSecond: FluoriteNumber
                            when (arguments.size) {
                                1 -> {
                                    epochSeconds = arguments[0] as? FluoriteNumber ?: usage()
                                    nanosecondsOfSecond = FluoriteInt.ZERO
                                }

                                2 -> {
                                    epochSeconds = arguments[0] as? FluoriteNumber ?: usage()
                                    nanosecondsOfSecond = arguments[1] as? FluoriteNumber ?: usage()
                                }

                                else -> usage()
                            }
                            val instant = epochSeconds.toInstant(nanosecondsOfSecond)
                            return new(instant, UtcOffset.ZERO)
                        }

                        override fun parse(text: String): FluoriteValue {
                            val (localDateTime, offset) = text.parseTime()
                            require(offset == null) { "UTC offset is not allowed for LOCAL_TIME" }
                            val instant = localDateTime.toInstant(TimeZone.UTC)
                            return new(instant, UtcOffset.ZERO)
                        }

                        override fun now(): FluoriteValue {
                            val instant = context.io.getCurrentInstant()
                            val offset = context.io.getSystemTimeZone().offsetAt(instant)
                            return new(instant, offset)
                        }

                        override fun toString(obj: FluoriteObject): String {
                            return obj.toInstant().toLocalDateTime(TimeZone.UTC).formatTime()
                        }
                    }
                },
            )
        },
    ).let { listOf(it) }
}
