package mirrg.xarpite

enum class OperatorMethod(val methodName: String) {
    PROPERTY("_._"),
    SET_PROPERTY("_._=_"),
    METHOD("_::_"),
    CALL("_(__)"),
    SET_CALL("_(__)=_"),
    BIND("_[__]"),
    TO_NUMBER("+_"),
    TO_BOOLEAN("?_"),
    TO_STRING("&_"),
    LENGTH("$#_"),
    PLUS("_+_"),
    COMPARE("_<=>_"),
    CONTAINS("_@_"),
    MATCH("_=~_"),
}
