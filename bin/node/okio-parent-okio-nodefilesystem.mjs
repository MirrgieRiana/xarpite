import {
  readSync as readSync,
  closeSync as closeSync,
  opendirSync as opendirSync,
  openSync as openSync,
  lstatSync as lstatSync,
  readlinkSync as readlinkSync,
} from 'fs';
import {
  Long2qws0ah9gnpki as Long,
  compare2uud5j30pw5xc as compare,
  toString1pkumu07cwy4m as toString,
  IllegalArgumentException_init_$Create$3ewkh27kzt8z8 as IllegalArgumentException_init_$Create$,
  Unit_instance1fbcbse1fwigr as Unit_instance,
  IllegalStateException_init_$Create$2w9444nebyjns as IllegalStateException_init_$Create$,
  convertToIntofdoxh9bstof as convertToInt,
  toNumberlmbpvqo27r53 as toNumber,
  numberToInt1ygmcfwhs2fkq as numberToInt,
  fromInt1lka3ktyu79a4 as fromInt,
  add85si75olwt6n as add,
  protoOf180f3jzyo7rfj as protoOf,
  initMetadataForClassbxx6q50dy2s7 as initMetadataForClass,
  ArrayList_init_$Create$149jv2ovkkvnt as ArrayList_init_$Create$,
  sort15ai02l4kxbfa as sort,
  numberToLong345n6tb1n1i71 as numberToLong,
  ensureNotNull1e947j3ixpazm as ensureNotNull,
  initMetadataForObject1cxne3s9w65el as initMetadataForObject,
  VOID3gxj6tk5isa35 as VOID,
} from './kotlin-kotlin-stdlib.mjs';
import {
  IOException_init_$Create$1nlsccrpovv0q as IOException_init_$Create$,
  FileNotFoundException1m3q2rg4pj77g as FileNotFoundException,
  FileSystem239k0lkpj719u as FileSystem,
  Companion_getInstance2khnd3aviw7kz as Companion_getInstance,
  FileMetadata2eik8eoxvypn8 as FileMetadata,
} from './okio-parent-okio.mjs';
//region block: imports
//endregion
//region block: pre-declaration
initMetadataForClass(FileSource, 'FileSource');
initMetadataForObject(NodeJsFileSystem, 'NodeJsFileSystem', VOID, FileSystem);
//endregion
function FileSource(fd) {
  this.l7e_1 = fd;
  this.m7e_1 = new Long(0, 0);
  this.n7e_1 = false;
}
protoOf(FileSource).a1k = function (sink, byteCount) {
  // Inline function 'kotlin.require' call
  if (!(compare(byteCount, new Long(0, 0)) >= 0)) {
    var message = 'byteCount < 0: ' + byteCount.toString();
    throw IllegalArgumentException_init_$Create$(toString(message));
  }
  // Inline function 'kotlin.check' call
  if (!!this.n7e_1) {
    var message_0 = 'closed';
    throw IllegalStateException_init_$Create$(toString(message_0));
  }
  var data = new Int8Array(convertToInt(byteCount));
  var tmp0_fd = this.l7e_1;
  var tmp1_length = toNumber(byteCount);
  var tmp2_position = toNumber(this.m7e_1);
  var readByteCount = numberToInt(readSync(tmp0_fd, data, 0.0, tmp1_length, tmp2_position));
  if (readByteCount === 0)
    return new Long(-1, -1);
  var tmp = this;
  // Inline function 'kotlin.Long.plus' call
  var this_0 = this.m7e_1;
  tmp.m7e_1 = add(this_0, fromInt(readByteCount));
  sink.j1h(data, 0, readByteCount);
  return fromInt(readByteCount);
};
protoOf(FileSource).p1i = function () {
  if (this.n7e_1)
    return Unit_instance;
  this.n7e_1 = true;
  closeSync(this.l7e_1);
};
function _get_errorCode__501hwc($this, _this__u8e3s4) {
  // Inline function 'kotlin.js.asDynamic' call
  return _this__u8e3s4.code;
}
function list($this, dir, throwOnFailure) {
  try {
    var opendir = opendirSync(dir.toString());
    try {
      // Inline function 'kotlin.collections.mutableListOf' call
      var result = ArrayList_init_$Create$();
      $l$loop: while (true) {
        var tmp0_elvis_lhs = opendir.readSync();
        var tmp;
        if (tmp0_elvis_lhs == null) {
          break $l$loop;
        } else {
          tmp = tmp0_elvis_lhs;
        }
        var dirent = tmp;
        // Inline function 'kotlin.collections.plusAssign' call
        var element = dir.j1k(dirent.name);
        result.j(element);
      }
      sort(result);
      return result;
    }finally {
      opendir.closeSync();
    }
  } catch ($p) {
    if ($p instanceof Error) {
      var e = $p;
      if (throwOnFailure) {
        throw toIOException($this, e);
      } else {
        return null;
      }
    } else {
      throw $p;
    }
  }
}
function openFd($this, file, flags) {
  try {
    return openSync(file.toString(), flags);
  } catch ($p) {
    if ($p instanceof Error) {
      var e = $p;
      throw toIOException($this, e);
    } else {
      throw $p;
    }
  }
}
function toIOException($this, _this__u8e3s4) {
  return _get_errorCode__501hwc($this, _this__u8e3s4) == 'ENOENT' ? new FileNotFoundException(_this__u8e3s4.message) : IOException_init_$Create$(_this__u8e3s4.message);
}
function NodeJsFileSystem() {
  NodeJsFileSystem_instance = this;
  FileSystem.call(this);
  this.o7e_1 = 61440;
  this.p7e_1 = 32768;
  this.q7e_1 = 16384;
  this.r7e_1 = 40960;
}
protoOf(NodeJsFileSystem).k1h = function (path) {
  var pathString = path.toString();
  var tmp;
  try {
    tmp = lstatSync(pathString);
  } catch ($p) {
    var tmp_0;
    if ($p instanceof Error) {
      var e = $p;
      if (_get_errorCode__501hwc(this, e) == 'ENOENT')
        return null;
      throw IOException_init_$Create$(e.message);
    } else {
      throw $p;
    }
  }
  var stat = tmp;
  var symlinkTarget = null;
  if ((numberToInt(stat.mode) & this.o7e_1) === this.r7e_1) {
    try {
      symlinkTarget = Companion_getInstance().l1i(readlinkSync(pathString));
    } catch ($p) {
      if ($p instanceof Error) {
        var e_0 = $p;
        throw toIOException(this, e_0);
      } else {
        throw $p;
      }
    }
  }
  return new FileMetadata((numberToInt(stat.mode) & this.o7e_1) === this.p7e_1, (numberToInt(stat.mode) & this.o7e_1) === this.q7e_1, symlinkTarget, numberToLong(stat.size), numberToLong(stat.birthtimeMs), numberToLong(stat.mtimeMs), numberToLong(stat.atimeMs));
};
protoOf(NodeJsFileSystem).n1i = function (dir) {
  return ensureNotNull(list(this, dir, true));
};
protoOf(NodeJsFileSystem).o1i = function (file) {
  var fd = openFd(this, file, 'r');
  return new FileSource(fd);
};
protoOf(NodeJsFileSystem).toString = function () {
  return 'NodeJsSystemFileSystem';
};
var NodeJsFileSystem_instance;
function NodeJsFileSystem_getInstance() {
  if (NodeJsFileSystem_instance == null)
    new NodeJsFileSystem();
  return NodeJsFileSystem_instance;
}
//region block: exports
export {
  NodeJsFileSystem_getInstance as NodeJsFileSystem_getInstance3ojwnh341fjb5,
};
//endregion

//# sourceMappingURL=okio-parent-okio-nodefilesystem.mjs.map
