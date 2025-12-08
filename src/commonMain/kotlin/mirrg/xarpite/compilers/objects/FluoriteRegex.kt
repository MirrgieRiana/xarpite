package mirrg.xarpite.compilers.objects

import mirrg.xarpite.OperatorMethod
import mirrg.xarpite.operations.FluoriteException

data class FluoriteRegex(val pattern: String, val flags: String?) : FluoriteValue {
    companion object {
        val fluoriteClass by lazy {
            FluoriteObject(
                FluoriteValue.fluoriteClass, mutableMapOf(
                    "new" to FluoriteFunction { arguments ->
                        when (arguments.size) {
                            1 -> {
                                val pattern = arguments[0].toFluoriteString().value
                                FluoriteRegex(pattern, null)
                            }

                            2 -> {
                                val pattern = arguments[0].toFluoriteString().value
                                val flags = arguments[1].toFluoriteString().value
                                FluoriteRegex(pattern, flags)
                            }

                            else -> throw FluoriteException("Usage: REGEX.new(pattern: STRING[; flags: STRING]): REGEX".toFluoriteString())
                        }
                    },
                    OperatorMethod.PROPERTY.methodName to FluoriteFunction { arguments ->
                        val regex = arguments[0] as FluoriteRegex
                        val key = arguments[1].toFluoriteString().value
                        when (key) {
                            "pattern" -> regex.pattern.toFluoriteString()
                            "flags" -> regex.flags?.toFluoriteString() ?: FluoriteNull
                            else -> throw FluoriteException("No such property: $key".toFluoriteString())
                        }
                    },
                    OperatorMethod.CALL.methodName to FluoriteFunction { arguments ->
                        val regex = arguments[0] as FluoriteRegex
                        val string = arguments[1].toFluoriteString().value
                        regex.matchImpl(string)
                    },
                    OperatorMethod.MATCH.methodName to FluoriteFunction { arguments ->
                        val regex = arguments[0] as FluoriteRegex
                        val string = arguments[1].toFluoriteString().value
                        regex.matchImpl(string)
                    },
                    OperatorMethod.TO_STRING.methodName to FluoriteFunction { (it[0] as FluoriteRegex).fluoriteStringCache },
                )
            )
        }
    }

    private val stringCache by lazy {
        val escapedPattern = pattern
            .replace("\\", "\\\\")
            .replace("/", "\\/")
            .replace("\r", "\\r")
            .replace("\n", "\\n")
        "/$escapedPattern/${flags ?: ""}"
    }
    private val fluoriteStringCache by lazy { stringCache.toFluoriteString() }

    class FlagData(val multiline: Boolean, val ignoreCase: Boolean, val global: Boolean)

    val flagData = run {
        if (flags == null) return@run FlagData(multiline = false, ignoreCase = false, global = false)
        val charsTable = flags.groupBy { it }.toMutableMap()
        charsTable.forEach {
            if (it.value.size >= 2) throw FluoriteException("Duplicate flag: ${it.key}".toFluoriteString())
        }
        val multiline = charsTable.remove('m') != null
        val ignoreCase = charsTable.remove('i') != null
        val global = charsTable.remove('g') != null
        if (charsTable.isNotEmpty()) throw FluoriteException("Invalid flag: ${charsTable.keys.first()}".toFluoriteString())
        FlagData(multiline, ignoreCase, global)
    }

    val regexCache = run {
        val options = mutableSetOf<RegexOption>()
        if (flagData.multiline) options += RegexOption.MULTILINE
        if (flagData.ignoreCase) options += RegexOption.IGNORE_CASE
        pattern.toRegex(options)
    }

    private fun matchImpl(string: String): FluoriteValue {
        return if (flagData.global) {
            FluoriteStream {
                regexCache.findAll(string).forEach { matchResult ->
                    emit(matchResult.toFluoriteValue())
                }
            }
        } else {
            regexCache.find(string)?.toFluoriteValue() ?: FluoriteNull
        }
    }

    override fun toString() = stringCache
    override val parent get() = fluoriteClass
}

fun String.toFluoriteRegex(flags: String? = null) = FluoriteRegex(this, flags)

fun MatchResult.toFluoriteValue() = createFluoriteMatchResult(this.groups.map { it?.value })

fun createFluoriteMatchResult(array: List<String?>) = array.map { it?.toFluoriteString() ?: FluoriteNull }.toFluoriteArray()
