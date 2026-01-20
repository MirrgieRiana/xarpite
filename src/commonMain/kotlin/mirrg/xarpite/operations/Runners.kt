package mirrg.xarpite.operations

import mirrg.xarpite.Environment
import mirrg.xarpite.LocalVariable
import mirrg.xarpite.compilers.objects.FluoriteObject
import mirrg.xarpite.compilers.objects.FluoriteValue
import mirrg.xarpite.compilers.objects.consume

class GetterRunner(private val getter: Getter) : Runner {
    override suspend fun evaluate(env: Environment) {
        getter.evaluate(env).consume()
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

class TryCatchWithVariableRunner(private val leftRunners: List<Runner>, private val newFrameIndex: Int, private val argumentVariableIndex: Int, private val rightRunners: List<Runner>) : Runner {
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

    override val code get() = "TryCatchWithVariableRunner[${leftRunners.code};$newFrameIndex;$argumentVariableIndex;${rightRunners.code}]"
}

class TryCatchRunner(private val leftRunners: List<Runner>, private val rightRunners: List<Runner>) : Runner {
    override suspend fun evaluate(env: Environment) {
        try {
            leftRunners.forEach {
                it.evaluate(env)
            }
        } catch (_: FluoriteException) {
            rightRunners.forEach {
                it.evaluate(env)
            }
        }
    }

    override val code get() = "TryCatchRunner[${leftRunners.code};${rightRunners.code}]"
}

class LabelRunner(private val frameIndex: Int, private val labelIndex: Int, private val runners: List<Runner>) : Runner {
    override suspend fun evaluate(env: Environment) {
        try {
            val newEnv = Environment(env, 0, 0)
            runners.forEach {
                it.evaluate(newEnv)
            }
        } catch (returner: Returner) {
            if (returner.frameIndex == frameIndex && returner.labelIndex == labelIndex) {
                val value = returner.value
                Returner.recycle(returner)
                value.consume()
            } else {
                throw returner
            }
        }
    }

    override val code get() = "LabelRunner[$frameIndex;$labelIndex;${runners.code}]"
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
