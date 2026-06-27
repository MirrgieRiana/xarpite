package mirrg.xarpite.compilers.objects

import mirrg.xarpite.OperatorMethod
import mirrg.xarpite.Position
import mirrg.xarpite.operations.FluoriteException
import mirrg.xarpite.withStackTrace

interface FluoriteValue {
    companion object {
        // fluoriteクラスはlazyにしなければJSで初期化順序によるエラーが出る
        // https://youtrack.jetbrains.com/issue/KT-25796
        // 他の同様のプロパティも同じ
        val fluoriteClass by lazy {
            FluoriteObject(
                null, mutableMapOf(
                    OperatorMethod.PROPERTY.methodName to FluoriteFunction.immediate { arguments ->
                        val obj = arguments[0]
                        if (obj !is FluoriteObject) throw FluoriteException("Cannot get property: $obj".toFluoriteString())
                        val key = arguments[1].toFluoriteString(null).value
                        obj.map[key] ?: FluoriteNull
                    },
                    OperatorMethod.TO_STRING.methodName to FluoriteFunction.immediate { "${it[0]}".toFluoriteString() },
                )
            )
        }
    }

    val parent: FluoriteObject?
}

fun FluoriteValue.instanceOf(clazz: FluoriteValue): Boolean {
    var currentObject: FluoriteValue? = this
    while (true) {
        if (currentObject == null) return false
        if (currentObject === clazz) return true
        currentObject = currentObject.parent
    }
}

// クラスが異なる場合は常に不一致とし、不変系の型は内容で、可変系の型はインスタンスで比較する
fun FluoriteValue.strictEquals(other: FluoriteValue): Boolean {
    when (this) {
        is FluoriteInt -> return this == other
        is FluoriteDouble -> return this == other
        is FluoriteBig -> return this == other
        is FluoriteString -> return this == other
        is FluoriteBoolean -> return this == other
        FluoriteNull -> return this == other
        is FluoriteRegex -> return this == other
        is FluoriteObject -> return this === other
        is FluoriteArray -> return this === other
        is FluoriteBlob -> return this === other
        is FluoriteStream -> return this === other
        is FluoritePromise -> return this === other
        is FluoriteFunction -> return this === other
        is FluoriteError -> return this === other
    }
    throw IllegalStateException("Unexpected FluoriteValue type: ${this::class}")
}

fun interface Callable {
    suspend fun call(arguments: Array<suspend () -> FluoriteValue>): FluoriteValue
}

suspend fun Callable.callImmediate(arguments: Array<FluoriteValue>) = this.call(arguments.map { suspend { it } }.toTypedArray())

private fun FluoriteValue.getPureMethod(name: String): FluoriteValue? {
    var currentObject = this.parent
    while (true) {
        if (currentObject == null) return null

        val value = currentObject.map[name]
        if (value != null) return value

        currentObject = currentObject.parent
    }
}

suspend fun FluoriteValue.callAsMethod(position: Position?, method: FluoriteValue, arguments: Array<suspend () -> FluoriteValue> = arrayOf()): FluoriteValue {
    return if (method is FluoriteFunction) {
        method.call(arrayOf(suspend { this }, *arguments))
    } else {
        method.invoke(position, arrayOf(suspend { this }, *arguments))
    }
}

suspend fun FluoriteValue.getSolvedMethod(position: Position?, name: String): Callable? {
    val method = this.getPureMethod(name) ?: run {
        val fallbackMethod = this.getPureMethod(OperatorMethod.METHOD.methodName) ?: return null
        val actualMethod = this.callAsMethod(position, fallbackMethod, arrayOf(suspend { name.toFluoriteString() }))
        if (actualMethod == FluoriteNull) return null
        return Callable { arguments ->
            actualMethod.invokeImmediate(position, arguments.map { it() }.toTypedArray())
        }
    }
    return Callable { arguments ->
        this.callAsMethod(position, method, arguments)
    }
}

suspend fun FluoriteValue.callMethod(position: Position?, name: String, arguments: Array<suspend () -> FluoriteValue> = arrayOf()): FluoriteValue {
    val callable = this.getSolvedMethod(position, name) ?: throw FluoriteException("Method not found: $this::$name".toFluoriteString())
    return withStackTrace(position) {
        callable.call(arguments)
    }
}

suspend fun FluoriteValue.callMethodImmediate(position: Position?, name: String, arguments: Array<FluoriteValue>): FluoriteValue {
    return this.callMethod(position, name, arguments.map { suspend { it } }.toTypedArray())
}

suspend fun FluoriteValue.invoke(position: Position?, arguments: Array<suspend () -> FluoriteValue>) = this.callMethod(position, OperatorMethod.CALL.methodName, arguments)
suspend fun FluoriteValue.invokeImmediate(position: Position?, arguments: Array<FluoriteValue>) = this.callMethodImmediate(position, OperatorMethod.CALL.methodName, arguments)
suspend fun FluoriteValue.setInvoke(position: Position?, arguments: Array<suspend () -> FluoriteValue>) = run { this.callMethod(position, OperatorMethod.SET_CALL.methodName, arguments); Unit }
suspend fun FluoriteValue.setInvokeImmediate(position: Position?, arguments: Array<FluoriteValue>) = run { this.callMethodImmediate(position, OperatorMethod.SET_CALL.methodName, arguments); Unit }
suspend fun FluoriteValue.bind(position: Position?, arguments: Array<suspend () -> FluoriteValue>) = this.callMethod(position, OperatorMethod.BIND.methodName, arguments)
suspend fun FluoriteValue.toFluoriteNumber(position: Position?): FluoriteNumber = this.callMethod(position, OperatorMethod.TO_NUMBER.methodName).let { if (it is FluoriteNumber) it else it.toFluoriteNumber(position) }
suspend fun FluoriteValue.toFluoriteString(position: Position?): FluoriteString = this.callMethod(position, OperatorMethod.TO_STRING.methodName).let { if (it is FluoriteString) it else it.toFluoriteString(position) }
suspend fun FluoriteValue.toFluoriteBoolean(position: Position?): FluoriteBoolean = this.callMethod(position, OperatorMethod.TO_BOOLEAN.methodName).let { if (it is FluoriteBoolean) it else it.toFluoriteBoolean(position) }
suspend fun FluoriteValue.toBoolean(position: Position?) = this.toFluoriteBoolean(position).value
suspend fun FluoriteValue.getLength(position: Position?) = this.callMethod(position, OperatorMethod.GET_LENGTH.methodName) as FluoriteNumber
suspend fun FluoriteValue.contains(position: Position?, value: FluoriteValue) = this.callMethodImmediate(position, OperatorMethod.CONTAINS.methodName, arrayOf(value)).toFluoriteBoolean(position)
suspend fun FluoriteValue.match(position: Position?, value: FluoriteValue) = this.callMethodImmediate(position, OperatorMethod.MATCH.methodName, arrayOf(value))
suspend fun FluoriteValue.plus(position: Position?, value: FluoriteValue) = this.callMethodImmediate(position, OperatorMethod.PLUS.methodName, arrayOf(value))
suspend fun FluoriteValue.minus(position: Position?, value: FluoriteValue) = this.callMethodImmediate(position, OperatorMethod.MINUS.methodName, arrayOf(value))
suspend fun FluoriteValue.compareTo(position: Position?, value: FluoriteValue) = this.callMethodImmediate(position, OperatorMethod.COMPARE.methodName, arrayOf(value)) as FluoriteInt
suspend fun FluoriteValue.fluoriteEquals(value: FluoriteValue) = this == value
