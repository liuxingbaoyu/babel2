"use strict";

var _obj;
const Base = {};
const obj = _obj = {
  test: 2,
  set() {
    return babelHelpers.superPropertySet(_obj, "test", 3, this, 1);
  }
};
Object.setPrototypeOf(obj, Base);
expect(obj.set()).toBe(3);
expect(Base.test).toBeUndefined();
expect(obj.test).toBe(3);
