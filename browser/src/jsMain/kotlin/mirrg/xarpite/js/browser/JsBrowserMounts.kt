package mirrg.xarpite.js.browser

import kotlinx.browser.window
import mirrg.xarpite.compilers.objects.FluoriteNull
import mirrg.xarpite.compilers.objects.FluoriteValue
import mirrg.xarpite.js.FluoriteJsObject

fun createJsBrowserMounts(): List<Map<String, FluoriteValue>> {
    return mapOf(
        "WINDOW" to try {
            FluoriteJsObject(window)
        } catch (_: Throwable) { // テスト環境では利用できない
            FluoriteNull
        },
    ).let { listOf(it) }
}
