"use strict";

let Base = /*#__PURE__*/function () {
  function Base() {
    babelHelpers.classCallCheck(this, Base);
  }
  return babelHelpers.createClass(Base, [{
    key: "test",
    value: function test(...args) {
      expect(this).toBe(obj);
      expect(args).toEqual([1, 2, 3]);
      return 1;
    }
  }]);
}();
let Obj = /*#__PURE__*/function (_Base) {
  function Obj() {
    babelHelpers.classCallCheck(this, Obj);
    return babelHelpers.callSuper(this, Obj, arguments);
  }
  babelHelpers.inherits(Obj, _Base);
  return babelHelpers.createClass(Obj, [{
    key: "call",
    value: function call() {
      babelHelpers.superPropertyGetCall(Obj, "test", this, 1, [1, 2, 3]);
      babelHelpers.superPropertyGetCall(Obj, "test", this, 1, [1, ...[2, 3]]);
      babelHelpers.superPropertyGetCall(Obj, "test", this, 1, [1, 2, 3]);
      return babelHelpers.superPropertyGetCall(Obj, "test", this, 1, arguments);
    }
  }, {
    key: "test",
    value: function test() {
      throw new Error("called");
    }
  }]);
}(Base);
const obj = new Obj();
expect(obj.call(1, 2, 3)).toBe(1);
