package mirrg.xarpite

import mirrg.xarpite.compilers.objects.FluoriteValue
import mirrg.xarpite.compilers.objects.consume
import mirrg.xarpite.compilers.objects.invoke
import mirrg.xarpite.operations.BuiltinMountRunner
import mirrg.xarpite.operations.Runner


class Frame(val parent: Frame? = null) {
    val frameIndex: Int = parent?.let { it.frameIndex + 1 } ?: 0
    val variableIndexTable = mutableMapOf<String, Int>()
    var nextVariableIndex = 0
    var mountCount = 0
    val labelIndexTable = mutableMapOf<String, Int>()
    var nextLabelIndex = 0
}

class Environment(val parent: Environment?, variableCount: Int, mountCount: Int) {
    val variableTable: Array<Array<Variable?>> = if (parent != null) {
        arrayOf(*parent.variableTable, arrayOfNulls(variableCount))
    } else {
        arrayOf(arrayOfNulls(variableCount))
    }
    val mountTable: Array<Array<Map<String, Mount>>> = if (parent != null) {
        arrayOf(*parent.mountTable, Array(mountCount) { mapOf() })
    } else {
        arrayOf(Array(mountCount) { mapOf() })
    }
}


fun interface Mount {
    suspend fun get(): FluoriteValue
}

class ConstantMount(val value: FluoriteValue) : Mount {
    override suspend fun get() = value
}

infix fun String.define(mount: Mount) = Pair(this, mount)
infix fun String.define(value: FluoriteValue) = this define ConstantMount(value)


interface Variable {
    suspend fun get(): FluoriteValue
    suspend fun set(value: FluoriteValue)
}

class LocalVariable(var value: FluoriteValue) : Variable {
    override suspend fun get() = value
    override suspend fun set(value: FluoriteValue) {
        this.value = value
    }
}

class DelegatedVariable(val function: FluoriteValue, val position: Position) : Variable {
    override suspend fun get() = function.invoke(position, emptyArray())
    override suspend fun set(value: FluoriteValue) {
        function.invoke(position, arrayOf(value)).consume()
    }
}


fun Frame.defineVariable(name: String): Int {
    val variableIndex = nextVariableIndex
    variableIndexTable[name] = variableIndex
    nextVariableIndex++
    return variableIndex
}

fun Frame.getVariable(name: String): Pair<Int, Int>? {
    var currentFrame = this
    while (true) {
        val variableIndex = currentFrame.variableIndexTable[name]
        if (variableIndex != null) return Pair(currentFrame.frameIndex, variableIndex)
        currentFrame = currentFrame.parent ?: return null
    }
}

fun Frame.mount(): Int {
    val mountIndex = mountCount
    mountCount++
    return mountIndex
}

fun Frame.getMountCounts(): IntArray {
    val mountCounts = mutableListOf<Int>()
    var frame = this
    while (true) {
        mountCounts += frame.mountCount
        frame = frame.parent ?: break
    }
    return mountCounts.reversed().toIntArray()
}

fun Frame.defineBuiltinMount(map: Map<String, Mount>): Runner {
    val newMountIndex = mount()
    return BuiltinMountRunner(frameIndex, newMountIndex, map)
}

fun Environment.getMounts(name: String, mountCounts: IntArray): Sequence<Mount> {
    return sequence {
        var currentFrameIndex = mountCounts.size - 1
        while (currentFrameIndex >= 0) {

            var currentMountIndex = mountCounts[currentFrameIndex] - 1
            while (currentMountIndex >= 0) {

                val value = this@getMounts.mountTable[currentFrameIndex][currentMountIndex][name]
                if (value != null) yield(value)

                currentMountIndex--
            }

            currentFrameIndex--
        }
    }
}

fun Frame.defineLabel(name: String): Int {
    val labelIndex = nextLabelIndex
    labelIndexTable[name] = labelIndex
    nextLabelIndex++
    return labelIndex
}

fun Frame.getLabel(name: String): Pair<Int, Int>? {
    var currentFrame = this
    while (true) {
        val labelIndex = currentFrame.labelIndexTable[name]
        if (labelIndex != null) return Pair(currentFrame.frameIndex, labelIndex)
        currentFrame = currentFrame.parent ?: return null
    }
}
