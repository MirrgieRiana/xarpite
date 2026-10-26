package mirrg.xarpite

import okio.FileMetadata
import okio.FileSystem
import okio.Path

expect fun getProgramName(): String?
expect fun hasFreeze(): Boolean
expect fun getFileSystem(): Result<FileSystem>
expect fun FileSystem.metadataOrNullIfValid(path: Path): FileMetadata?
expect fun isWindows(): Boolean
