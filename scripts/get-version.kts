#!/usr/bin/env kotlin

import java.io.File
import kotlin.system.exitProcess

// 設定
val VERSION_TAG_PATTERN = "v[0-9]*.[0-9]*.[0-9]*"
val VERSION_TAG_REGEX = Regex("^v[0-9]+\\.[0-9]+\\.[0-9]+\$")
val FETCH_DEPTH = 100
val MAX_FETCH_ATTEMPTS = 10

// 終了用ヘルパー関数
fun exitWithVersion(version: String): Nothing {
    println(version)
    exitProcess(0)
}

fun exitWithError(message: String): Nothing {
    System.err.println(message)
    exitProcess(1)
}

// コマンドを実行して成功したかチェック
fun runCommand(cmd: String): Boolean {
    return try {
        val process = ProcessBuilder("sh", "-c", cmd)
            .redirectOutput(ProcessBuilder.Redirect.PIPE)
            .redirectError(ProcessBuilder.Redirect.PIPE)
            .start()
        process.waitFor() == 0
    } catch (e: Exception) {
        false
    }
}

// コマンドを実行して出力を取得
fun getCommandOutput(cmd: String): String {
    return try {
        val process = ProcessBuilder("sh", "-c", cmd)
            .redirectOutput(ProcessBuilder.Redirect.PIPE)
            .redirectError(ProcessBuilder.Redirect.PIPE)
            .start()
        val output = process.inputStream.bufferedReader().readText().trim()
        process.waitFor()
        output
    } catch (e: Exception) {
        ""
    }
}

// gitコマンドが利用可能かチェック
if (!runCommand("command -v git >/dev/null 2>&1")) {
    exitWithVersion("0.0.0+0.g0000000.dirty")
}

// gitリポジトリ内かチェック
if (!runCommand("git rev-parse --git-dir >/dev/null 2>&1")) {
    exitWithVersion("0.0.0+0.g0000000.dirty")
}

// HEADが存在するかチェック（初期コミットが作成済みか）
if (!runCommand("git rev-parse HEAD >/dev/null 2>&1")) {
    exitWithVersion("0.0.0+0.g0000000.dirty")
}

// 作業ディレクトリがクリーンかチェックする関数
fun isClean(): Boolean {
    val status = getCommandOutput("git status --porcelain 2>/dev/null")
    return status.isEmpty()
}

// 短縮コミットハッシュ（7文字）を取得する関数
fun getShortHash(): String {
    return getCommandOutput("git rev-parse --short=7 HEAD")
}

// 最新のバージョンタグ（v1.2.3形式）を探す関数
// 注釈付きタグと軽量タグの両方に対応
fun findVersionTag(): String {
    val cmd = "git tag --list '$VERSION_TAG_PATTERN' --merged HEAD --sort=-version:refname"
    val tags = getCommandOutput(cmd).split("\n").filter { it.isNotEmpty() }
    
    for (tag in tags) {
        if (VERSION_TAG_REGEX.matches(tag)) {
            return tag
        }
    }
    return ""
}

// タグからHEADまでのコミット数をカウントする関数
fun countCommitsSince(tag: String): String {
    return getCommandOutput("git rev-list --count '$tag..HEAD'")
}

// HEADまでの総コミット数をカウントする関数
fun countTotalCommits(): String {
    return getCommandOutput("git rev-list --count HEAD")
}

// 浅いクローンの場合にコミットを追加取得する関数（ループ付き）
// 戻り値: 0=タグ発見, 1=shallowでない, 2=最大試行回数到達
fun fetchIfShallowLoop(): Int {
    val isShallow = getCommandOutput("git rev-parse --is-shallow-repository")
    if (isShallow != "true") return 1
    
    var attempt = 0
    
    while (attempt < MAX_FETCH_ATTEMPTS) {
        attempt++
        
        // コミットとタグを追加取得（全出力をstderrにリダイレクト）
        if (!runCommand("git fetch --deepen=$FETCH_DEPTH --tags >/dev/null 2>&1")) {
            exitWithError("Error: git fetch failed")
        }
        
        // タグが見つかったかチェック
        if (findVersionTag().isNotEmpty()) {
            return 0
        }
        
        // まだshallowかチェック
        val stillShallow = getCommandOutput("git rev-parse --is-shallow-repository")
        if (stillShallow != "true") {
            return 1
        }
    }
    
    // 最大試行回数に到達してもタグが見つからなかった
    return 2
}

// 作業ディレクトリがクリーンかチェック
val clean = isClean()

// HEADに直接バージョンタグが付いているかチェック
val cmd = "git tag --points-at HEAD --list '$VERSION_TAG_PATTERN'"
val headTags = getCommandOutput(cmd).split("\n").filter { it.isNotEmpty() }
var headTag = ""
for (tag in headTags) {
    if (VERSION_TAG_REGEX.matches(tag)) {
        headTag = tag
        break
    }
}

// クリーンかつHEADに有効なバージョンタグがある場合、接尾辞なしでX.Y.Zを出力
if (clean && headTag.isNotEmpty()) {
    val version = headTag.removePrefix("v")
    exitWithVersion(version)
}

// それ以外は常に接尾辞付き形式を使用
// 祖先から最新のバージョンタグを探す
var versionTag = findVersionTag()

// タグが見つからず、リポジトリがshallowの場合は追加取得を試みる
if (versionTag.isEmpty()) {
    val fetchResult = fetchIfShallowLoop()
    // fetchResult: 0=タグ発見, 1=shallowでない, 2=最大試行回数到達
    
    // 最大試行回数に到達してもタグが見つからなかった - エラー終了
    if (fetchResult == 2) {
        exitWithError("Error: No version tag found after $MAX_FETCH_ATTEMPTS fetch attempts")
    }
    
    // 取得後に再試行（取得が実行されタグが見つかった場合）
    if (fetchResult == 0) {
        versionTag = findVersionTag()
    }
}

// バージョン文字列を構築
val version = if (versionTag.isNotEmpty()) {
    // 祖先にバージョンタグが見つかった
    val baseVersion = versionTag.removePrefix("v")
    val commitCount = countCommitsSince(versionTag)
    val shortHash = getShortHash()
    "$baseVersion+$commitCount.g$shortHash"
} else {
    // バージョンタグが見つからなかった、総コミット数で0.0.0を使用
    val totalCommits = countTotalCommits()
    val shortHash = getShortHash()
    "0.0.0+$totalCommits.g$shortHash"
}

// 作業ディレクトリがクリーンでない場合は.dirtyを付加
val finalVersion = if (!clean) "$version.dirty" else version

exitWithVersion(finalVersion)
