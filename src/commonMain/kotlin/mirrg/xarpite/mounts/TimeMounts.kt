package mirrg.xarpite.mounts

import com.ionspin.kotlin.bignum.integer.toBigInteger
import mirrg.xarpite.Mount
import mirrg.xarpite.RuntimeContext
import mirrg.xarpite.compilers.objects.FluoriteBig
import mirrg.xarpite.compilers.objects.FluoriteFunction
import mirrg.xarpite.define
import kotlin.time.Clock

context(context: RuntimeContext)
fun createTimeMounts(): List<Map<String, Mount>> {
    return mapOf(
        "NOW" define FluoriteFunction.immediate { arguments ->
            if (arguments.size != 0) usage("NOW(): BIG")
            FluoriteBig(Clock.System.now().epochSeconds.toBigInteger())
        },
    ).let { listOf(it) }
}
