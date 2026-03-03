package mirrg.xarpite.util

/**
 * パスがURL形式（http://またはhttps://）かどうかを判定する
 * URLスキームは大文字小文字を区別しない (RFC 3986)
 */
fun isUrlFormat(path: String): Boolean {
    val trimmedPath = path.trim()
    return trimmedPath.startsWith("http://", ignoreCase = true) || 
           trimmedPath.startsWith("https://", ignoreCase = true)
}
