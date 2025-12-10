package mirrg.xarpite.js.node

import kotlin.js.Json

external class Process {
    val env: Json
    val argv: Array<String>
}

val process by lazy { js("process").unsafeCast<Process>() }
