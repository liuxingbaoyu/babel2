var A = /*#__PURE__*/function () {
  "use strict";

  function A() {
    babelHelpers.classCallCheck(this, A);
  }
  return babelHelpers.createClass(A, [{
    key: "foo",
    value: function foo() {
      return "bar";
    }
  }]);
}();
var B = /*#__PURE__*/function (_A) {
  "use strict";

  function B(...args) {
    var _this;
    babelHelpers.classCallCheck(this, B);
    _this = babelHelpers.callSuper(this, B, [...args]);
    _this.foo = babelHelpers.superPropertyGetCall((_this, B), "foo", _this, 1, []);
    return _this;
  }
  babelHelpers.inherits(B, _A);
  return babelHelpers.createClass(B);
}(A);
