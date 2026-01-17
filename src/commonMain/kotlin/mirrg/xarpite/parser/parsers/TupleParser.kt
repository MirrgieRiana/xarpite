package mirrg.xarpite.parser.parsers

import mirrg.xarpite.parser.ParseResult
import mirrg.xarpite.parser.Parser
import mirrg.xarpite.parser.Tuple0
import mirrg.xarpite.parser.Tuple1
import mirrg.xarpite.parser.Tuple2
import mirrg.xarpite.parser.Tuple3
import mirrg.xarpite.parser.Tuple4
import mirrg.xarpite.parser.Tuple5
import kotlin.jvm.JvmName

// Parser to Tuple1Parser

operator fun <T : Any> Parser<T>.unaryPlus(): Parser<Tuple1<T>> = this map { a -> Tuple1(a) }


// Parser Combination

/** パーサーの結合は純粋関数ではなく、位置にマッチしたり解析位置を進めたりする副作用があることに注意。 */
fun <L : Any, R : Any, T : Any> combine(left: Parser<L>, right: Parser<R>, function: (L, R) -> T) = Parser { context, start ->
    val resultL = context.parseOrNull(left, start) ?: return@Parser null
    val resultR = context.parseOrNull(right, resultL.end) ?: return@Parser null
    ParseResult(function(resultL.value, resultR.value), resultL.start, resultR.end)
}


// Tuple0Parser vs Tuple0Parser = Tuple0Parser

@JvmName("times00")
operator fun Parser<Tuple0>.times(other: Parser<Tuple0>) = combine(this, other) { _, _ -> Tuple0 }


// Tuple0Parser vs X = X

@JvmName("times0P")
operator fun <A : Any> Parser<Tuple0>.times(other: Parser<A>) = combine(this, other) { _, b -> b }

@JvmName("times01")
operator fun <A> Parser<Tuple0>.times(other: Parser<Tuple1<A>>) = combine(this, other) { _, b -> b }

@JvmName("times02")
operator fun <A, B> Parser<Tuple0>.times(other: Parser<Tuple2<A, B>>) = combine(this, other) { _, b -> b }

@JvmName("times03")
operator fun <A, B, C> Parser<Tuple0>.times(other: Parser<Tuple3<A, B, C>>) = combine(this, other) { _, b -> b }

@JvmName("times04")
operator fun <A, B, C, D> Parser<Tuple0>.times(other: Parser<Tuple4<A, B, C, D>>) = combine(this, other) { _, b -> b }

@JvmName("times05")
operator fun <A, B, C, D, E> Parser<Tuple0>.times(other: Parser<Tuple5<A, B, C, D, E>>) = combine(this, other) { _, b -> b }


// X vs Tuple0Parser = X

@JvmName("timesP0")
operator fun <A : Any> Parser<A>.times(other: Parser<Tuple0>) = combine(this, other) { a, _ -> a }

@JvmName("times10")
operator fun <A> Parser<Tuple1<A>>.times(other: Parser<Tuple0>) = combine(this, other) { a, _ -> a }

@JvmName("times20")
operator fun <A, B> Parser<Tuple2<A, B>>.times(other: Parser<Tuple0>) = combine(this, other) { a, _ -> a }

@JvmName("times30")
operator fun <A, B, C> Parser<Tuple3<A, B, C>>.times(other: Parser<Tuple0>) = combine(this, other) { a, _ -> a }

@JvmName("times40")
operator fun <A, B, C, D> Parser<Tuple4<A, B, C, D>>.times(other: Parser<Tuple0>) = combine(this, other) { a, _ -> a }

@JvmName("times50")
operator fun <A, B, C, D, E> Parser<Tuple5<A, B, C, D, E>>.times(other: Parser<Tuple0>) = combine(this, other) { a, _ -> a }


// Parser vs Parser = Tuple2Parser

@JvmName("timesPP")
operator fun <A : Any, B : Any> Parser<A>.times(other: Parser<B>) = combine(this, other) { a, b -> Tuple2(a, b) }


// Parser vs TupleNParser = Tuple(N+1)Parser

@JvmName("timesP1")
operator fun <A : Any, B> Parser<A>.times(other: Parser<Tuple1<B>>) = combine(this, other) { a, b -> Tuple2(a, b.a) }

