package mirrg.xarpite.js.node

import kotlin.js.Json

external class Process {
    val env: Json
    val argv: Array<String>
}

val process get() = js("process").unsafeCast<Process>()
