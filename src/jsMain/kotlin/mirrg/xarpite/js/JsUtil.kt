package mirrg.xarpite.js

import kotlin.js.Json

val Object_keys = js("Object.keys").unsafeCast<(Json) -> Array<String>>()
