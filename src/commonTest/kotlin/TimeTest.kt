import kotlinx.coroutines.test.runTest
import kotlinx.datetime.FixedOffsetTimeZone
import kotlinx.datetime.TimeZone
import kotlinx.datetime.UtcOffset
import kotlinx.datetime.offsetAt
import kotlinx.datetime.toInstant
import kotlinx.datetime.toLocalDateTime
import mirrg.xarpite.RuntimeContext
import mirrg.xarpite.UnsupportedIoContext
import mirrg.xarpite.compilers.objects.FluoriteBig
import mirrg.xarpite.compilers.objects.FluoriteInt
import mirrg.xarpite.compilers.objects.FluoriteObject
import mirrg.xarpite.mounts.createCommonMounts
import mirrg.xarpite.operations.FluoriteException
import mirrg.xarpite.test.boolean
import mirrg.xarpite.test.eval
import mirrg.xarpite.test.get
import mirrg.xarpite.test.int
import mirrg.xarpite.test.string
import mirrg.xarpite.withEvaluator
import kotlin.test.Test
import kotlin.test.assertEquals
import kotlin.test.assertFailsWith
import kotlin.test.assertTrue
import kotlin.time.Instant

class TimeTest {

    private val fixedInstant = Instant.fromEpochSeconds(946652400, 123456789)
    private val fixedTimeZone: TimeZone = FixedOffsetTimeZone(UtcOffset(hours = 9))
    private val ioContext = object : UnsupportedIoContext() {
        override fun getCurrentInstant() = fixedInstant
        override fun getSystemTimeZone() = fixedTimeZone
    }

    @Test
    fun now() = runTest {
        RuntimeContext.SUPPORTED_API_VERSIONS.forEach { apiVersion ->
            val now = eval("NOW()", ioContext = ioContext, apiVersion = apiVersion)
            assertTrue(now is FluoriteBig)
            assertEquals("946652400", now.toString())
        }
    }

    @Test
    fun nowUsesIoContext() = runTest {
        RuntimeContext.SUPPORTED_API_VERSIONS.forEach { apiVersion ->
            var instantReads = 0
            var timeZoneReads = 0
            val ioContext = object : UnsupportedIoContext() {
                override fun getCurrentInstant(): Instant {
                    instantReads++
                    return fixedInstant
                }

                override fun getSystemTimeZone(): TimeZone {
                    timeZoneReads++
                    return fixedTimeZone
                }
            }

            assertEquals("946652400", eval("NOW()", ioContext = ioContext, apiVersion = apiVersion).toString())
            assertEquals("946652400.123456789", eval("INSTANT.now().&", ioContext = ioContext, apiVersion = apiVersion).string)
            assertEquals(2, instantReads)
            assertEquals(0, timeZoneReads)
            assertEquals("2000-01-01T00:00:00.123456789+09:00", eval("TIME.now().&", ioContext = ioContext, apiVersion = apiVersion).string)
            assertEquals("2000-01-01T00:00:00.123456789", eval("LOCAL_TIME.now().&", ioContext = ioContext, apiVersion = apiVersion).string)
            assertEquals(4, instantReads)
            assertEquals(2, timeZoneReads)
        }
    }

    @Test
    fun nowIsNotCached() = runTest {
        var currentInstant = fixedInstant
        val ioContext = object : UnsupportedIoContext() {
            override fun getCurrentInstant() = currentInstant
        }
        withEvaluator(ioContext) { context, evaluator ->
            evaluator.defineMounts(context.run { createCommonMounts() })
            assertEquals("946652400", evaluator.get("NOW()").toString())
            currentInstant = Instant.fromEpochSeconds(2147483648, 987654321)
            assertEquals("2147483648", evaluator.get("NOW()").toString())
            currentInstant = Instant.fromEpochSeconds(-1, 999999999)
            assertEquals("-1", evaluator.get("NOW()").toString())
        }
    }

    @Test
    fun nowInString() = runTest {
        assertEquals("946652400-title.md", eval(""" "$(NOW())-title.md" """, ioContext = ioContext).string)
    }

    @Test
    fun nowErrors() = runTest {
        assertFailsWith<FluoriteException> { eval("NOW(0)", ioContext = ioContext) }
        assertFailsWith<FluoriteException> { eval("NOW(0; 1)", ioContext = ioContext) }
    }

    @Test
    fun instantNow() = runTest {
        RuntimeContext.SUPPORTED_API_VERSIONS.forEach { apiVersion ->
            val instant = eval("INSTANT.now()", ioContext = ioContext, apiVersion = apiVersion)
            assertTrue(instant is FluoriteObject)
            assertEquals(fixedInstant, instant.toInstant())
        }
    }

