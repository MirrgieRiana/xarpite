package mirrg.xarpite.cli

class Options(val src: String, val arguments: List<String>, val quiet: Boolean)

object ShowUsage : Throwable()

fun parseArguments(args: Array<String>): Options {
    val list = args.toMutableList()
    var src: String? = null
    val arguments = mutableListOf<String>()
    var quiet = false

    run {
        while (true) {

            if (list.firstOrNull() == "--") {
                list.removeFirst()

                if (list.isEmpty()) throw ShowUsage

                src = list.removeFirst()
                arguments += list
                list.clear()
                return@run
            }

            if (list.firstOrNull() == "-h") throw ShowUsage
            if (list.firstOrNull() == "--help") throw ShowUsage

            if (list.firstOrNull() == "-q") {
                if (quiet) throw ShowUsage
                quiet = true
                list.removeFirst()
                continue
            }

            if (list.isEmpty()) throw ShowUsage

            src = list.removeFirst()
            arguments += list
            list.clear()
            return@run
        }
    }

    return Options(src ?: throw ShowUsage, arguments, quiet)
}

fun showUsage() {
    println("Usage: flc [-h|--help] [-q] [--] <code> <arguments...>")
    println("Options:")
    println("  -h, --help               Show this help")
    println("  -q                       Run script as a runner")
}
