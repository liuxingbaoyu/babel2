function foo() {
  var _ret,
    _loop = function () {
      switch (2) {
        case 0:
          {
            if (true) {
              return {
                v: void 0
              };
            }
            var stuff = new Map();
            var data = 0;
            stuff.forEach(function () {
              var d = data;
            });
            break;
          }
      }
    };
  while (true) {
    _ret = _loop();
    if (_ret) return _ret.v;
  }
}
