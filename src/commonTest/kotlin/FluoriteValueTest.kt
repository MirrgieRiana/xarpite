import kotlinx.coroutines.test.runTest
import mirrg.xarpite.OperatorMethod
import mirrg.xarpite.compilers.objects.FluoriteBoolean
import mirrg.xarpite.compilers.objects.FluoriteFunction
import mirrg.xarpite.compilers.objects.FluoriteInt
import mirrg.xarpite.compilers.objects.FluoriteObject
import mirrg.xarpite.compilers.objects.SuspendingComparisonRequired
import mirrg.xarpite.test.array
import mirrg.xarpite.test.eval
import kotlin.test.Test
import kotlin.test.assertEquals
import kotlin.test.assertFailsWith
import kotlin.test.assertSame

class FluoriteValueTest {
    @Test
    fun nonSuspendingEquality() {
        assertEquals(true, FluoriteInt(1).equalToNonSuspending(FluoriteInt(1)))
        assertEquals(false, FluoriteInt(1).equalToNonSuspending(FluoriteInt(2)))

        val obj = FluoriteObject(FluoriteObject.fluoriteClass, mutableMapOf())
        repeat(2) {
            assertSame(SuspendingComparisonRequired, assertFailsWith<SuspendingComparisonRequired> {
                obj.equalToNonSuspending(obj)
            })
        }
    }

    @Test
    fun suspendingEquality() = runTest {
        val parent = FluoriteObject(
            FluoriteObject.fluoriteClass, mutableMapOf(
                OperatorMethod.EQUALS.methodName to FluoriteFunction.immediate { FluoriteBoolean.TRUE },
            )
        )
        val left = FluoriteObject(parent, mutableMapOf())
        val right = FluoriteObject(parent, mutableMapOf())
        assertEquals(true, left.equalTo(null, right))
        assertEquals(false, left == right)
        assertEquals(false, listOf(left).contains(right))

        val obj = FluoriteObject(FluoriteObject.fluoriteClass, mutableMapOf())
        assertEquals(true, obj.equalTo(null, obj))
        assertEquals(false, obj.equalTo(null, left))
        assertEquals(true, FluoriteInt(1).equalTo(null, FluoriteInt(1)))
        assertEquals(false, FluoriteInt(1).equalTo(null, FluoriteInt(2)))
    }

    @Test
    fun equalityIgnoresNonObjectMethods() = runTest {
        val map = FluoriteInt.fluoriteClass.map
        val previous = map.put(OperatorMethod.EQUALS.methodName, FluoriteFunction.immediate { error("Not called") })
        try {
            assertEquals(true, FluoriteInt(1).equalToNonSuspending(FluoriteInt(1)))
            assertEquals(true, FluoriteInt(1).equalTo(null, FluoriteInt(1)))
            assertEquals("[TRUE;FALSE;FALSE;TRUE]", eval("[1 == 1, 1 != 1, 1 == 2, 1 != 2]").array())
        } finally {
            if (previous == null) {
                map.remove(OperatorMethod.EQUALS.methodName)
            } else {
                map[OperatorMethod.EQUALS.methodName] = previous
            }
        }
    }
}
