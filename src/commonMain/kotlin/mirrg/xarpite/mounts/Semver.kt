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

// 受け付ける書式は major.minor.patch[-prerelease][+build] で、SemVer 2.0.0 の公式正規表現に従う。
// 数値識別子の先頭ゼロや空の識別子はこの正規表現が弾き、ビルドメタデータは書式のみ検証して比較では無視する。
private val semverRegex = Regex(
    """^(0|[1-9]\d*)\.(0|[1-9]\d*)\.(0|[1-9]\d*)""" +
        """(?:-((?:0|[1-9]\d*|\d*[a-zA-Z-][0-9a-zA-Z-]*)(?:\.(?:0|[1-9]\d*|\d*[a-zA-Z-][0-9a-zA-Z-]*))*))?""" +
        """(?:\+[0-9a-zA-Z-]+(?:\.[0-9a-zA-Z-]+)*)?$"""
)

private fun parseSemver(input: String): Pair<List<Int>, List<FluoriteValue>> {
    val match = semverRegex.matchEntire(input) ?: invalid(input)
    val (majorString, minorString, patchString, prereleaseString) = match.destructured

    val core = listOf(majorString, minorString, patchString).map { it.toIntOrNull() ?: invalid(input) }

    val prerelease = if (prereleaseString.isEmpty()) {
        emptyList()
    } else {
        prereleaseString.split('.').map { identifier ->
            // 全て数字ならば数値識別子で、そうでなければ英数字識別子。先頭ゼロは正規表現が既に弾いている。
            if (identifier.all { it in '0'..'9' }) FluoriteInt(identifier.toIntOrNull() ?: invalid(input)) else identifier.toFluoriteString()
        }
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