    @Test
    fun timeNow() = runTest {
        RuntimeContext.SUPPORTED_API_VERSIONS.forEach { apiVersion ->
            val time = eval("TIME.now()", ioContext = ioContext, apiVersion = apiVersion)
            assertTrue(time is FluoriteObject)
            assertEquals(fixedInstant, time.toInstant())
            assertEquals(32400, time.map["_offsetSeconds"]!!.int)
        }
    }

    @Test
    fun localTimeNow() = runTest {
        RuntimeContext.SUPPORTED_API_VERSIONS.forEach { apiVersion ->
            val localTime = eval("LOCAL_TIME.now()", ioContext = ioContext, apiVersion = apiVersion)
            assertTrue(localTime is FluoriteObject)
            assertEquals(Instant.fromEpochSeconds(946684800, 123456789), localTime.toInstant())
        }
    }

    @Test
    fun timeNowIsNotCached() = runTest {
        var currentInstant = fixedInstant
        var currentTimeZone = fixedTimeZone
        val ioContext = object : UnsupportedIoContext() {
            override fun getCurrentInstant() = currentInstant
            override fun getSystemTimeZone() = currentTimeZone
        }
        withEvaluator(ioContext) { context, evaluator ->
            evaluator.defineMounts(context.run { createCommonMounts() })
            listOf(
                Pair(fixedInstant, fixedTimeZone),
                Pair(fixedInstant, FixedOffsetTimeZone(UtcOffset(hours = -3, minutes = -30))),
                Pair(Instant.fromEpochSeconds(946684801, 987654321), TimeZone.UTC),
            ).forEach { (instant, timeZone) ->
                currentInstant = instant
                currentTimeZone = timeZone
                listOf("INSTANT", "TIME", "LOCAL_TIME").forEach { name ->
                    val value = evaluator.get("$name.now()") as FluoriteObject
                    val expected = if (name == "LOCAL_TIME") instant.toLocalDateTime(timeZone).toInstant(TimeZone.UTC) else instant
                    assertEquals(expected, value.toInstant())
                    if (name == "TIME") assertEquals(timeZone.offsetAt(instant).totalSeconds, value.map["_offsetSeconds"]!!.int)
                }
            }
        }
    }

    @Test
    fun timeNowErrors() = runTest {
        listOf("INSTANT", "TIME", "LOCAL_TIME").forEach { name ->
            assertFailsWith<FluoriteException> { eval("$name.now(0)", ioContext = ioContext) }
            assertFailsWith<FluoriteException> { eval("$name.now(0; 1)", ioContext = ioContext) }
        }
    }

    @Test
    fun timeParse() = runTest {
        RuntimeContext.SUPPORTED_API_VERSIONS.forEach { apiVersion ->
            listOf(
                Triple("INSTANT", "2001-02-03", "981158400"),
                Triple("INSTANT", "2001-02-03T04:05:06", "981173106"),
                Triple("INSTANT", "2001-02-03T04:05:06.007", "981173106.007"),
                Triple("INSTANT", "2001-02-03T04:05:06.007008009", "981173106.007008009"),
                Triple("TIME", "2001-02-03Z", "2001-02-03T00:00:00Z"),
                Triple("TIME", "2001-02-03T04:05:06+10:00", "2001-02-03T04:05:06+10:00"),
                Triple("TIME", "2001-02-03T04:05:06.007-10:11", "2001-02-03T04:05:06.007-10:11"),
                Triple("TIME", "2001-02-03T04:05:06.007008009+10:11", "2001-02-03T04:05:06.007008009+10:11"),
                Triple("LOCAL_TIME", "2001-02-03", "2001-02-03T00:00:00"),
                Triple("LOCAL_TIME", "2001-02-03T04:05:06", "2001-02-03T04:05:06"),
                Triple("LOCAL_TIME", "2001-02-03T04:05:06.007", "2001-02-03T04:05:06.007"),
                Triple("LOCAL_TIME", "2001-02-03T04:05:06.007008009", "2001-02-03T04:05:06.007008009"),
                Triple("INSTANT", "1969-12-31T23:59:59.999999999", "-0.000000001"),
                Triple("INSTANT", "2001-02-03T04:05:06.1200", "981173106.12"),
                Triple("TIME", "2001-02-03T04:05:06.000000000+00:00", "2001-02-03T04:05:06Z"),
                Triple("TIME", "2001-02-03-00:00", "2001-02-03T00:00:00Z"),
                Triple("LOCAL_TIME", "2001-02-03T04:05:06.1200", "2001-02-03T04:05:06.120"),
                Triple("LOCAL_TIME", "0000-01-01", "0000-01-01T00:00:00"),
                Triple("LOCAL_TIME", "9999-12-31", "9999-12-31T00:00:00"),
                Triple("LOCAL_TIME", "2000-02-29", "2000-02-29T00:00:00"),
            ).forEach { (name, text, expected) ->
                assertEquals(expected, eval("""$name.parse("$text").&""", apiVersion = apiVersion).string)
            }
        }
    }

