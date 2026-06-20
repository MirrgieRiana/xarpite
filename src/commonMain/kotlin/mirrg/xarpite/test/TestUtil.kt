package mirrg.xarpite.test

import io.github.mirrgieriana.xarpeg.parseAll
import kotlinx.coroutines.CoroutineScope
import kotlinx.coroutines.flow.flow
import kotlinx.coroutines.flow.toList
import mirrg.xarpite.Evaluator
import mirrg.xarpite.Frame
import mirrg.xarpite.IoContext
import mirrg.xarpite.RuntimeContext
import mirrg.xarpite.UnsupportedIoContext
import mirrg.xarpite.XarpiteGrammar
import mirrg.xarpite.XarpiteParseContext
import mirrg.xarpite.compilers.compileToGetter
import mirrg.xarpite.compilers.objects.FluoriteArray
import mirrg.xarpite.compilers.objects.FluoriteBig
import mirrg.xarpite.compilers.objects.FluoriteBoolean
import mirrg.xarpite.compilers.objects.FluoriteDouble
import mirrg.xarpite.compilers.objects.FluoriteInt
import mirrg.xarpite.compilers.objects.FluoriteObject
import mirrg.xarpite.compilers.objects.FluoriteStream
import mirrg.xarpite.compilers.objects.FluoriteString
import mirrg.xarpite.compilers.objects.FluoriteValue
import mirrg.xarpite.compilers.objects.cache
import mirrg.xarpite.compilers.objects.toFluoriteString
import mirrg.xarpite.mounts.createCommonMounts
import mirrg.xarpite.withEvaluator

fun parse(src: String, apiVersion: Int = RuntimeContext.PROVIDED_API_VERSIONS.first): String {
    val parseResult = XarpiteGrammar("test", apiVersion).rootParser.parseAll(src) { XarpiteParseContext(it) }.getOrThrow()
    val frame = Frame()
    val getter = frame.compileToGetter(parseResult)
    return getter.code
}

suspend fun CoroutineScope.eval(src: String, ioContext: IoContext = UnsupportedIoContext()): FluoriteValue {
    return withEvaluator(ioContext) { context, evaluator ->
        evaluator.defineMounts(context.run { createCommonMounts() })
        evaluator.get(src).cache()
    }
}

suspend fun Evaluator.get(src: String) = this.get("test", src)

suspend fun Evaluator.run(src: String) = this.run("test", src)

val FluoriteValue.int get() = (this as FluoriteInt).value
val FluoriteValue.big get() = (this as FluoriteBig).value
val FluoriteValue.double get() = (this as FluoriteDouble).value
val FluoriteValue.boolean get() = (this as FluoriteBoolean).value
val FluoriteValue.string get() = (this as FluoriteString).value
val FluoriteValue.obj get() = (this as FluoriteObject).toString()
suspend fun FluoriteValue.array() = (this as FluoriteArray).toFluoriteString(null).value
suspend fun FluoriteValue.stream() = flow { (this@stream as FluoriteStream).flowProvider(this) }.toList(mutableListOf()).joinToString(",") { "$it" }
suspend fun FluoriteValue.empty() = flow { (this@empty as FluoriteStream).flowProvider(this) }.toList(mutableListOf()).isEmpty()
