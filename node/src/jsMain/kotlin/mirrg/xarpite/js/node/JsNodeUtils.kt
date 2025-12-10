package mirrg.xarpite.js.node

import kotlin.js.Json

external class Process {
    val env: Json
    val argv: Array<String>
    val stdin: dynamic
}

val process by lazy { js("process").unsafeCast<Process>() }
