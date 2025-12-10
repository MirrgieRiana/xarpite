package mirrg.xarpite.js.browser.test

import kotlinx.coroutines.ExperimentalCoroutinesApi
import kotlinx.coroutines.test.runTest
import kotlin.test.Test

@OptIn(ExperimentalCoroutinesApi::class)
class JsBrowserTest {

    @Test
    fun window() = runTest {
        // テスト環境では動作しない
        //assertEquals("[object Window]", evalJs("&WINDOW") { createJsBrowserMounts() }.string)
    }

}
