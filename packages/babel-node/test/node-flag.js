import getV8Flags from "v8flags";

getV8Flags(async function (err, v8Flags) {
  const allowedNodeEnvironmentFlags = process.allowedNodeEnvironmentFlags;
  console.log(
    JSON.stringify(allowedNodeEnvironmentFlags),
    JSON.stringify(v8Flags),
  );
  expect(() => {
    for (const v of v8Flags) {
      if (!allowedNodeEnvironmentFlags.has(v)) {
        throw Error(
          v +
            JSON.stringify(v8Flags) +
            "\n" +
            JSON.stringify(allowedNodeEnvironmentFlags),
        );
      }
    }
  }).not.toThrow();
});
