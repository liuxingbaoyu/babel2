var _initClass, _Bar, _Bar2;
const dec = () => {};
const Foo = ((_Bar2 = class Bar {
  constructor() {
    babelHelpers.defineProperty(this, "bar", new _Bar());
  }
}, [_Bar, _initClass] = babelHelpers.applyDecs(_Bar2, [], [dec]), _initClass()), _Bar);
const foo = new Foo();
