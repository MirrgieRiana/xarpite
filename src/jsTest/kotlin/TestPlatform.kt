import mirrg.xarpite.fileSystemGetter
import okio.NodeJsFileSystem

internal actual fun initializeTestFileSystem() {
    fileSystemGetter = { NodeJsFileSystem }
}