    @Test
    fun timeParsePrecision() = runTest {
        listOf(
            Pair("1", 100000000),
            Pair("12", 120000000),
            Pair("123", 123000000),
            Pair("1234", 123400000),
            Pair("12345", 123450000),
            Pair("123456", 123456000),
            Pair("1234567", 123456700),
            Pair("12345678", 123456780),
            Pair("123456789", 123456789),
            Pair("000000001", 1),
            Pair("000000000", 0),
        ).forEach { (fraction, nanoseconds) ->
            listOf("INSTANT", "TIME", "LOCAL_TIME").forEach { name ->
                val offset = if (name == "TIME") "Z" else ""
                val value = eval("""$name.parse("1970-01-01T00:00:00.$fraction$offset")""") as FluoriteObject
                assertEquals(Instant.fromEpochSeconds(0, nanoseconds), value.toInstant())
            }
        }
    }

    @Test
    fun timeParseValues() = runTest {
        listOf(
            Triple("2001-02-03Z", 981158400L, 0),
            Triple("2001-02-03T04:05:06+10:00", 981137106L, 36000),
            Triple("2001-02-03T04:05:06-10:11", 981209766L, -36660),
            Triple("1970-01-01T00:00:00+18:00", -64800L, 64800),
            Triple("1970-01-01T00:00:00-18:00", 64800L, -64800),
        ).forEach { (text, epochSeconds, offsetSeconds) ->
            val time = eval("""TIME.parse("$text")""") as FluoriteObject
            assertEquals(Instant.fromEpochSeconds(epochSeconds), time.toInstant())
            assertEquals(offsetSeconds, time.map["_offsetSeconds"]!!.int)
        }
        listOf("INSTANT", "LOCAL_TIME").forEach { name ->
            val value = eval("""$name.parse("2038-01-19T03:14:08")""") as FluoriteObject
            assertEquals(Instant.fromEpochSeconds(2147483648), value.toInstant())
            assertTrue("_offsetSeconds" !in value.map)
        }
    }

    @Test
    fun timeParseObjects() = runTest {
        listOf("INSTANT", "TIME", "LOCAL_TIME").forEach { name ->
            val offset = if (name == "TIME") "Z" else ""
            assertTrue(eval("""PARENT($name.parse("2001-02-03$offset")) == $name""").boolean)
            assertTrue(eval("""$name.parse("2001-02-03$offset") ?= OBJECT""").boolean)
        }
    }

    @Test
    fun timeParseErrors() = runTest {
        listOf(
            "",
            "04:05:06",
            "2001-02",
            "2001-2-03",
            "2001-02-3",
            "2001/02/03",
            "001-02-03",
            "10000-02-03",
            "+2001-02-03",
            "2001-02-03.007",
            "2001-02-03t04:05:06",
            "2001-02-03 04:05:06",
            "2001-02-03T04:05",
            "2001-02-03T4:05:06",
            "2001-02-03T04:05:06.",
            "2001-02-03T04:05:06.1234567890",
            "2001-02-03T04:05:06,007",
            "2001-02-29",
            "2001-00-03",
            "2001-13-03",
            "2001-02-00",
            "2001-02-30",
            "2001-02-03T24:00:00",
            "2001-02-03T04:60:00",
            "2001-02-03T04:05:60",
            " 2001-02-03",
            "2001-02-03 ",
        ).forEach { text ->
            listOf("INSTANT", "TIME", "LOCAL_TIME").forEach { name ->
                val offset = if (name == "TIME") "Z" else ""
                assertFailsWith<IllegalArgumentException>("$name.parse: $text$offset") { eval("""$name.parse("$text$offset")""") }
            }
        }
    }

    @Test
    fun timeParseOffsetErrors() = runTest {
        listOf("INSTANT", "LOCAL_TIME").forEach { name ->
            listOf("Z", "+00:00", "+09:00", "-10:11").forEach { offset ->
                assertFailsWith<IllegalArgumentException> { eval("""$name.parse("2001-02-03T04:05:06$offset")""") }
            }
        }
        listOf("", "z", "+09", "+0900", "+09:00:30", "+19:00", "+18:01", "+09:60", "Z+09:00").forEach { offset ->
            assertFailsWith<IllegalArgumentException> { eval("""TIME.parse("2001-02-03T04:05:06$offset")""") }
        }
    }

    @Test
    fun timeParseUsage() = runTest {
        listOf("INSTANT", "TIME", "LOCAL_TIME").forEach { name ->
            listOf("", "0", "NULL", "[]", "\"2001-02-03\"; \"2001-02-03\"").forEach { arguments ->
                assertFailsWith<FluoriteException> { eval("$name.parse($arguments)") }
            }
        }
    }

}

private fun FluoriteObject.toInstant() = Instant.fromEpochSeconds(
    (this.map["_epochSeconds"] as FluoriteBig).value.longValue(true),
    (this.map["_nanosecondsOfSecond"] as FluoriteInt).value,
)
