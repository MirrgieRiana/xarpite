import {
  readSync as readSync,
  closeSync as closeSync,
  openSync as openSync,
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
  initMetadataForObject1cxne3s9w65el as initMetadataForObject,
  VOID3gxj6tk5isa35 as VOID,
} from './kotlin-kotlin-stdlib.mjs';
import {
  IOException_init_$Create$1nlsccrpovv0q as IOException_init_$Create$,
  FileNotFoundException1m3q2rg4pj77g as FileNotFoundException,
  FileSystem239k0lkpj719u as FileSystem,
} from './okio-parent-okio.mjs';
//region block: imports
//endregion
//region block: pre-declaration
initMetadataForClass(FileSource, 'FileSource');
initMetadataForObject(NodeJsFileSystem, 'NodeJsFileSystem', VOID, FileSystem);
//endregion
function FileSource(fd) {
  this.k6y_1 = fd;
  this.l6y_1 = new Long(0, 0);
  this.m6y_1 = false;
}
protoOf(FileSource).y1i = function (sink, byteCount) {
  // Inline function 'kotlin.require' call
  if (!(compare(byteCount, new Long(0, 0)) >= 0)) {
    var message = 'byteCount < 0: ' + byteCount.toString();
    throw IllegalArgumentException_init_$Create$(toString(message));
  }
  // Inline function 'kotlin.check' call
  if (!!this.m6y_1) {
    var message_0 = 'closed';
    throw IllegalStateException_init_$Create$(toString(message_0));
  }
  var data = new Int8Array(convertToInt(byteCount));
  var tmp0_fd = this.k6y_1;
  var tmp1_length = toNumber(byteCount);
  var tmp2_position = toNumber(this.l6y_1);
  var readByteCount = numberToInt(readSync(tmp0_fd, data, 0.0, tmp1_length, tmp2_position));
  if (readByteCount === 0)
    return new Long(-1, -1);
  var tmp = this;
  // Inline function 'kotlin.Long.plus' call
  var this_0 = this.l6y_1;
  tmp.l6y_1 = add(this_0, fromInt(readByteCount));
  sink.a1h(data, 0, readByteCount);
  return fromInt(readByteCount);
};
protoOf(FileSource).v1h = function () {
  if (this.m6y_1)
    return Unit_instance;
  this.m6y_1 = true;
  closeSync(this.k6y_1);
};
function _get_errorCode__501hwc($this, _this__u8e3s4) {
  // Inline function 'kotlin.js.asDynamic' call
  return _this__u8e3s4.code;
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
  this.n6y_1 = 61440;
  this.o6y_1 = 32768;
  this.p6y_1 = 16384;
  this.q6y_1 = 40960;
}
protoOf(NodeJsFileSystem).u1h = function (file) {
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
