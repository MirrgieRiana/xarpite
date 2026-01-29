package mirrg.xarpite.js.browser

import kotlinx.browser.window
import mirrg.xarpite.LazyMount
import mirrg.xarpite.Mount
import mirrg.xarpite.RuntimeContext
import mirrg.xarpite.define
import mirrg.xarpite.js.FluoriteJsObject

context(context: RuntimeContext)
fun createJsBrowserMounts(): List<Map<String, Mount>> {
    return mapOf(
        "WINDOW" define LazyMount { FluoriteJsObject(window) },
    ).let { listOf(it) }
}
