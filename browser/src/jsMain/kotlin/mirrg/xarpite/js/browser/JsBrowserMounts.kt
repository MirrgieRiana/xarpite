package mirrg.xarpite.js.browser

import kotlinx.browser.window
import mirrg.xarpite.Mount
import mirrg.xarpite.RuntimeContext
import mirrg.xarpite.compilers.objects.FluoriteNull
import mirrg.xarpite.define
import mirrg.xarpite.js.FluoriteJsObject

context(context: RuntimeContext)
fun createJsBrowserMounts(): List<Map<String, Mount>> {
    return mapOf(
        "PWD" define try {
            window.location.href.toFluoriteString()
        } catch (_: Throwable) { // テスト環境では利用できない
            "".toFluoriteString()
        },
        "WINDOW" define try {
            FluoriteJsObject(window)
        } catch (_: Throwable) { // テスト環境では利用できない
            FluoriteNull
        },
    ).let { listOf(it) }
}
