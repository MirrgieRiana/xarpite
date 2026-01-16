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
                    OperatorMethod.PROPERTY.methodName to FluoriteFunction { arguments ->
                        val obj = arguments[0]
                        if (obj !is FluoriteObject) throw FluoriteException("Cannot get property: $obj".toFluoriteString())
                        val key = arguments[1].toFluoriteString(null).value
                        obj.map[key] ?: FluoriteNull
                    },
                    OperatorMethod.TO_STRING.methodName to FluoriteFunction { "${it[0]}".toFluoriteString() },
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

fun interface Callable {
    suspend fun call(arguments: Array<FluoriteValue>): FluoriteValue
}

private fun FluoriteValue.getPureMethod(name: String): FluoriteValue? {
    var currentObject = this.parent
    while (true) {
        if (currentObject == null) return null

        val value = currentObject.map[name]
        if (value != null) return value

        currentObject = currentObject.parent
    }
}

suspend fun FluoriteValue.getMethod(position: Position?, name: String): Callable? {
    val method = this.getPureMethod(name) ?: run {
        val fallbackMethod = this.getPureMethod(OperatorMethod.METHOD.methodName) ?: return null
        val actualMethod = this.callMethod(position, fallbackMethod, arrayOf(name.toFluoriteString()))
        if (actualMethod == FluoriteNull) return null
        return Callable { arguments ->
            actualMethod.invoke(position, arguments)
        }
    }
    return Callable { arguments ->
        this.callMethod(position, method, arguments)
    }
}

suspend fun FluoriteValue.callMethod(position: Position?, name: String, arguments: Array<FluoriteValue> = arrayOf()): FluoriteValue {
    val callable = this.getMethod(position, name) ?: throw FluoriteException("Method not found: $this::$name".toFluoriteString())
    return withStackTrace(position) {
        callable.call(arguments)
    }
}

suspend fun FluoriteValue.callMethod(position: Position?, method: FluoriteValue, arguments: Array<FluoriteValue> = arrayOf()): FluoriteValue {
    return if (method is FluoriteFunction) {
        method.function(arrayOf(this, *arguments))
    } else {
        method.invoke(position, arrayOf(this, *arguments))
    }
}

suspend fun FluoriteValue.invoke(position: Position?, arguments: Array<FluoriteValue>) = this.callMethod(position, OperatorMethod.CALL.methodName, arguments)
suspend fun FluoriteValue.setInvoke(position: Position?, arguments: Array<FluoriteValue>) = run { this.callMethod(position, OperatorMethod.SET_CALL.methodName, arguments); Unit }
suspend fun FluoriteValue.bind(position: Position?, arguments: Array<FluoriteValue>) = this.callMethod(position, OperatorMethod.BIND.methodName, arguments)
suspend fun FluoriteValue.toFluoriteNumber(position: Position?): FluoriteNumber = this.callMethod(position, OperatorMethod.TO_NUMBER.methodName).let { if (it is FluoriteNumber) it else it.toFluoriteNumber(position) }
suspend fun FluoriteValue.toFluoriteString(position: Position?): FluoriteString = this.callMethod(position, OperatorMethod.TO_STRING.methodName).let { if (it is FluoriteString) it else it.toFluoriteString(position) }
suspend fun FluoriteValue.toFluoriteBoolean(position: Position?): FluoriteBoolean = this.callMethod(position, OperatorMethod.TO_BOOLEAN.methodName).let { if (it is FluoriteBoolean) it else it.toFluoriteBoolean(position) }
suspend fun FluoriteValue.toBoolean(position: Position?) = this.toFluoriteBoolean(position).value
suspend fun FluoriteValue.getLength(position: Position?) = this.callMethod(position, OperatorMethod.GET_LENGTH.methodName) as FluoriteNumber
suspend fun FluoriteValue.contains(position: Position?, value: FluoriteValue) = this.callMethod(position, OperatorMethod.CONTAINS.methodName, arrayOf(value)).toFluoriteBoolean(position)
suspend fun FluoriteValue.match(position: Position?, value: FluoriteValue) = this.callMethod(position, OperatorMethod.MATCH.methodName, arrayOf(value))
suspend fun FluoriteValue.plus(position: Position?, value: FluoriteValue) = this.callMethod(position, OperatorMethod.PLUS.methodName, arrayOf(value))
suspend fun FluoriteValue.minus(position: Position?, value: FluoriteValue) = this.callMethod(position, OperatorMethod.MINUS.methodName, arrayOf(value))
suspend fun FluoriteValue.compareTo(position: Position?, value: FluoriteValue) = this.callMethod(position, OperatorMethod.COMPARE.methodName, arrayOf(value)) as FluoriteInt
suspend fun FluoriteValue.fluoriteEquals(value: FluoriteValue) = this == value
