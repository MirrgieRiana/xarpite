package mirrg.xarpite.cli

import mirrg.xarpite.AbstractIoContext
import mirrg.xarpite.compilers.objects.FluoriteValue
import mirrg.xarpite.compilers.objects.toFluoriteString

abstract class CliIoContext : AbstractIoContext() {
    final override suspend fun out(value: FluoriteValue) = println(value.toFluoriteString(null).value)
    final override suspend fun err(value: FluoriteValue) = writeBytesToStderr("${value.toFluoriteString(null).value}\n".encodeToByteArray())
}
