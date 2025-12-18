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
            
            val args = arguments.toMutableList()
            
            if (args.isEmpty()) error()
            
            // 1st argument: command (required)
            val commandStream = args.removeFirst() as? FluoriteStream ?: error()
            
            // Extract command list
            val commandList = mutableListOf<String>()
            commandStream.collect { 
                commandList.add(it.toFluoriteString().value)
            }
            
            if (commandList.isEmpty()) error()
            
            // Parse optional positional arguments with skippable entries
            var envMap: Map<String, String>? = null
            var dirPath: String? = null
            var inputStream: FluoriteStream? = null
            
            // 2nd argument: if it's an env entry, use it; otherwise skip
            if (args.isNotEmpty()) {
                val arg = args.first()
                if (arg is FluoriteArray && arg.values.size == 2) {
                    val key = arg.values[0]
                    if (key is FluoriteString && key.value == "env") {
                        args.removeFirst()
                        val value = arg.values[1]
                        if (value !is FluoriteObject) error()
                        envMap = value.map.mapValues { it.value.toFluoriteString().value }
                    }
                }
            }
            
            // 3rd argument: if it's a dir entry, use it; otherwise skip
            if (args.isNotEmpty()) {
                val arg = args.first()
                if (arg is FluoriteArray && arg.values.size == 2) {
                    val key = arg.values[0]
                    if (key is FluoriteString && key.value == "dir") {
                        args.removeFirst()
                        val value = arg.values[1]
                        dirPath = value.toFluoriteString().value
                    }
                }
            }
            
            // 4th argument: if it exists, it's in
            if (args.isNotEmpty()) {
                val inStream = args.removeFirst()
                if (inStream is FluoriteStream) {
                    inputStream = inStream
                } else {
                    error()
                }
            }
            
            // If there are extra arguments, error
            if (args.isNotEmpty()) error()
            
            // Merge environment variables
            val finalEnv = if (envMap != null) {
                getEnv().toMutableMap().apply { putAll(envMap) }
            } else {
                null
            }
            
            // Execute the process
            FluoriteStream {
                // Create input reader that reads from the stream
                var inputIterator: (suspend () -> String?)? = null
                if (inputStream != null) {
                    val inputList = mutableListOf<String>()
                    inputStream.collect { line ->
                        inputList.add(line.toFluoriteString().value)
                    }
                    var inputIndex = 0
                    inputIterator = suspend {
                        if (inputIndex < inputList.size) inputList[inputIndex++] else null
                    }
                }
                
                val outputReader = executeProcess(commandList, finalEnv, dirPath, inputIterator ?: suspend { null })
                
                // Read output line by line
                while (true) {
                    val line = outputReader() ?: break
                    emit(line.toFluoriteString())
                }
            }
        },
    ).let { listOf(it) }
}
