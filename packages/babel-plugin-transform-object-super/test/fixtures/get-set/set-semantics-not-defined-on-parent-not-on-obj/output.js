"use strict";

let _obj;
const Base = {};
const obj = _obj = {
  set() {
    return babelHelpers.set(babelHelpers.getPrototypeOf(_obj), "test", 3, this, true);
  }
};
Object.setPrototypeOf(obj, Base);
expect(obj.set()).toBe(3);
expect(Base.test).toBeUndefined();
expect(obj.test).toBe(3);
