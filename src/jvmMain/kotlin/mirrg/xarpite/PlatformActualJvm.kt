package mirrg.xarpite

import java.nio.file.Path

actual fun getEnvironmentVariable(name: String): String? = System.getenv(name)

actual fun getPlatformSpecificPwd(): String = Path.of("").toAbsolutePath().normalize().toString()
