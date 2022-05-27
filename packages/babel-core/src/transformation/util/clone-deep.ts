//https://github.com/babel/babel/pull/14583#discussion_r882828856
function deepClone(value, cache) {
  if (value !== null) {
    if (cache.has(value)) return cache.get(value);
    let cloned;
    if (Array.isArray(value)) {
      cloned = new Array(value.length);
      for (let i = 0; i < value.length; i++) {
        cloned[i] =
          typeof value[i] !== "object" ? value[i] : deepClone(value[i], cache);
      }
    } else {
      cloned = {};
      const keys = Object.keys(value);
      for (let i = 0; i < keys.length; i++) {
        const key = keys[i];
        cloned[key] =
          typeof value[key] !== "object"
            ? value[key]
            : deepClone(value[key], cache);
      }
    }
    cache.set(value, cloned);
    return cloned;
  }
  return value;
}

export default function (value) {
  if (typeof value !== "object") return value;
  return deepClone(value, new Map());
}
