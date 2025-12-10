package mirrg.xarpite.test

import kotlinx.coroutines.CoroutineScope
import kotlinx.coroutines.flow.flow
import kotlinx.coroutines.flow.toList
import mirrg.xarpite.Evaluator
import mirrg.xarpite.Frame
import mirrg.xarpite.XarpiteGrammar
import mirrg.xarpite.compilers.compileToGetter
import mirrg.xarpite.compilers.objects.FluoriteArray
import mirrg.xarpite.compilers.objects.FluoriteBoolean
import mirrg.xarpite.compilers.objects.FluoriteDouble
import mirrg.xarpite.compilers.objects.FluoriteInt
import mirrg.xarpite.compilers.objects.FluoriteObject
import mirrg.xarpite.compilers.objects.FluoriteStream
import mirrg.xarpite.compilers.objects.FluoriteString
import mirrg.xarpite.compilers.objects.FluoriteValue
import mirrg.xarpite.compilers.objects.toFluoriteString
import mirrg.xarpite.mounts.createCommonMounts
import mirrg.xarpite.parser.parseAllOrThrow

fun parse(src: String): String {
    val parseResult = XarpiteGrammar.rootParser.parseAllOrThrow(src)
    val frame = Frame()
    val getter = frame.compileToGetter(parseResult)
    return getter.code
}

suspend fun CoroutineScope.eval(src: String): FluoriteValue {
    val evaluator = Evaluator()
    evaluator.defineMounts(createCommonMounts(this) {})
    return evaluator.get(src)
}

val FluoriteValue.int get() = (this as FluoriteInt).value
val FluoriteValue.double get() = (this as FluoriteDouble).value
val FluoriteValue.boolean get() = (this as FluoriteBoolean).value
val FluoriteValue.string get() = (this as FluoriteString).value
val FluoriteValue.obj get() = (this as FluoriteObject).toString()
suspend fun FluoriteValue.array() = (this as FluoriteArray).toFluoriteString().value
suspend fun FluoriteValue.stream() = flow { (this@stream as FluoriteStream).flowProvider(this) }.toList(mutableListOf()).joinToString(",") { "$it" }
suspend fun FluoriteValue.empty() = flow { (this@empty as FluoriteStream).flowProvider(this) }.toList(mutableListOf()).isEmpty()
