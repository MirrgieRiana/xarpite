#!/usr/bin/env kotlin

import kotlin.system.exitProcess

data class ShellResult(val exitCode: Int, val output: String) {
    val succeeded: Boolean get() = exitCode == 0
}

val VERSION_TAG_PATTERN = "v[0-9]*.[0-9]*.[0-9]*"
val VERSION_TAG_REGEX = Regex("^v[0-9]+\\.[0-9]+\\.[0-9]+\$")
val FETCH_DEPTH = 100
val MAX_FETCH_ATTEMPTS = 10

fun exitWithVersion(version: String): Nothing {
    println(version)
    exitProcess(0)
}

fun error(message: String): Nothing {
    System.err.println(message)
    exitProcess(1)
}

fun shell(command: String): ShellResult {
    return try {
        val process = ProcessBuilder("sh", "-c", command)
            .redirectOutput(ProcessBuilder.Redirect.PIPE)
            .redirectError(ProcessBuilder.Redirect.PIPE)
            .start()
        val output = process.inputStream.bufferedReader().readText().trim()
        val exitCode = process.waitFor()
        ShellResult(exitCode, output)
    } catch (e: Exception) {
        ShellResult(-1, "")
    }
}

fun isGitAvailable() = shell("command -v git >/dev/null 2>&1").succeeded
fun isInsideGitRepository() = shell("git rev-parse --git-dir >/dev/null 2>&1").succeeded
fun headExists() = shell("git rev-parse HEAD >/dev/null 2>&1").succeeded
fun isWorkingDirectoryClean() = shell("git status --porcelain 2>/dev/null").output.isEmpty()
fun getShortCommitHash() = shell("git rev-parse --short=7 HEAD").output
fun countCommitsFrom(tag: String) = shell("git rev-list --count '$tag..HEAD'").output
fun countAllCommits() = shell("git rev-list --count HEAD").output
fun isShallowRepository() = shell("git rev-parse --is-shallow-repository").output == "true"
fun deepenShallowRepository() = shell("git fetch --deepen=$FETCH_DEPTH --tags >/dev/null 2>&1").succeeded

fun findLatestVersionTag(): String {
    return shell("git tag --list '$VERSION_TAG_PATTERN' --merged HEAD --sort=-version:refname")
        .output
        .split("\n")
        .filter { it.isNotEmpty() }
        .firstOrNull { VERSION_TAG_REGEX.matches(it) }
        ?: ""
}

fun findVersionTagWithShallowFetch(): Int {
    if (!isShallowRepository()) return 1
    
    repeat(MAX_FETCH_ATTEMPTS) {
        if (!deepenShallowRepository()) error("Error: git fetch failed")
        if (findLatestVersionTag().isNotEmpty()) return 0
        if (!isShallowRepository()) return 1
    }
    
    return 2
}

fun findVersionTagOnHead(): String {
    return shell("git tag --points-at HEAD --list '$VERSION_TAG_PATTERN'")
        .output
        .split("\n")
        .filter { it.isNotEmpty() }
        .firstOrNull { VERSION_TAG_REGEX.matches(it) }
        ?: ""
}

fun buildVersionString(versionTag: String, isDirty: Boolean): String {
    val shortHash = getShortCommitHash()
    
    val baseVersion = if (versionTag.isNotEmpty()) {
        "${versionTag.removePrefix("v")}+${countCommitsFrom(versionTag)}.g$shortHash"
    } else {
        "0.0.0+${countAllCommits()}.g$shortHash"
    }
    
    return if (isDirty) "$baseVersion.dirty" else baseVersion
}

if (!isGitAvailable()) exitWithVersion("0.0.0+0.g0000000.dirty")
if (!isInsideGitRepository()) exitWithVersion("0.0.0+0.g0000000.dirty")
if (!headExists()) exitWithVersion("0.0.0+0.g0000000.dirty")

val clean = isWorkingDirectoryClean()
val headTag = findVersionTagOnHead()

if (clean && headTag.isNotEmpty()) exitWithVersion(headTag.removePrefix("v"))

var versionTag = findLatestVersionTag()

if (versionTag.isEmpty()) {
    when (findVersionTagWithShallowFetch()) {
        0 -> versionTag = findLatestVersionTag()
        2 -> error("Error: No version tag found after $MAX_FETCH_ATTEMPTS fetch attempts")
    }
}

exitWithVersion(buildVersionString(versionTag, !clean))
