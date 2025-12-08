package mirrg.xarpite

enum class OperatorMethod(val methodName: String) {
    PROPERTY("_._"),
    SET_PROPERTY("_._="),
    METHOD("_::_"),
    CALL("_()"),
    SET_CALL("_()=_"),
    BIND("_[]"),
    TO_NUMBER("+_"),
    TO_BOOLEAN("?_"),
    TO_STRING("&_"),
    PLUS("_+_"),
    COMPARE("_<=>_"),
    CONTAINS("_@_"),
    MATCH("_=~_"),
}
