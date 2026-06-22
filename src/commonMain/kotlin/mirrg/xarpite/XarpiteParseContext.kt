package mirrg.xarpite

import io.github.mirrgieriana.xarpeg.DefaultParseContext

class XarpiteParseContext(src: String) : DefaultParseContext(src) {
    var currentIndent: Int = 0

    override fun getState(): Any = currentIndent
}
