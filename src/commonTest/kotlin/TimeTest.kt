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
import mirrg.xarpite.compilers.objects.toFluoriteString
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
            assertEquals("1999-12-31T15:00:00.123456789Z", eval("INSTANT.now().&", ioContext = ioContext, apiVersion = apiVersion).string)
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
                Triple("INSTANT", "2001-02-03", "2001-02-03T00:00:00Z"),
                Triple("INSTANT", "2001-02-03Z", "2001-02-03T00:00:00Z"),
                Triple("INSTANT", "2001-02-03T04:05:06", "2001-02-03T04:05:06Z"),
                Triple("INSTANT", "2001-02-03T04:05:06Z", "2001-02-03T04:05:06Z"),
                Triple("INSTANT", "2001-02-03T04:05:06.007", "2001-02-03T04:05:06.007Z"),
                Triple("INSTANT", "2001-02-03T04:05:06.007Z", "2001-02-03T04:05:06.007Z"),
                Triple("INSTANT", "2001-02-03T04:05:06.0078", "2001-02-03T04:05:06.007800Z"),
                Triple("INSTANT", "2001-02-03T04:05:06.007008009", "2001-02-03T04:05:06.007008009Z"),
                Triple("INSTANT", "2001-02-03T04:05:06.007008009Z", "2001-02-03T04:05:06.007008009Z"),
                Triple("TIME", "2001-02-03Z", "2001-02-03T00:00:00Z"),
                Triple("TIME", "2001-02-03T04:05:06+10:00", "2001-02-03T04:05:06+10:00"),
                Triple("TIME", "2001-02-03T04:05:06.007-10:11", "2001-02-03T04:05:06.007-10:11"),
                Triple("TIME", "2001-02-03T04:05:06.007008009+10:11", "2001-02-03T04:05:06.007008009+10:11"),
                Triple("LOCAL_TIME", "2001-02-03", "2001-02-03T00:00:00"),
                Triple("LOCAL_TIME", "2001-02-03T04:05:06", "2001-02-03T04:05:06"),
                Triple("LOCAL_TIME", "2001-02-03T04:05:06.007", "2001-02-03T04:05:06.007"),
                Triple("LOCAL_TIME", "2001-02-03T04:05:06.007008009", "2001-02-03T04:05:06.007008009"),
                Triple("INSTANT", "1969-12-31T23:59:59.999999999", "1969-12-31T23:59:59.999999999Z"),
                Triple("INSTANT", "2001-02-03T04:05:06.1200", "2001-02-03T04:05:06.120Z"),
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
            listOf(
                Pair("INSTANT", ""),
                Pair("INSTANT", "Z"),
                Pair("TIME", "Z"),
                Pair("LOCAL_TIME", ""),
            ).forEach { (name, offset) ->
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
            listOf("+00:00", "-00:00", "+09:00", "-10:11", "z", "ZZ", "+00:00Z", "Z+00:00").forEach { offset ->
                assertFailsWith<IllegalArgumentException> { eval("""$name.parse("2001-02-03T04:05:06$offset")""") }
            }
        }
        assertFailsWith<IllegalArgumentException> { eval("""LOCAL_TIME.parse("2001-02-03T04:05:06Z")""") }
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

    @Test
    fun timeOf() = runTest {
        RuntimeContext.SUPPORTED_API_VERSIONS.forEach { apiVersion ->
            listOf(
                Pair("INSTANT.of(981173106)", "2001-02-03T04:05:06Z"),
                Pair("INSTANT.of(981173106.125)", "2001-02-03T04:05:06.125Z"),
                Pair("INSTANT.of(981173106; 125_000_000)", "2001-02-03T04:05:06.125Z"),
                Pair("TIME.of(981173106; 0)", "2001-02-03T04:05:06Z"),
                Pair("TIME.of(981173106.125; 3600)", "2001-02-03T05:05:06.125+01:00"),
                Pair("TIME.of(981173106; 125_000_000; -3600 * 5)", "2001-02-02T23:05:06.125-05:00"),
                Pair("LOCAL_TIME.of(981173106)", "2001-02-03T04:05:06"),
                Pair("LOCAL_TIME.of(981173106.125)", "2001-02-03T04:05:06.125"),
                Pair("LOCAL_TIME.of(981173106; 125_000_000)", "2001-02-03T04:05:06.125"),
            ).forEach { (src, expected) ->
                assertEquals(expected, eval("$src.&", apiVersion = apiVersion).string)
            }
        }
    }

    @Test
    fun timeOfValues() = runTest {
        listOf("INSTANT", "TIME", "LOCAL_TIME").forEach { name ->
            val offset = if (name == "TIME") "; 3600" else ""
            listOf(
                "981173106; 125000000",
                "981173106.125; 0",
                "981173106.125; 125000000",
                "BIG.of(981173106); BIG.of(125000000)",
                "DOUBLE.of(981173106); DOUBLE.of(125000000)",
            ).forEach { arguments ->
                val value = eval("$name.of($arguments$offset)", ioContext = UnsupportedIoContext()) as FluoriteObject
                val nanoseconds = if (arguments == "981173106.125; 125000000") 250000000 else 125000000
                assertEquals(Instant.fromEpochSeconds(981173106, nanoseconds), value.toInstant())
                if (name == "TIME") assertEquals(3600, value.map["_offsetSeconds"]!!.int)
                assertTrue(eval("PARENT($name.of($arguments$offset)) == $name").boolean)
            }
        }
    }

    @Test
    fun timeOfRounding() = runTest {
        listOf("INSTANT", "TIME", "LOCAL_TIME").forEach { name ->
            val offset = if (name == "TIME") "; 0" else ""
            listOf(
                Pair("0.1", Instant.fromEpochSeconds(0, 100000000)),
                Pair("-0.1", Instant.fromEpochSeconds(-1, 900000000)),
                Pair("0; 1.4", Instant.fromEpochSeconds(0, 1)),
                Pair("0; 1.5", Instant.fromEpochSeconds(0, 2)),
                Pair("0; -1.4", Instant.fromEpochSeconds(-1, 999999999)),
                Pair("0; -1.5", Instant.fromEpochSeconds(-1, 999999999)),
                Pair("0.0000000004", Instant.fromEpochSeconds(0)),
                Pair("0.0000000006", Instant.fromEpochSeconds(0, 1)),
                Pair("0.125; 0.5", Instant.fromEpochSeconds(0, 125000001)),
                Pair("-0.125; -0.5", Instant.fromEpochSeconds(-1, 875000000)),
            ).forEach { (arguments, expected) ->
                val value = eval("$name.of($arguments$offset)") as FluoriteObject
                assertEquals(expected, value.toInstant())
            }
        }
        listOf(Pair("1.4", 1), Pair("1.5", 2), Pair("-1.4", -1), Pair("-1.5", -1), Pair("BIG.of(3600)", 3600)).forEach { (offset, expected) ->
            val time = eval("TIME.of(0; $offset)") as FluoriteObject
            assertEquals(expected, time.map["_offsetSeconds"]!!.int)
        }
    }

    @Test
    fun timeOfCarry() = runTest {
        listOf("INSTANT", "TIME", "LOCAL_TIME").forEach { name ->
            val offset = if (name == "TIME") "; 0" else ""
            listOf(
                Pair("0; 1000000000", Instant.fromEpochSeconds(1)),
                Pair("0; -1", Instant.fromEpochSeconds(-1, 999999999)),
                Pair("1; -1000000000", Instant.fromEpochSeconds(0)),
                Pair("1; -1000000001", Instant.fromEpochSeconds(-1, 999999999)),
                Pair("0; 999999999.5", Instant.fromEpochSeconds(1)),
                Pair("0.875; 125000000", Instant.fromEpochSeconds(1)),
                Pair("-0.875; -125000000", Instant.fromEpochSeconds(-1)),
                Pair("0; BIG.of(3000000001)", Instant.fromEpochSeconds(3, 1)),
                Pair("0; BIG.of(-3000000001)", Instant.fromEpochSeconds(-4, 999999999)),
                Pair("0; DOUBLE.of(\"9.223372036854776e18\")", Instant.fromEpochSeconds(9223372036, 854775808)),
                Pair("0; DOUBLE.of(\"-9.223372036854776e18\")", Instant.fromEpochSeconds(-9223372037, 145224192)),
                Pair("0; BIG.of(\"100000000000000000001\")", Instant.fromEpochSeconds(100000000000, 1)),
                Pair("BIG.of(\"-100000000000000000000\"); BIG.of(\"100000000000000000000000000001\")", Instant.fromEpochSeconds(0, 1)),
            ).forEach { (arguments, expected) ->
                val value = eval("$name.of($arguments$offset)") as FluoriteObject
                assertEquals(expected, value.toInstant())
            }
        }
        listOf("9007199254740993", "-9007199254740993").forEach { seconds ->
            val instant = eval("INSTANT.of(BIG.of(\"$seconds\"); 1)") as FluoriteObject
            assertEquals(Instant.fromEpochSeconds(seconds.toLong(), 1), instant.toInstant())
        }
    }

    @Test
    fun timeOfUsage() = runTest {
        listOf("INSTANT", "LOCAL_TIME").forEach { name ->
            listOf("", "0; 0; 0", "\"0\"", "NULL", "[]", "0; \"0\"", "0; NULL", "0; []").forEach { arguments ->
                assertFailsWith<FluoriteException> { eval("$name.of($arguments)") }
            }
        }
        listOf("", "0", "0; 0; 0; 0", "\"0\"; 0", "NULL; 0", "[]; 0", "0; \"0\"", "0; NULL", "0; []", "0; NULL; 0", "0; 0; NULL").forEach { arguments ->
            assertFailsWith<FluoriteException> { eval("TIME.of($arguments)") }
        }
    }

    @Test
    fun timeOfRange() = runTest {
        listOf("INSTANT", "TIME", "LOCAL_TIME").forEach { name ->
            val offset = if (name == "TIME") "; 0" else ""
            listOf("NAN", "INFINITY", "NEGATIVE_INFINITY").forEach { number ->
                assertFailsWith<IllegalArgumentException> { eval("$name.of($number$offset)") }
                assertFailsWith<IllegalArgumentException> { eval("$name.of(0; $number$offset)") }
            }
            assertFailsWith<IllegalArgumentException> { eval("$name.of(40000000000000000.0$offset)") }
        }
        listOf("64801", "-64801", "INFINITY", "NEGATIVE_INFINITY").forEach { offset ->
            assertFailsWith<IllegalArgumentException> { eval("TIME.of(0; $offset)") }
        }
        assertFailsWith<FluoriteException> { eval("TIME.of(0; NAN)") }
        assertEquals(64800, (eval("TIME.of(0; 64800)") as FluoriteObject).map["_offsetSeconds"]!!.int)
        assertEquals(-64800, (eval("TIME.of(0; -64800)") as FluoriteObject).map["_offsetSeconds"]!!.int)
    }

    @Test
    fun timeObjects() = runTest {
        RuntimeContext.SUPPORTED_API_VERSIONS.forEach { apiVersion ->
            listOf("INSTANT", "TIME", "LOCAL_TIME").forEach { name ->
                assertTrue(eval("$name.now() ?= $name", ioContext = ioContext, apiVersion = apiVersion).boolean)
                assertTrue(eval("$name.now() ?= OBJECT", ioContext = ioContext, apiVersion = apiVersion).boolean)
                assertTrue(eval("PARENT($name.now()) == $name", ioContext = ioContext, apiVersion = apiVersion).boolean)
                assertTrue(eval("PARENT($name) == OBJECT", ioContext = ioContext, apiVersion = apiVersion).boolean)
                assertEquals(123, eval("x := $name.now(); x.item = 123; x.item", ioContext = ioContext, apiVersion = apiVersion).int)
                assertEquals(456, eval("x := $name.now(); x(\"item\") = 456; x(\"item\")", ioContext = ioContext, apiVersion = apiVersion).int)
                assertTrue(eval("x := $name.now(); text := x.&; x.item = 123; x -= \"item\"; x.& == text", ioContext = ioContext, apiVersion = apiVersion).boolean)
                assertTrue(eval("x := $name.now(); x == x", ioContext = ioContext, apiVersion = apiVersion).boolean)
            }
        }
    }

    @Test
    fun timeObjectEquality() = runTest {
        listOf("INSTANT", "TIME", "LOCAL_TIME").forEach { name ->
            val left = eval("$name{_epochSeconds: BIG.of(0); _nanosecondsOfSecond: 0}", ioContext = ioContext) as FluoriteObject
            val right = FluoriteObject(left.parent, left.map.toMutableMap())
            assertEquals(false, left == right)
            assertEquals(false, left.strictEquals(right))
            assertEquals(true, left.strictEquals(left))
        }
    }

    @Test
    fun instantString() = runTest {
        listOf(
            Pair(Instant.fromEpochSeconds(0), "1970-01-01T00:00:00Z"),
            Pair(Instant.fromEpochSeconds(946652400), "1999-12-31T15:00:00Z"),
            Pair(Instant.fromEpochSeconds(946652400, 123456789), "1999-12-31T15:00:00.123456789Z"),
            Pair(Instant.fromEpochSeconds(0, 1), "1970-01-01T00:00:00.000000001Z"),
            Pair(Instant.fromEpochSeconds(0, 1_000_000), "1970-01-01T00:00:00.001Z"),
            Pair(Instant.fromEpochSeconds(0, 120_000_000), "1970-01-01T00:00:00.120Z"),
            Pair(Instant.fromEpochSeconds(0, 123_456_000), "1970-01-01T00:00:00.123456Z"),
            Pair(Instant.fromEpochSeconds(-1), "1969-12-31T23:59:59Z"),
            Pair(Instant.fromEpochSeconds(-1, 500_000_000), "1969-12-31T23:59:59.500Z"),
            Pair(Instant.fromEpochSeconds(-2, 500_000_000), "1969-12-31T23:59:58.500Z"),
            Pair(Instant.fromEpochSeconds(-1, 1), "1969-12-31T23:59:59.000000001Z"),
            Pair(Instant.fromEpochSeconds(-1, 999_999_999), "1969-12-31T23:59:59.999999999Z"),
        ).forEach { (instant, expected) ->
            val value = eval("INSTANT{_epochSeconds: BIG.of(\"${instant.epochSeconds}\"); _nanosecondsOfSecond: ${instant.nanosecondsOfSecond}}", ioContext = ioContext)
            assertEquals(expected, value.toFluoriteString(null).value)
        }
        assertEquals("1999-12-31T15:00:00.123456789Z", eval("INSTANT.now().&", ioContext = ioContext).string)
        assertTrue(eval("x := INSTANT.now(); &x == x.&", ioContext = ioContext).boolean)
    }

    @Test
    fun timeString() = runTest {
        listOf(
            Pair(0, ""),
            Pair(1_000_000, ".001"),
            Pair(100_000_000, ".100"),
            Pair(120_000_000, ".120"),
            Pair(123_000_000, ".123"),
            Pair(1_000, ".000001"),
            Pair(123_400_000, ".123400"),
            Pair(123_450_000, ".123450"),
            Pair(123_456_000, ".123456"),
            Pair(123_456_700, ".123456700"),
            Pair(123_456_780, ".123456780"),
            Pair(123_456_789, ".123456789"),
            Pair(1, ".000000001"),
        ).forEach { (nanoseconds, fraction) ->
            val instant = eval("INSTANT{_epochSeconds: BIG.of(946684800); _nanosecondsOfSecond: $nanoseconds}", ioContext = ioContext)
            assertEquals("2000-01-01T00:00:00${fraction}Z", instant.toFluoriteString(null).value)
            val time = eval("TIME{_epochSeconds: BIG.of(946652400); _nanosecondsOfSecond: $nanoseconds; _offsetSeconds: 32400}", ioContext = ioContext)
            assertEquals("2000-01-01T00:00:00${fraction}+09:00", time.toFluoriteString(null).value)
            val localTime = eval("LOCAL_TIME{_epochSeconds: BIG.of(946684800); _nanosecondsOfSecond: $nanoseconds}", ioContext = ioContext)
            assertEquals("2000-01-01T00:00:00$fraction", localTime.toFluoriteString(null).value)
        }

        assertEquals("1970-01-01T00:00:00Z", eval("TIME{_epochSeconds: BIG.of(0); _nanosecondsOfSecond: 0; _offsetSeconds: 0}.&", ioContext = ioContext).string)
        assertEquals("1969-12-31T20:30:00-03:30", eval("TIME{_epochSeconds: BIG.of(0); _nanosecondsOfSecond: 0; _offsetSeconds: -12600}.&", ioContext = ioContext).string)
        assertEquals("1970-01-01T05:45:00+05:45", eval("TIME{_epochSeconds: BIG.of(0); _nanosecondsOfSecond: 0; _offsetSeconds: 20700}.&", ioContext = ioContext).string)
        assertEquals("1970-01-01T00:00:30+00:00:30", eval("TIME{_epochSeconds: BIG.of(0); _nanosecondsOfSecond: 0; _offsetSeconds: 30}.&", ioContext = ioContext).string)
        assertEquals("2000-02-29T12:34:56.000000001", eval("LOCAL_TIME{_epochSeconds: BIG.of(951827696); _nanosecondsOfSecond: 1}.&", ioContext = ioContext).string)

        assertEquals("2000-01-01T00:00:00.123456789+09:00", eval("TIME.now().&", ioContext = ioContext).string)
        assertEquals("2000-01-01T00:00:00.123456789", eval("LOCAL_TIME.now().&", ioContext = ioContext).string)
        assertTrue(eval("x := TIME.now(); &x == x.&", ioContext = ioContext).boolean)
        assertTrue(eval("x := LOCAL_TIME.now(); &x == x.&", ioContext = ioContext).boolean)
    }

    @Test
    fun timeProperties() = runTest {
        listOf("INSTANT", "TIME", "LOCAL_TIME").forEach { name ->
            assertTrue(eval("$name.now()._epochSeconds ?= BIG", ioContext = ioContext).boolean)
            assertTrue(eval("$name.now()._nanosecondsOfSecond ?= INT", ioContext = ioContext).boolean)
        }
        assertTrue(eval("TIME.now()._offsetSeconds ?= INT", ioContext = ioContext).boolean)
        assertEquals("1970-01-01T00:00:00.500Z", eval("x := INSTANT.now(); x.&; x._epochSeconds = BIG.of(0); x._nanosecondsOfSecond = 500000000; x.&", ioContext = ioContext).string)
        assertEquals("1970-01-01T09:00:00.500+09:00", eval("x := TIME.now(); x.&; x._epochSeconds = BIG.of(0); x._nanosecondsOfSecond = 500000000; x._offsetSeconds = 32400; x.&", ioContext = ioContext).string)
        assertEquals("1970-01-01T00:00:00.500", eval("x := LOCAL_TIME.now(); x.&; x._epochSeconds = BIG.of(0); x._nanosecondsOfSecond = 500000000; x.&", ioContext = ioContext).string)
    }

}

private fun FluoriteObject.toInstant() = Instant.fromEpochSeconds(
    (this.map["_epochSeconds"] as FluoriteBig).value.longValue(true),
    (this.map["_nanosecondsOfSecond"] as FluoriteInt).value,
)
