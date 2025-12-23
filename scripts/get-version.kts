#!/usr/bin/env kotlin

import kotlin.system.exitProcess

fun complete(version: String): Nothing {
    println(version)
    exitProcess(0)
}

fun fail(message: String): Nothing {
    System.err.println(message)
    exitProcess(1)
}

data class ShellResult(val command: String, val exitCode: Int, val output: String) {
    val succeeded get() = exitCode == 0

    fun getOutputOrThrow(): String {
        if (!succeeded) throw Exception("Command failed with exit code $exitCode: $command")
        return output
    }
}

fun shell(command: String): ShellResult {
    try {
        val process = ProcessBuilder("bash", "-c", command)
            .redirectOutput(ProcessBuilder.Redirect.PIPE)
            .redirectError(ProcessBuilder.Redirect.INHERIT)
            .start()
        val output = process.inputStream.bufferedReader().readText().trim()
        val exitCode = process.waitFor()
        return ShellResult(command, exitCode, output)
    } catch (e: Exception) {
        System.err.println("Error executing command: $command")
        throw e
    }
}

fun isGitAvailable() = shell("command -v git >/dev/null 2>&1").succeeded
fun isInGitRepository() = shell("git rev-parse --git-dir >/dev/null 2>&1").succeeded
fun hasHead() = shell("git rev-parse HEAD >/dev/null 2>&1").succeeded
fun isDirty() = shell("git status --porcelain 2>/dev/null").getOutputOrThrow().isNotEmpty()
fun getShortHash(tag: String) = shell("git rev-parse --short=7 $tag").getOutputOrThrow()
fun getCommitDistance(from: String, to: String) = shell("git rev-list --count '$from..$to'").getOutputOrThrow().toInt()
fun getAllCommitCount(to: String) = shell("git rev-list --count $to").getOutputOrThrow()
fun isShallowRepository() = shell("git rev-parse --is-shallow-repository").getOutputOrThrow() == "true"
fun deepenRepository(depth: Int) = shell("git fetch --deepen=$depth --tags >/dev/null 2>&1").getOutputOrThrow().let {}
fun String.parseVersionTags() = this.lines().filter { """^v[0-9]+\.[0-9]+\.[0-9]+$""".toRegex().matches(it) }
fun getSortedAllVersionTags() = shell("git tag --sort=-version:refname --merged HEAD").getOutputOrThrow().parseVersionTags()

// 作業領域が正常なgitリポジトリでない判定
val INVALID_VERSION = "0.0.0+0.g0000000.dirty"
if (!isGitAvailable()) complete(INVALID_VERSION)
if (!isInGitRepository()) complete(INVALID_VERSION)
if (!hasHead()) complete(INVALID_VERSION)

fun findVersionTagWithFetching(): String? {
    (0..10).forEach { retry ->
        getSortedAllVersionTags().firstOrNull()?.let { return it }
        if (!isShallowRepository()) return null
        if (retry == 10) fail("Error: No version tag found after partial fetch attempts")
        deepenRepository(100)
    }
    return null
}

// 徐々に過去ログを取得しながらバージョンタグを探す
val versionTag = findVersionTagWithFetching()
// Example: 1.2.3+45.gabc6789.dirty
complete(
    listOfNotNull(
        // Version Part
        versionTag?.drop(1) ?: "0.0.0",
        // Build Metadata Part
        listOfNotNull(
            when { // distance, if it is 0, omit
                versionTag == null -> "${getAllCommitCount("HEAD")}.g${getShortHash("HEAD")}"
                getCommitDistance(versionTag, "HEAD") == 0 -> null
                else -> "${getCommitDistance(versionTag, "HEAD")}.g${getShortHash("HEAD")}"
            },
            if (isDirty()) "dirty" else null,
        ).joinToString(".") { it }.takeIf { it.isNotEmpty() }
    ).joinToString("+") { it }
)
