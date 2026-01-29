package mirrg.xarpite.js.browser

import kotlinx.browser.window
import mirrg.xarpite.RuntimeContext
import mirrg.xarpite.compilers.objects.FluoriteNull
import mirrg.xarpite.compilers.objects.FluoriteValue
import mirrg.xarpite.compilers.objects.toFluoriteString
import mirrg.xarpite.js.FluoriteJsObject

context(context: RuntimeContext)
fun createJsBrowserMounts(): List<Map<String, FluoriteValue>> {
    return mapOf(
        "PWD" to try {
            window.location.href.toFluoriteString()
        } catch (_: Throwable) { // テスト環境では利用できない
            "".toFluoriteString()
        },
        "WINDOW" to try {
            FluoriteJsObject(window)
        } catch (_: Throwable) { // テスト環境では利用できない
            FluoriteNull
        },
    ).let { listOf(it) }
}
