"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.foo = void 0;
var foo = _interopRequireWildcard(require("./moduleWithGetter"));
exports.foo = foo;
function _interopRequireWildcard(e, t) { if ("function" == typeof WeakMap) var r = new WeakMap(), n = new WeakMap(); return (_interopRequireWildcard = function (e, t) { if (!t && e && e.__esModule) return e; var o, i = t ? n : r, u = { __proto__: null, default: e }, a = typeof e; if (null == e || "object" !== a && "function" !== a) return u; if (i) { if (i.has(e)) return i.get(e); i.set(e, u); } for (const t in e) "default" !== t && {}.hasOwnProperty.call(e, t) && ((o = (a = Object.getOwnPropertyDescriptor) && a(e, t)) && (o.get || o.set) ? Object.defineProperty(u, t, o) : u[t] = e[t]); return u; })(e, t); }
