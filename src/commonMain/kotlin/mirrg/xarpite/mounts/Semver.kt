package mirrg.xarpite.mounts

import mirrg.xarpite.OperatorMethod
import mirrg.xarpite.compilers.objects.FluoriteArray
import mirrg.xarpite.compilers.objects.FluoriteFunction
import mirrg.xarpite.compilers.objects.FluoriteInt
import mirrg.xarpite.compilers.objects.FluoriteObject
import mirrg.xarpite.compilers.objects.FluoriteString
import mirrg.xarpite.compilers.objects.FluoriteValue
import mirrg.xarpite.compilers.objects.toFluoriteString
import mirrg.xarpite.operations.FluoriteException
import mirrg.xarpite.toFluoriteIntAsCompared

// SEMVER関数が返すオブジェクトの親クラス。パース結果は `_core` と `_prerelease` の
// private プロパティにのみ保持され、比較は SemVer 2.0.0 の precedence に従う。
private val semverClass: FluoriteObject by lazy {
    FluoriteObject(
        FluoriteObject.fluoriteClass, mutableMapOf(
            OperatorMethod.COMPARE.methodName to FluoriteFunction.immediate { arguments ->
                val left = arguments[0] as FluoriteObject
                val right = arguments[1]
                if (right !is FluoriteObject || right.parent !== semverClass) {
                    throw FluoriteException("A semantic version can only be compared with another semantic version".toFluoriteString())
                }
                compareSemver(left, right).toFluoriteIntAsCompared()
            },
        )
    )
}

fun String.toFluoriteSemver(): FluoriteObject {
    val (core, prerelease) = parseSemver(this)
    return FluoriteObject(
        semverClass, mutableMapOf(
            "_core" to FluoriteArray(core.map { FluoriteInt(it) as FluoriteValue }.toMutableList()),
            "_prerelease" to FluoriteArray(prerelease.toMutableList()),
        )
    )
}

private fun invalid(input: String): Nothing = throw FluoriteException("Invalid semantic version: $input".toFluoriteString())

private fun String.isNumericIdentifier() = this.isNotEmpty() && this.all { it in '0'..'9' }

private fun Char.isSemverIdentifierChar() = this in '0'..'9' || this in 'A'..'Z' || this in 'a'..'z' || this == '-'

// 数値識別子（メジャー・マイナー・パッチや数値のプレリリース識別子）は、先頭ゼロを持ってはならない。
private fun parseNumericIdentifier(input: String, part: String): Int {
    if (!part.isNumericIdentifier()) invalid(input)
    if (part.length > 1 && part[0] == '0') invalid(input)
    return part.toIntOrNull() ?: invalid(input)
}

private fun parsePrereleaseIdentifier(input: String, part: String): FluoriteValue {
    if (part.isEmpty()) invalid(input)
    return if (part.isNumericIdentifier()) {
        FluoriteInt(parseNumericIdentifier(input, part))
    } else {
        if (!part.all { it.isSemverIdentifierChar() }) invalid(input)
        part.toFluoriteString()
    }
}

// 受け付ける書式は major.minor.patch[-prerelease][+build] で、ビルドメタデータは比較では無視するが書式の妥当性は検証する。
private fun parseSemver(input: String): Pair<List<Int>, List<FluoriteValue>> {
    val buildIndex = input.indexOf('+')
    val withoutBuild = if (buildIndex >= 0) {
        input.substring(buildIndex + 1).split('.').forEach { identifier ->
            if (identifier.isEmpty()) invalid(input)
            if (!identifier.all { it.isSemverIdentifierChar() }) invalid(input)
        }
        input.substring(0, buildIndex)
    } else {
        input
    }

    val prereleaseIndex = withoutBuild.indexOf('-')
    val coreString = if (prereleaseIndex >= 0) withoutBuild.substring(0, prereleaseIndex) else withoutBuild
    val prereleaseString = if (prereleaseIndex >= 0) withoutBuild.substring(prereleaseIndex + 1) else null

    val coreParts = coreString.split('.')
    if (coreParts.size != 3) invalid(input)
    val core = coreParts.map { parseNumericIdentifier(input, it) }

    val prerelease = if (prereleaseString == null) {
        emptyList()
    } else {
        prereleaseString.split('.').map { parsePrereleaseIdentifier(input, it) }
    }

    return Pair(core, prerelease)
}

private fun compareSemver(left: FluoriteObject, right: FluoriteObject): Int {
    val leftCore = (left.map["_core"] as FluoriteArray).values
    val rightCore = (right.map["_core"] as FluoriteArray).values
    (0 until 3).forEach { i ->
        val compared = (leftCore[i] as FluoriteInt).value.compareTo((rightCore[i] as FluoriteInt).value)
        if (compared != 0) return compared
    }

    val leftPrerelease = (left.map["_prerelease"] as FluoriteArray).values
    val rightPrerelease = (right.map["_prerelease"] as FluoriteArray).values
    // プレリリースを持つバージョンは、同じコアのプレリリースを持たないバージョンより precedence が低い。
    if (leftPrerelease.isEmpty() && rightPrerelease.isEmpty()) return 0
    if (leftPrerelease.isEmpty()) return 1
    if (rightPrerelease.isEmpty()) return -1

    (0 until minOf(leftPrerelease.size, rightPrerelease.size)).forEach { i ->
        val compared = comparePrereleaseIdentifier(leftPrerelease[i], rightPrerelease[i])
        if (compared != 0) return compared
    }
    // ここまで等しければ、識別子の多い方が precedence が高い。
    return leftPrerelease.size.compareTo(rightPrerelease.size)
}

// プレリリース識別子同士の比較。数値識別子は数値として、英数字識別子は辞書順で比較し、数値識別子は英数字識別子より小さい。
private fun comparePrereleaseIdentifier(left: FluoriteValue, right: FluoriteValue): Int {
    return when {
        left is FluoriteInt && right is FluoriteInt -> left.value.compareTo(right.value)
        left is FluoriteInt -> -1
        right is FluoriteInt -> 1
        else -> (left as FluoriteString).value.compareTo((right as FluoriteString).value)
    }
}
