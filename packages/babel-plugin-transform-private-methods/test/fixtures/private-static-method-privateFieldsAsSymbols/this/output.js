var _B;
class A {
  static get a() {
    return 1;
  }
}
var _getA = Symbol("getA");
var _getB = Symbol("getB");
class B extends A {
  static get b() {
    return 2;
  }
  static extract() {
    return [babelHelpers.assertClassBrandLoose(this, _getA, 1), babelHelpers.assertClassBrandLoose(this, _getB, 1)];
  }
}
_B = B;
function _getA2() {
  return babelHelpers.get(babelHelpers.getPrototypeOf(_B), "a", this);
}
function _getB2() {
  return this.b;
}
Object.defineProperty(B, _getB, {
  value: _getB2
});
Object.defineProperty(B, _getA, {
  value: _getA2
});
const [getA, getB] = B.extract();
