package mirrg.xarpite.mounts

import com.ionspin.kotlin.bignum.decimal.BigDecimal
import com.ionspin.kotlin.bignum.integer.BigInteger
import com.ionspin.kotlin.bignum.integer.toBigInteger
import kotlinx.datetime.FixedOffsetTimeZone
import kotlinx.datetime.LocalDateTime
import kotlinx.datetime.TimeZone
import kotlinx.datetime.UtcOffset
import kotlinx.datetime.isoDayNumber
import kotlinx.datetime.number
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
import mirrg.xarpite.compilers.objects.toFluoriteBoolean
import mirrg.xarpite.compilers.objects.toFluoriteString
import mirrg.xarpite.define
import mirrg.xarpite.operations.FluoriteException
import mirrg.xarpite.toBigIntegerExact
import kotlin.math.floor
import kotlin.math.roundToInt
import kotlin.time.Instant

private const val EPOCH_SECONDS = "_epochSeconds"
private const val NANOSECONDS_OF_SECOND = "_nanosecondsOfSecond"
private const val OFFSET_SECONDS = "_offsetSeconds"

private val TIME_PATTERN = Regex("""([0-9]{4}-[0-9]{2}-[0-9]{2})(?:T([0-9]{2}:[0-9]{2}:[0-9]{2})(\.[0-9]{1,9})?)?(Z|[+-][0-9]{2}:[0-9]{2})?""")

private val BIG_INTEGER_1_000 = 1_000.toBigInteger()
private val BIG_INTEGER_1_000_000_000 = 1_000_000_000.toBigInteger()

