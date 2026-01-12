package mirrg.xarpite.js.test

import writeBytesToStdoutImpl
import writeBytesToStderrImpl

// Initialize stdout and stderr for JS tests
// This runs when the test module is loaded
internal val initJsTestPlatform = run {
    if (writeBytesToStdoutImpl == null) {
        writeBytesToStdoutImpl = {}
    }
    if (writeBytesToStderrImpl == null) {
        writeBytesToStderrImpl = {}
    }
    Unit
}
