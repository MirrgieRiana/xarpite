package mirrg.xarpite

import kotlinx.coroutines.CoroutineScope
import mirrg.xarpite.compilers.objects.FluoriteValue

interface RuntimeContext {
    val coroutineScope: CoroutineScope
    val daemonScope: CoroutineScope
    suspend fun out(value: FluoriteValue)
}
