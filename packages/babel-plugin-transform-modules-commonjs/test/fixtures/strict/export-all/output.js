"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
var _exportNames = {
  z: true,
  a: true,
  b: true,
  d: true,
  e: true,
  f: true,
  c: true
};
exports.a = void 0;
exports.b = b;
Object.defineProperty(exports, "c", {
  enumerable: true,
  get: function () {
    return _mod.c;
  }
});
exports.d = void 0;
exports.default = _default;
exports.z = exports.f = exports.e = void 0;
var _mod = require("mod");
Object.keys(_mod).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (Object.prototype.hasOwnProperty.call(_exportNames, key)) return;
  if (key in exports && exports[key] === _mod[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _mod[key];
    }
  });
});
var z = 100;
exports.z = z;
class a {}
exports.a = a;
function b() {}
var d = 42;
exports.d = d;
var e = 1,
    f = 2;
exports.f = f;
exports.e = e;
function _default() {}
