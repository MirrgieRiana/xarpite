package mirrg.xarpite.js

import kotlin.js.Json

external class Process {
    val env: Json
    val argv: Array<String>
}

val Object_keys = js("Object.keys").unsafeCast<(Json) -> Array<String>>()
val process get() = js("process").unsafeCast<Process>()
