class DocShellParser(private val filePath: String, private val lines: List<String>, private val out: (String) -> Unit) {

    private inner class Pointer {
        var index = 0
        val lineNumber get() = index + 1

        fun get() = lines.getOrNull(index)

        fun next() {
            index++
        }

        fun throwParseError(message: String): Nothing = throw IllegalStateException("$filePath($lineNumber): $message")
    }

    class DocShell(val lineNumber: Int, val command: List<String>, val expected: List<String>)

    fun writeTestScriptHeader() {
        out("#!/usr/bin/env bash")
        out("")
        out("((\$# != 1)) && {")
        out("  echo \"Usage: \$0 <release_dir>\" >&2")
        out("  exit 1")
        out("}")
        out("release_dir=\$(cd \"\$1\" && pwd)")
        out("shift")
        out("")
        out("export PATH=\"\$release_dir:\$PATH\"")
        out("")
        out("failed=0")
        out("fail() {")
        out("  echo \"FAILED: \$1\" >&2")
        out("  echo \"[expected]\" >&2")
        out("  echo \"\$2\" >&2")
        out("  echo \"[actual]\" >&2")
        out("  echo \"\$3\" >&2")
        out("  failed=1")
        out("}")
    }

    fun writeTestScriptFooter() {
        out("")
        out("exit \$failed")
    }

    fun writeTestScript() {
        parseDoc(Pointer()).forEach { docShell ->
            out("")

            out("# $filePath (${docShell.lineNumber})")
            out("expected=\$(")
            out("cat << 'DOC_SHELL_TEST_END'")
            docShell.expected.forEach {
                out(it)
            }
            out("DOC_SHELL_TEST_END")
            out(")")
            out("actual=\$(")
            docShell.command.forEach {
                out(it)
            }
            out(")")
            out("actual=\$(echo \"\$actual\" | perl -lpE 's/[\\t ]+\$//g' | perl -0777 -pE 's/\\A\\n+//; s/\\n+\\Z/\\n/')")
            out("[ \"\$actual\" = \"\$expected\" ] || fail \"$filePath:${docShell.lineNumber}\" \"\$expected\" \"\$actual\"")
            //out("echo \"OK $filePath:${docShell.lineNumber}\"")
        }
    }

    private fun parseDoc(pointer: Pointer): List<DocShell> {
        val docShells = mutableListOf<DocShell>()
        while (true) {
            if (pointer.get() == null) return docShells
            val docShells2 = tryParseDocShell(pointer)
            if (docShells2 != null) {
                docShells += docShells2
            } else {
                pointer.next()
            }
        }
    }

    private fun tryParseDocShell(pointer: Pointer): List<DocShell>? {
        if (pointer.get() == "```shell") {
            pointer.next()

            val docShells = mutableListOf<DocShell>()
            while (true) {
                val lineNumber = pointer.lineNumber
                val command = mutableListOf<String>()
                val expected = mutableListOf<String>()
                command += parseHeadCommandLine(pointer)
                command += parseBodyCommandLine(pointer)
                expected += parseExpectedLine(pointer)
                docShells += DocShell(lineNumber, command, expected)

                if (pointer.get() == "```") {
                    pointer.next()
                    return docShells
                } else if (pointer.get() == "") {
                    pointer.next()
                    continue
                } else {
                    pointer.throwParseError("Expected EndOfDocShell or EmptyLine")
                }
            }
        } else {
            return null
        }
    }

    private fun parseHeadCommandLine(pointer: Pointer): String {
        val line = pointer.get()
        if (line != null && line.startsWith("\$ ")) {
            pointer.next()
            return line.drop(2)
        } else {
            pointer.throwParseError("Expected HeadCommandLine")
        }
    }

    private fun parseBodyCommandLine(pointer: Pointer): List<String> {
        val lines = mutableListOf<String>()
        while (true) {
            val line = pointer.get()
            if (line != null && !line.startsWith("# ") && line != "#" && line != "```") {
                lines += line
                pointer.next()
            } else {
                break
            }
        }
        return lines
    }

    private fun parseExpectedLine(pointer: Pointer): List<String> {
        val lines = mutableListOf<String>()
        while (true) {
            val line = pointer.get()
            if (line != null && line.startsWith("# ")) {
                lines += line.drop(2)
                pointer.next()
            } else if (line != null && line == "#") {
                lines += ""
                pointer.next()
            } else {
                break
            }
        }
        return lines
    }

}
