import getV8Flags from "v8flags";

getV8Flags(async function (err, v8Flags) {
  for (const v of v8Flags) {
    if (!process.allowedNodeEnvironmentFlags.has(v)) {
      throw Error(
        v,
        JSON.stringify(v8Flags) +
          "\n" +
          JSON.stringify(process.allowedNodeEnvironmentFlags),
      );
    }
  }
});