@JvmName("timesP2")
operator fun <A : Any, B, C> Parser<A>.times(other: Parser<Tuple2<B, C>>) = combine(this, other) { a, b -> Tuple3(a, b.a, b.b) }

@JvmName("timesP3")
operator fun <A : Any, B, C, D> Parser<A>.times(other: Parser<Tuple3<B, C, D>>) = combine(this, other) { a, b -> Tuple4(a, b.a, b.b, b.c) }

@JvmName("timesP4")
operator fun <A : Any, B, C, D, E> Parser<A>.times(other: Parser<Tuple4<B, C, D, E>>) = combine(this, other) { a, b -> Tuple5(a, b.a, b.b, b.c, b.d) }


// TupleNParser vs Parser = Tuple(N+1)Parser

@JvmName("times1P")
operator fun <A, B : Any> Parser<Tuple1<A>>.times(other: Parser<B>) = combine(this, other) { a, b -> Tuple2(a.a, b) }

@JvmName("times2P")
operator fun <A, B, C : Any> Parser<Tuple2<A, B>>.times(other: Parser<C>) = combine(this, other) { a, b -> Tuple3(a.a, a.b, b) }

@JvmName("times3P")
operator fun <A, B, C, D : Any> Parser<Tuple3<A, B, C>>.times(other: Parser<D>) = combine(this, other) { a, b -> Tuple4(a.a, a.b, a.c, b) }

@JvmName("times4P")
operator fun <A, B, C, D, E : Any> Parser<Tuple4<A, B, C, D>>.times(other: Parser<E>) = combine(this, other) { a, b -> Tuple5(a.a, a.b, a.c, a.d, b) }


// TupleNParser vs TupleMParser = Tuple(N+M)Parser

@JvmName("times11")
operator fun <A, B> Parser<Tuple1<A>>.times(other: Parser<Tuple1<B>>) = combine(this, other) { a, b -> Tuple2(a.a, b.a) }

@JvmName("times12")
operator fun <A, B, C> Parser<Tuple1<A>>.times(other: Parser<Tuple2<B, C>>) = combine(this, other) { a, b -> Tuple3(a.a, b.a, b.b) }

@JvmName("times13")
operator fun <A, B, C, D> Parser<Tuple1<A>>.times(other: Parser<Tuple3<B, C, D>>) = combine(this, other) { a, b -> Tuple4(a.a, b.a, b.b, b.c) }

@JvmName("times14")
operator fun <A, B, C, D, E> Parser<Tuple1<A>>.times(other: Parser<Tuple4<B, C, D, E>>) = combine(this, other) { a, b -> Tuple5(a.a, b.a, b.b, b.c, b.d) }

@JvmName("times21")
operator fun <A, B, C> Parser<Tuple2<A, B>>.times(other: Parser<Tuple1<C>>) = combine(this, other) { a, b -> Tuple3(a.a, a.b, b.a) }

@JvmName("times22")
operator fun <A, B, C, D> Parser<Tuple2<A, B>>.times(other: Parser<Tuple2<C, D>>) = combine(this, other) { a, b -> Tuple4(a.a, a.b, b.a, b.b) }

@JvmName("times23")
operator fun <A, B, C, D, E> Parser<Tuple2<A, B>>.times(other: Parser<Tuple3<C, D, E>>) = combine(this, other) { a, b -> Tuple5(a.a, a.b, b.a, b.b, b.c) }

@JvmName("times31")
operator fun <A, B, C, D> Parser<Tuple3<A, B, C>>.times(other: Parser<Tuple1<D>>) = combine(this, other) { a, b -> Tuple4(a.a, a.b, a.c, b.a) }

@JvmName("times32")
operator fun <A, B, C, D, E> Parser<Tuple3<A, B, C>>.times(other: Parser<Tuple2<D, E>>) = combine(this, other) { a, b -> Tuple5(a.a, a.b, a.c, b.a, b.b) }

@JvmName("times41")
operator fun <A, B, C, D, E> Parser<Tuple4<A, B, C, D>>.times(other: Parser<Tuple1<E>>) = combine(this, other) { a, b -> Tuple5(a.a, a.b, a.c, a.d, b.a) }
