package mirrg.xarpite.operations

import mirrg.xarpite.Environment
import mirrg.xarpite.compilers.objects.FluoriteValue
import mirrg.xarpite.compilers.objects.compareTo
import mirrg.xarpite.compilers.objects.contains
import mirrg.xarpite.compilers.objects.instanceOf

// TODO
object EqualComparator : Comparator {
    override suspend fun evaluate(env: Environment): suspend (FluoriteValue, FluoriteValue) -> Boolean = { a, b -> a == b }
    override val code get() = "EqualComparator"
}

// TODO
object NotEqualComparator : Comparator {
    override suspend fun evaluate(env: Environment): suspend (FluoriteValue, FluoriteValue) -> Boolean = { a, b -> a != b }
    override val code get() = "NotEqualComparator"
}

object GreaterComparator : Comparator {
    override suspend fun evaluate(env: Environment): suspend (FluoriteValue, FluoriteValue) -> Boolean = { a, b -> a.compareTo(b).value > 0 }
    override val code get() = "GreaterComparator"
}

object LessComparator : Comparator {
    override suspend fun evaluate(env: Environment): suspend (FluoriteValue, FluoriteValue) -> Boolean = { a, b -> a.compareTo(b).value < 0 }
    override val code get() = "LessComparator"
}

object GreaterEqualComparator : Comparator {
    override suspend fun evaluate(env: Environment): suspend (FluoriteValue, FluoriteValue) -> Boolean = { a, b -> a.compareTo(b).value >= 0 }
    override val code get() = "GreaterEqualComparator"
}

object LessEqualComparator : Comparator {
    override suspend fun evaluate(env: Environment): suspend (FluoriteValue, FluoriteValue) -> Boolean = { a, b -> a.compareTo(b).value <= 0 }
    override val code get() = "LessEqualComparator"
}

object InstanceOfComparator : Comparator {
    override suspend fun evaluate(env: Environment): suspend (FluoriteValue, FluoriteValue) -> Boolean = { a, b -> a.instanceOf(b) }
    override val code get() = "InstanceOfComparator"
}

object ContainsComparator : Comparator {
    override suspend fun evaluate(env: Environment): suspend (FluoriteValue, FluoriteValue) -> Boolean = { a, b -> b.contains(a).value }
    override val code get() = "ContainsComparator"
}
