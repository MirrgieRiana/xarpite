import writeBytesToStdoutImpl
import writeBytesToStderrImpl

actual fun initTestPlatform() {
    // Initialize stdout and stderr for JS tests
    if (writeBytesToStdoutImpl == null) {
        writeBytesToStdoutImpl = {}
    }
    if (writeBytesToStderrImpl == null) {
        writeBytesToStderrImpl = {}
    }
}
