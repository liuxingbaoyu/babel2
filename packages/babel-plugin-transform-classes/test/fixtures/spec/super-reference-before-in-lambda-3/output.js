var Foo = /*#__PURE__*/function (_Bar) {
  "use strict";

  function Foo() {
    var _this;
    babelHelpers.classCallCheck(this, Foo);
    var t = () => babelHelpers.superPropertyGetCall((babelHelpers.assertThisInitialized(_this), Foo), "test", babelHelpers.assertThisInitialized(_this), 1, []);
    _this = babelHelpers.callSuper(this, Foo);
    t();
    return _this;
  }
  babelHelpers.inherits(Foo, _Bar);
  return babelHelpers.createClass(Foo);
}(Bar);
