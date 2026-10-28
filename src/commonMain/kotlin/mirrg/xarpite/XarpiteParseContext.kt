package mirrg.xarpite

import io.github.mirrgieriana.xarpeg.DefaultParseContext

class XarpiteParseContext(src: String) : DefaultParseContext(src) {
    var currentIndent: Int = 0
    private var nextNodeId = 0

    fun allocateNodeId(): Int = nextNodeId++

    override fun getState(): Any = currentIndent
}
