package mirrg.xarpite.operations

import mirrg.xarpite.Environment
import mirrg.xarpite.compilers.objects.FluoriteFunction
import mirrg.xarpite.mounts.usage

internal fun createAccessor(getter: Getter, setter: Setter?, env: Environment): FluoriteFunction {
    return if (setter != null) {
        FluoriteFunction { arguments ->
            if (arguments.isEmpty()) {
                getter.evaluate(env)
            } else if (arguments.size == 1) {
                val setterFunction = setter.evaluate(env)
                setterFunction(arguments[0])
                arguments[0]
            } else {
                usage("accessor(): VALUE | <T> accessor(value: T): T")
            }
        }
    } else {
        FluoriteFunction { arguments ->
            if (arguments.isEmpty()) {
                getter.evaluate(env)
            } else {
                usage("accessor(): VALUE")
            }
        }
    }
}
