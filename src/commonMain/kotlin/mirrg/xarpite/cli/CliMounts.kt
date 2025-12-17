package mirrg.xarpite.cli

import executeProcess
import getEnv
import getFileSystem
import mirrg.xarpite.compilers.objects.FluoriteArray
import mirrg.xarpite.compilers.objects.FluoriteFunction
import mirrg.xarpite.compilers.objects.FluoriteObject
import mirrg.xarpite.compilers.objects.FluoriteStream
import mirrg.xarpite.compilers.objects.FluoriteString
import mirrg.xarpite.compilers.objects.FluoriteValue
import mirrg.xarpite.compilers.objects.asFluoriteBlob
import mirrg.xarpite.compilers.objects.collect
import mirrg.xarpite.compilers.objects.toFluoriteArray
import mirrg.xarpite.compilers.objects.toFluoriteStream
import mirrg.xarpite.compilers.objects.toFluoriteString
import mirrg.xarpite.mounts.usage
import okio.Path.Companion.toPath
import readBytesFromStdin
import readLineFromStdin

val INB_MAX_BUFFER_SIZE = 8192

fun createCliMounts(args: List<String>): List<Map<String, FluoriteValue>> {
    return mapOf(
        "ARGS" to args.map { it.toFluoriteString() }.toFluoriteArray(),
        "ENV" to FluoriteObject(FluoriteObject.fluoriteClass, getEnv().mapValues { it.value.toFluoriteString() }.toMutableMap()),
        "IN" to FluoriteStream {
            while (true) {
                val line = readLineFromStdin() ?: break
                emit(line.toFluoriteString())
            }
        },
        "INB" to FluoriteStream {
            while (true) {
                val bytes = readBytesFromStdin() ?: break
                @OptIn(ExperimentalUnsignedTypes::class)
                emit(bytes.asUByteArray().asFluoriteBlob())
            }
        },
        "READ" to FluoriteFunction { arguments ->
            if (arguments.size != 1) usage("READ(file: STRING): STREAM<STRING>")
            val file = arguments[0].toFluoriteString().value
            val fileSystem = getFileSystem().getOrThrow()
            FluoriteStream {
                fileSystem.read(file.toPath()) { // TODO charset
                    while (true) {
                        val line = readUtf8Line() ?: break
                        emit(line.toFluoriteString())
                    }
                }
            }
        },
        "FILES" to FluoriteFunction { arguments ->
            if (arguments.size != 1) usage("FILES(dir: STRING): STREAM<STRING>")
            val dir = arguments[0].toFluoriteString().value
            val fileSystem = getFileSystem().getOrThrow()
            fileSystem.list(dir.toPath()).map { it.name.toFluoriteString() }.toFluoriteStream()
        },
        "EXEC" to FluoriteFunction { arguments ->
            fun error(): Nothing = usage("EXEC(command: STREAM<STRING>[; env: env: OBJECT][; dir: dir: STRING][; in: STREAM<STRING>]): STREAM<STRING>")
            
            if (arguments.isEmpty()) error()
            
            // 1st argument: command (required)
            val commandStream = arguments[0] as? FluoriteStream ?: error()
            
            // Extract command list
            val commandList = mutableListOf<String>()
            commandStream.collect { 
                commandList.add(it.toFluoriteString().value)
            }
            
            if (commandList.isEmpty()) error()
            
            // Parse optional positional arguments with skippable entries
            var envMap: Map<String, String>? = null
            var dirPath: String? = null
            val inputLines = mutableListOf<String>()
            
            var argIndex = 1
            
            // 2nd argument: if it's an env entry, use it; otherwise skip
            if (argIndex < arguments.size) {
                val arg = arguments[argIndex]
                if (arg is FluoriteArray && arg.values.size == 2) {
                    val key = arg.values[0]
                    if (key is FluoriteString && key.value == "env") {
                        val value = arg.values[1]
                        if (value !is FluoriteObject) error()
                        envMap = value.map.mapValues { it.value.toFluoriteString().value }
                        argIndex++
                    }
                }
            }
            
            // 3rd argument: if it's a dir entry, use it; otherwise skip
            if (argIndex < arguments.size) {
                val arg = arguments[argIndex]
                if (arg is FluoriteArray && arg.values.size == 2) {
                    val key = arg.values[0]
                    if (key is FluoriteString && key.value == "dir") {
                        val value = arg.values[1]
                        dirPath = value.toFluoriteString().value
                        argIndex++
                    }
                }
            }
            
            // 4th argument: if it exists, it's in
            if (argIndex < arguments.size) {
                val inStream = arguments[argIndex]
                if (inStream is FluoriteStream) {
                    inStream.collect { line ->
                        inputLines.add(line.toFluoriteString().value)
                    }
                } else {
                    error()
                }
                argIndex++
            }
            
            // If there are extra arguments, error
            if (argIndex < arguments.size) error()
            
            // Merge environment variables
            val finalEnv = if (envMap != null) {
                getEnv().toMutableMap().apply { putAll(envMap) }
            } else {
                null
            }
            
            // Execute the process
            FluoriteStream {
                val outputLines = executeProcess(commandList, finalEnv, dirPath) { inputLines }
                outputLines.forEach { line ->
                    emit(line.toFluoriteString())
                }
            }
        },
    ).let { listOf(it) }
}
