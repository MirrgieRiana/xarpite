package mirrg.xarpite.operations

import mirrg.xarpite.Environment
import mirrg.xarpite.Position
import mirrg.xarpite.compilers.objects.FluoriteValue
import mirrg.xarpite.compilers.objects.compareTo
import mirrg.xarpite.compilers.objects.contains
import mirrg.xarpite.compilers.objects.instanceOf

// TODO
class EqualComparator(private val position: Position) : Comparator {
    override suspend fun evaluate(env: Environment): suspend (FluoriteValue, FluoriteValue) -> Boolean = { a, b -> a == b }
    override val code get() = "EqualComparator"
}

// TODO
class NotEqualComparator(private val position: Position) : Comparator {
    override suspend fun evaluate(env: Environment): suspend (FluoriteValue, FluoriteValue) -> Boolean = { a, b -> a != b }
    override val code get() = "NotEqualComparator"
}

class GreaterComparator(private val position: Position) : Comparator {
    override suspend fun evaluate(env: Environment): suspend (FluoriteValue, FluoriteValue) -> Boolean = { a, b -> a.compareTo(position, b).value > 0 }
    override val code get() = "GreaterComparator"
}

class LessComparator(private val position: Position) : Comparator {
    override suspend fun evaluate(env: Environment): suspend (FluoriteValue, FluoriteValue) -> Boolean = { a, b -> a.compareTo(position, b).value < 0 }
    override val code get() = "LessComparator"
}

class GreaterEqualComparator(private val position: Position) : Comparator {
    override suspend fun evaluate(env: Environment): suspend (FluoriteValue, FluoriteValue) -> Boolean = { a, b -> a.compareTo(position, b).value >= 0 }
    override val code get() = "GreaterEqualComparator"
}

class LessEqualComparator(private val position: Position) : Comparator {
    override suspend fun evaluate(env: Environment): suspend (FluoriteValue, FluoriteValue) -> Boolean = { a, b -> a.compareTo(position, b).value <= 0 }
    override val code get() = "LessEqualComparator"
}

class InstanceOfComparator(private val position: Position) : Comparator {
    override suspend fun evaluate(env: Environment): suspend (FluoriteValue, FluoriteValue) -> Boolean = { a, b -> a.instanceOf(b) }
    override val code get() = "InstanceOfComparator"
}

class ContainsComparator(private val position: Position) : Comparator {
    override suspend fun evaluate(env: Environment): suspend (FluoriteValue, FluoriteValue) -> Boolean = { a, b -> b.contains(position, a).value }
    override val code get() = "ContainsComparator"
}

class NotContainsComparator(private val position: Position) : Comparator {
    override suspend fun evaluate(env: Environment): suspend (FluoriteValue, FluoriteValue) -> Boolean = { a, b -> !b.contains(position, a).value }
    override val code get() = "NotContainsComparator"
}
