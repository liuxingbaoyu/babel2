var _init_a, _init_a2, _init_computedKey, _computedKey, _init_computedKey2, _init_computedKey3, _computedKey2, _init_computedKey4, _init_computedKey5, _computedKey3, _init_computedKey6, _computedKey4, _init_computedKey7, _class;
const logs = [];
const dec = (value, context) => {
  logs.push(context.name);
};
const f = () => {
  logs.push("computing f");
  return {
    [Symbol.toPrimitive]: () => "f()"
  };
};
_computedKey = "c";
_computedKey2 = 1;
_computedKey3 = 3n;
_computedKey4 = f();
class Foo {}
_class = Foo;
[_init_a, _init_a2, _init_computedKey, _init_computedKey2, _init_computedKey3, _init_computedKey4, _init_computedKey5, _init_computedKey6, _init_computedKey7] = babelHelpers.applyDecs(_class, [[dec, 5, "a"], [dec, 5, "a", function () {
  return babelHelpers.classStaticPrivateFieldSpecGet(this, _class, _a);
}, function (value) {
  babelHelpers.classStaticPrivateFieldSpecSet(this, _class, _a, value);
}], [dec, 5, "b"], [dec, 5, _computedKey], [dec, 5, 0], [dec, 5, _computedKey2], [dec, 5, 2n], [dec, 5, _computedKey3], [dec, 5, _computedKey4]], []);
babelHelpers.defineProperty(Foo, "a", _init_a(_class));
var _a = {
  writable: true,
  value: _init_a2(_class)
};
babelHelpers.defineProperty(Foo, "b", _init_computedKey(_class));
babelHelpers.defineProperty(Foo, _computedKey, _init_computedKey2(_class));
babelHelpers.defineProperty(Foo, 0, _init_computedKey3(_class));
babelHelpers.defineProperty(Foo, _computedKey2, _init_computedKey4(_class));
babelHelpers.defineProperty(Foo, 2n, _init_computedKey5(_class));
babelHelpers.defineProperty(Foo, _computedKey3, _init_computedKey6(_class));
babelHelpers.defineProperty(Foo, _computedKey4, _init_computedKey7(_class));
expect(logs).toStrictEqual(["computing f", "a", "#a", "b", "c", "0", "1", "2", "3", "f()"]);
