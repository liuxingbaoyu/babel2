var counter = 0;
var _privateMethod = /*#__PURE__*/babelHelpers.classPrivateFieldLooseKey("privateMethod");
class Foo {
  constructor() {
    Object.defineProperty(this, _privateMethod, {
      value: _privateMethod2
    });
    babelHelpers.classPrivateFieldGetLoose(this, _privateMethod, 1)[_privateMethod] = ++counter;
  }
}
function _privateMethod2() {
  return 42;
}
