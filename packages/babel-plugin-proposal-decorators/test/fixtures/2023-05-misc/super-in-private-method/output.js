var _Bar;
let _initProto, _call_x;
const dec = () => {};
class Foo extends (_Bar = Bar) {
  static {
    [_call_x, _initProto] = babelHelpers.applyDecs2305(this, [[dec, 2, "x", function () {
      return babelHelpers.superPropertyGetCall(Foo, "foo", this, 0, []);
    }]], [], 0, _ => #x in _, _Bar).e;
  }
  constructor(...args) {
    super(...args);
    _initProto(this);
  }
  #x = _call_x;
}
