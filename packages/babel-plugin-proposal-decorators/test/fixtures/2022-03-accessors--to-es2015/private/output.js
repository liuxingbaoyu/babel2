var _initProto, _init_a, _get_a, _set_a, _init_b, _get_b, _set_b, _Foo;
const dec = () => {};
var _A = /*#__PURE__*/new WeakMap();
var _Foo_brand = /*#__PURE__*/new WeakSet();
var _B = /*#__PURE__*/new WeakMap();
class Foo {
  constructor() {
    babelHelpers.classPrivateMethodInitSpec(this, _Foo_brand);
    babelHelpers.classPrivateFieldInitSpec(this, _A, (_initProto(this), _init_a(this)));
    babelHelpers.classPrivateFieldInitSpec(this, _B, _init_b(this, 123));
  }
}
_Foo = Foo;
function _set_a2(v) {
  _set_a(this, v);
}
function _get_a2() {
  return _get_a(this);
}
function _set_b2(v) {
  _set_b(this, v);
}
function _get_b2() {
  return _get_b(this);
}
[_init_a, _get_a, _set_a, _init_b, _get_b, _set_b, _initProto] = babelHelpers.applyDecs2203R(_Foo, [[dec, 1, "a", function () {
  return babelHelpers.classPrivateFieldGet2(_A, this);
}, function (value) {
  babelHelpers.classPrivateFieldSet2(_A, this, value);
}], [dec, 1, "b", function () {
  return babelHelpers.classPrivateFieldGet2(_B, this);
}, function (value) {
  babelHelpers.classPrivateFieldSet2(_B, this, value);
}]], []).e;
