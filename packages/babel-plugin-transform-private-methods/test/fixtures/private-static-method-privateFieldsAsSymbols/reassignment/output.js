var _privateStaticMethod = Symbol("privateStaticMethod");
class Cl {
  constructor() {
    babelHelpers.classPrivateFieldGetLoose(Cl, _privateStaticMethod, 1)[_privateStaticMethod] = null;
  }
}
function _privateStaticMethod2() {}
Object.defineProperty(Cl, _privateStaticMethod, {
  value: _privateStaticMethod2
});
new Cl();
