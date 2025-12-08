package mirrg.xarpite.operations

import mirrg.xarpite.Environment
import mirrg.xarpite.LocalVariable
import mirrg.xarpite.compilers.objects.FluoriteObject
import mirrg.xarpite.compilers.objects.FluoriteStream
import mirrg.xarpite.compilers.objects.FluoriteValue
import mirrg.xarpite.compilers.objects.collect

class GetterRunner(private val getter: Getter) : Runner {
    override suspend fun evaluate(env: Environment) {
        val result = getter.evaluate(env)
        if (result is FluoriteStream) {
            result.collect {
                // イテレーションは行うがその結果は握りつぶす
            }
        }
    }

    override val code get() = "GetterRunner[${getter.code}]"
}

class AssignmentRunner(private val setter: Setter, private val getter: Getter) : Runner {
    override suspend fun evaluate(env: Environment) {
        val left = setter.evaluate(env)
        val right = getter.evaluate(env)
        left.invoke(right)
    }

    override val code get() = "AssignmentRunner[${setter.code};${getter.code}]"
}

class TryCatchRunner(private val leftRunners: List<Runner>, private val newFrameIndex: Int, private val argumentVariableIndex: Int, private val rightRunners: List<Runner>) : Runner {
    override suspend fun evaluate(env: Environment) {
        try {
            leftRunners.forEach {
                it.evaluate(env)
            }
        } catch (e: FluoriteException) {
            val newEnv = Environment(env, 1, 0)
            newEnv.variableTable[newFrameIndex][argumentVariableIndex] = LocalVariable(e.value)
            rightRunners.forEach {
                it.evaluate(newEnv)
            }
        }
    }

    override val code get() = "TryCatchRunner[${leftRunners.code};$newFrameIndex;$argumentVariableIndex;${rightRunners.code}]"
}

class MountRunner(private val frameIndex: Int, private val mountIndex: Int, private val getter: Getter) : Runner {
    override suspend fun evaluate(env: Environment) {
        env.mountTable[frameIndex][mountIndex] = (getter.evaluate(env) as FluoriteObject).map.toMap()
    }

    override val code get() = "MountRunner[$frameIndex;$mountIndex;${getter.code}]"
}

class BuiltinMountRunner(private val frameIndex: Int, private val mountIndex: Int, private val entries: Map<String, FluoriteValue>) : Runner {
    override suspend fun evaluate(env: Environment) {
        env.mountTable[frameIndex][mountIndex] = entries
    }

    override val code get() = "BuiltinMountRunner[$frameIndex;$mountIndex;{${entries.keys.sorted().joinToString { it }}}]"
}
