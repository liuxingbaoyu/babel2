(function () {
  var _ret,
    _loop = function (i) {
      fns.push(function () {
        return i;
      });
      return {
        v: void 0
      };
    };
  for (var i in nums) {
    _ret = _loop(i);
    if (_ret) return _ret.v;
  }
})();
