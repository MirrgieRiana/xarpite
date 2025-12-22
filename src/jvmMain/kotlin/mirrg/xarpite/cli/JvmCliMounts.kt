package mirrg.xarpite.cli

import kotlinx.coroutines.Dispatchers
import kotlinx.coroutines.async
import kotlinx.coroutines.coroutineScope
import kotlinx.coroutines.flow.flow
import kotlinx.coroutines.flow.toList
import kotlinx.coroutines.withContext
import mirrg.xarpite.compilers.objects.FluoriteFunction
import mirrg.xarpite.compilers.objects.FluoriteStream
import mirrg.xarpite.compilers.objects.FluoriteValue
import mirrg.xarpite.compilers.objects.toFluoriteString
import mirrg.xarpite.mounts.usage
import java.io.BufferedReader

fun createJvmCliMounts(): List<Map<String, FluoriteValue>> {
    return mapOf(
        "EXEC" to FluoriteFunction { arguments ->
            if (arguments.size != 1) usage("EXEC(command: STREAM<STRING>): STREAM<STRING>")
            
            // 引数からコマンド配列を構築
            val commandArg = arguments[0]
            val commandList = if (commandArg is FluoriteStream) {
                // ストリームの場合、すべての要素を収集
                flow { commandArg.flowProvider(this) }
                    .toList()
                    .map { it.toFluoriteString().value }
            } else {
                // 単一要素の場合
                listOf(commandArg.toFluoriteString().value)
            }
            
            // プロセスを実行して結果を取得
            val lines = coroutineScope {
                withContext(Dispatchers.IO) {
                    val processBuilder = ProcessBuilder(commandList)
                    val process = processBuilder.start()
                    
                    try {
                        // 標準出力を非同期で読み取る（デッドロック回避のため）
                        val outputDeferred = async {
                            BufferedReader(process.inputStream.reader()).use { reader ->
                                reader.readLines()
                            }
                        }
                        
                        // プロセスの終了を待つ
                        val exitCode = process.waitFor()
                        
                        // 出力を取得
                        val output = outputDeferred.await()
                        
                        // 実験的機能のため、エラーコードのチェックは行わず、
                        // 取得できた標準出力をそのまま返す
                        output
                    } finally {
                        process.destroy()
                    }
                }
            }
            
            // ストリームとして返す
            FluoriteStream {
                lines.forEach { line ->
                    emit(line.toFluoriteString())
                }
            }
        },
    ).let { listOf(it) }
}