context(context: RuntimeContext)
fun createTimeMounts(): List<Map<String, Mount>> {
    return mapOf(
        "NOW" define FluoriteFunction.immediate { arguments ->
            if (arguments.size != 0) usage("NOW(): BIG")
            FluoriteBig(context.io.getCurrentInstant().epochSeconds.toBigInteger())
        },
        "MONDAY" define FluoriteInt(1),
        "TUESDAY" define FluoriteInt(2),
        "WEDNESDAY" define FluoriteInt(3),
        "THURSDAY" define FluoriteInt(4),
        "FRIDAY" define FluoriteInt(5),
        "SATURDAY" define FluoriteInt(6),
        "SUNDAY" define FluoriteInt(7),
        *run {
            abstract class TimeFactory(private val name: String) {

                protected abstract val hasUnixTime: Boolean


                protected fun createInstantMap(instant: Instant): MutableMap<String, FluoriteValue> = mutableMapOf(
                    EPOCH_SECONDS to FluoriteBig(instant.epochSeconds.toBigInteger()),
                    NANOSECONDS_OF_SECOND to FluoriteInt(instant.nanosecondsOfSecond),
                )

                protected fun createOffsetTimeMap(instant: Instant, offset: UtcOffset): MutableMap<String, FluoriteValue> = mutableMapOf(
                    EPOCH_SECONDS to FluoriteBig(instant.epochSeconds.toBigInteger()),
                    NANOSECONDS_OF_SECOND to FluoriteInt(instant.nanosecondsOfSecond),
                    OFFSET_SECONDS to FluoriteInt(offset.totalSeconds),
                )

                // オフセット不明の年月日時分秒をUTCと仮定して符号化する
                protected fun createLocalTimeMap(instant: Instant, offset: UtcOffset): MutableMap<String, FluoriteValue> = mutableMapOf(
                    EPOCH_SECONDS to FluoriteBig((instant.epochSeconds + offset.totalSeconds).toBigInteger()),
                    NANOSECONDS_OF_SECOND to FluoriteInt(instant.nanosecondsOfSecond),
                )


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

                protected fun FluoriteNumber.toInstant(nanosecondsOfSecond: FluoriteNumber): Instant {
                    val (seconds, secondsFraction) = this.splitTimeNumber()
                    val (nanoseconds, nanosecondsFraction) = nanosecondsOfSecond.splitTimeNumber()

                    val adjustment = nanoseconds + (1_000_000_000 * secondsFraction + nanosecondsFraction).roundToInt().toBigInteger()

                    val epochSeconds = seconds + adjustment / BIG_INTEGER_1_000_000_000
                    val remainder = adjustment % BIG_INTEGER_1_000_000_000

                    val instant = Instant.fromEpochSeconds(epochSeconds.longValue(true), remainder.intValue(true))
                    val a = instant.epochSeconds.toBigInteger() * BIG_INTEGER_1_000_000_000 + instant.nanosecondsOfSecond.toBigInteger()
                    val b = seconds * BIG_INTEGER_1_000_000_000 + adjustment
                    require(a == b) { "Time is out of range" }

                    return instant
                }

                protected abstract fun of(arguments: Array<FluoriteValue>): MutableMap<String, FluoriteValue>


                protected fun String.parseTime(): Pair<LocalDateTime, UtcOffset?> {
                    val matchResult = TIME_PATTERN.matchEntire(this) ?: throw IllegalArgumentException("Invalid time representation: $this")
                    val localDateTime = LocalDateTime.parse("${matchResult.groupValues[1]}T${matchResult.groupValues[2].ifEmpty { "00:00:00" }}${matchResult.groupValues[3]}")
                    val offset = matchResult.groups[4]?.value?.let { UtcOffset.parse(it) }
                    return Pair(localDateTime, offset)
                }

                protected abstract fun parse(text: String): MutableMap<String, FluoriteValue>


                protected abstract fun now(): MutableMap<String, FluoriteValue>


                protected abstract fun toInstant(arguments: Array<FluoriteValue>): FluoriteObject

                protected abstract fun toOffsetTime(arguments: Array<FluoriteValue>): FluoriteObject

                protected abstract fun toLocalTime(arguments: Array<FluoriteValue>): FluoriteObject


                protected abstract fun getOffset(obj: FluoriteObject): UtcOffset


                protected val FluoriteObject.epochSecondsValue get() = this.map[EPOCH_SECONDS] as FluoriteBig

                protected val FluoriteObject.epochSeconds get() = this.epochSecondsValue.value

                protected val FluoriteObject.nanosecondsOfSecondValue get() = this.map[NANOSECONDS_OF_SECOND] as FluoriteInt

                protected val FluoriteObject.nanosecondsOfSecond get() = this.nanosecondsOfSecondValue.value

                protected fun FluoriteObject.toInstant(): Instant {
                    return Instant.fromEpochSeconds(this.epochSeconds.longValue(true), this.nanosecondsOfSecond)
                }

                private fun FluoriteObject.toEpochMilliseconds(): BigInteger {
                    return this.epochSeconds * BIG_INTEGER_1_000 + (this.nanosecondsOfSecond / 1_000_000).toBigInteger()
                }

                private fun FluoriteObject.toEpochNanoseconds(): BigInteger {
                    return this.epochSeconds * BIG_INTEGER_1_000_000_000 + this.nanosecondsOfSecond.toBigInteger()
                }

                protected fun LocalDateTime.formatTime(): String {
                    return if (this.second == 0 && this.nanosecond == 0) "${this}:00" else this.toString()
                }

                protected abstract fun toString(obj: FluoriteObject): String


                protected abstract fun equalTo(left: FluoriteObject, right: FluoriteObject): Boolean


                fun create(): FluoriteObject {
                    return createFluoriteObject(FluoriteObject.fluoriteClass) { parentObject ->
                        mapOf(
                            "of" to FluoriteFunction.immediate { arguments ->
                                FluoriteObject(parentObject, of(arguments))
                            },
                            "parse" to FluoriteFunction.immediate { arguments ->
                                fun usage(): Nothing = usage("$name.parse(text: STRING): $name")
                                if (arguments.size != 1) usage()
                                val text = arguments[0] as? FluoriteString ?: usage()
                                FluoriteObject(parentObject, parse(text.value))
                            },
                            "now" to FluoriteFunction.immediate { arguments ->
                                if (arguments.size != 0) usage("$name.now(): $name")
                                FluoriteObject(parentObject, now())
                            },
                            OperatorMethod.PROPERTY.methodName to FluoriteFunction.immediate { arguments ->
                                val obj = arguments[0] as FluoriteObject
                                val key = arguments[1].toFluoriteString(null).value
                                obj.map.getOrPut(key) {
                                    if (hasUnixTime) {
                                        when (key) {
                                            "epochSeconds" -> return@getOrPut obj.epochSecondsValue
                                            "epochMilliseconds" -> return@getOrPut FluoriteBig(obj.toEpochMilliseconds())
                                            "epochNanoseconds" -> return@getOrPut FluoriteBig(obj.toEpochNanoseconds())
                                        }
                                    }
                                    val instant = obj.toInstant()
                                    val offset = getOffset(obj)
                                    val localDateTime = instant.toLocalDateTime(FixedOffsetTimeZone(offset))
                                    val value = when (key) {
                                        "year" -> localDateTime.year
                                        "month" -> localDateTime.month.number
                                        "day" -> localDateTime.day
                                        "dayOfWeek" -> localDateTime.dayOfWeek.isoDayNumber
                                        "hour" -> localDateTime.hour
                                        "minute" -> localDateTime.minute
                                        "second" -> localDateTime.second
                                        "nanosecond" -> localDateTime.nanosecond
                                        else -> throw FluoriteException("No such property: $key".toFluoriteString())
                                    }
                                    FluoriteInt(value)
                                }
                            },
                            OperatorMethod.TO_NUMBER.methodName to FluoriteFunction.immediate { arguments ->
                                val obj = arguments[0] as FluoriteObject
                                val epochSeconds = BigDecimal.fromBigInteger(obj.toEpochNanoseconds()).moveDecimalPoint(-9)
                                FluoriteDouble(epochSeconds.doubleValue(false))
                            },
                            OperatorMethod.TO_STRING.methodName to FluoriteFunction.immediate { arguments ->
                                val obj = arguments[0] as FluoriteObject
                                toString(obj).toFluoriteString()
                            },
                            OperatorMethod.EQUALS.methodName to FluoriteFunction.immediate { arguments ->
                                val left = arguments[0] as FluoriteObject
                                val right = arguments[1]
                                (right is FluoriteObject && left.parent === right.parent && equalTo(left, right)).toFluoriteBoolean()
                            },
                            "toInstant" to FluoriteFunction.immediate { arguments -> toInstant(arguments) },
                            "toOffsetTime" to FluoriteFunction.immediate { arguments -> toOffsetTime(arguments) },
                            "toLocalTime" to FluoriteFunction.immediate { arguments -> toLocalTime(arguments) },
                        )
                    }
                }

            }

            lateinit var instantClass: FluoriteObject
            lateinit var offsetTimeClass: FluoriteObject
            lateinit var localTimeClass: FluoriteObject

            instantClass = object : TimeFactory("INSTANT") {
                override val hasUnixTime = true

                override fun of(arguments: Array<FluoriteValue>): MutableMap<String, FluoriteValue> {
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
                    return createInstantMap(instant)
                }

                override fun parse(text: String): MutableMap<String, FluoriteValue> {
                    val (localDateTime, offset) = text.removeSuffix("Z").parseTime()
                    require(offset == null) { "UTC offset is not allowed for INSTANT" }
                    val instant = localDateTime.toInstant(TimeZone.UTC)
                    return createInstantMap(instant)
                }

                override fun now(): MutableMap<String, FluoriteValue> {
                    val instant = context.io.getCurrentInstant()
                    return createInstantMap(instant)
                }

                override fun toInstant(arguments: Array<FluoriteValue>): FluoriteObject {
                    if (arguments.size != 1) usage("INSTANT::toInstant(): INSTANT")
                    return arguments[0] as FluoriteObject
                }

                override fun toOffsetTime(arguments: Array<FluoriteValue>): FluoriteObject {
                    fun usage(): Nothing = usage("INSTANT::toOffsetTime(offsetSeconds: NUMBER): OFFSET_TIME")
                }

                override fun toLocalTime(arguments: Array<FluoriteValue>): FluoriteObject {
                    fun usage(): Nothing = usage("INSTANT::toLocalTime(offsetSeconds: NUMBER): LOCAL_TIME")
                }

                override fun getOffset(obj: FluoriteObject): UtcOffset {
                    return UtcOffset.ZERO
                }

                override fun toString(obj: FluoriteObject): String {
                    return obj.toInstant().toString()
                }

                override fun equalTo(left: FluoriteObject, right: FluoriteObject): Boolean {
                    if (left.map[EPOCH_SECONDS] != right.map[EPOCH_SECONDS]) return false
                    if (left.map[NANOSECONDS_OF_SECOND] != right.map[NANOSECONDS_OF_SECOND]) return false
                    return true
                }
            }.create()
            offsetTimeClass = object : TimeFactory("OFFSET_TIME") {
                override val hasUnixTime = true

                override fun of(arguments: Array<FluoriteValue>): MutableMap<String, FluoriteValue> {
                    fun usage(): Nothing = usage("OFFSET_TIME.of(epochSeconds: NUMBER[; nanosecondsOfSecond: NUMBER]; offsetSeconds: NUMBER): OFFSET_TIME")
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
                    return createOffsetTimeMap(instant, offset)
                }

                override fun parse(text: String): MutableMap<String, FluoriteValue> {
                    val (localDateTime, parsedOffset) = text.parseTime()
                    val offset = parsedOffset ?: throw IllegalArgumentException("UTC offset is required for OFFSET_TIME")
                    val instant = localDateTime.toInstant(FixedOffsetTimeZone(offset))
                    return createOffsetTimeMap(instant, offset)
                }

                override fun now(): MutableMap<String, FluoriteValue> {
                    val instant = context.io.getCurrentInstant()
                    val offset = context.io.getSystemTimeZone().offsetAt(instant)
                    return createOffsetTimeMap(instant, offset)
                }

                override fun toInstant(arguments: Array<FluoriteValue>): FluoriteObject {
                    fun usage(): Nothing = usage("OFFSET_TIME::toInstant(): INSTANT")
                }

                override fun toOffsetTime(arguments: Array<FluoriteValue>): FluoriteObject {
                    if (arguments.size != 1) usage("OFFSET_TIME::toOffsetTime(): OFFSET_TIME")
                    return arguments[0] as FluoriteObject
                }

                override fun toLocalTime(arguments: Array<FluoriteValue>): FluoriteObject {
                    fun usage(): Nothing = usage("OFFSET_TIME::toLocalTime(offsetSeconds: NUMBER): LOCAL_TIME")
                }

                override fun getOffset(obj: FluoriteObject): UtcOffset {
                    return UtcOffset(seconds = (obj.map[OFFSET_SECONDS] as FluoriteInt).value)
                }

                override fun toString(obj: FluoriteObject): String {
                    val instant = obj.toInstant()
                    val offset = getOffset(obj)
                    return "${instant.toLocalDateTime(FixedOffsetTimeZone(offset)).formatTime()}$offset"
                }

                override fun equalTo(left: FluoriteObject, right: FluoriteObject): Boolean {
                    if (left.map[EPOCH_SECONDS] != right.map[EPOCH_SECONDS]) return false
                    if (left.map[NANOSECONDS_OF_SECOND] != right.map[NANOSECONDS_OF_SECOND]) return false
                    if (left.map[OFFSET_SECONDS] != right.map[OFFSET_SECONDS]) return false
                    return true
                }
            }.create()
            localTimeClass = object : TimeFactory("LOCAL_TIME") {
                override val hasUnixTime = false

                override fun of(arguments: Array<FluoriteValue>): MutableMap<String, FluoriteValue> {
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
                    return createLocalTimeMap(instant, UtcOffset.ZERO)
                }

                override fun parse(text: String): MutableMap<String, FluoriteValue> {
                    val (localDateTime, offset) = text.parseTime()
                    require(offset == null) { "UTC offset is not allowed for LOCAL_TIME" }
                    val instant = localDateTime.toInstant(TimeZone.UTC)
                    return createLocalTimeMap(instant, UtcOffset.ZERO)
                }

                override fun now(): MutableMap<String, FluoriteValue> {
                    val instant = context.io.getCurrentInstant()
                    val offset = context.io.getSystemTimeZone().offsetAt(instant)
                    return createLocalTimeMap(instant, offset)
                }

                override fun toInstant(arguments: Array<FluoriteValue>): FluoriteObject {
                    fun usage(): Nothing = usage("LOCAL_TIME::toInstant(offsetSeconds: NUMBER): INSTANT")
                }

                override fun toOffsetTime(arguments: Array<FluoriteValue>): FluoriteObject {
                    fun usage(): Nothing = usage("LOCAL_TIME::toOffsetTime(offsetSeconds: NUMBER): OFFSET_TIME")
                }

                override fun toLocalTime(arguments: Array<FluoriteValue>): FluoriteObject {
                    if (arguments.size != 1) usage("LOCAL_TIME::toLocalTime(): LOCAL_TIME")
                    return arguments[0] as FluoriteObject
                }

                override fun getOffset(obj: FluoriteObject): UtcOffset {
                    return UtcOffset.ZERO
                }

                override fun toString(obj: FluoriteObject): String {
                    return obj.toInstant().toLocalDateTime(TimeZone.UTC).formatTime()
                }

                override fun equalTo(left: FluoriteObject, right: FluoriteObject): Boolean {
                    if (left.map[EPOCH_SECONDS] != right.map[EPOCH_SECONDS]) return false
                    if (left.map[NANOSECONDS_OF_SECOND] != right.map[NANOSECONDS_OF_SECOND]) return false
                    return true
                }
            }.create()

            arrayOf(
                "INSTANT" define instantClass,
                "OFFSET_TIME" define offsetTimeClass,
                "LOCAL_TIME" define localTimeClass,
            )
        },
    ).let { listOf(it) }
}
