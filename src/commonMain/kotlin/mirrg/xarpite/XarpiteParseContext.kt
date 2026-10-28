package mirrg.xarpite

import io.github.mirrgieriana.xarpeg.DefaultParseContext

class XarpiteParseContext(src: String, nextNodeId: Int = 0) : DefaultParseContext(src) {
    var currentIndent: Int = 0
    var nextNodeId: Int = nextNodeId
        private set

    fun allocateNodeId(): Int = nextNodeId++

    override fun getState(): Any = currentIndent
}
