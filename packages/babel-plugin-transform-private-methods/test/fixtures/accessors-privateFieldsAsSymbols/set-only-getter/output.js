var _privateField = Symbol("privateField");
var _privateFieldValue = Symbol("privateFieldValue");
class Cl {
  constructor() {
    Object.defineProperty(this, _privateFieldValue, {
      get: _get_privateFieldValue,
      set: void 0
    });
    Object.defineProperty(this, _privateField, {
      writable: true,
      value: 0
    });
    babelHelpers.assertClassBrandLoose(this, _privateFieldValue)[_privateFieldValue] = 1;
    [babelHelpers.assertClassBrandLoose(this, _privateFieldValue)[_privateFieldValue]] = [1];
  }
}
function _get_privateFieldValue() {
  return babelHelpers.assertClassBrandLoose(this, _privateField, 1);
}
