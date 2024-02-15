import { declarePreset } from "@babel/helper-plugin-utils";
import transformFlowStripTypes from "@babel/plugin-transform-flow-strip-types";
import normalizeOptions from "./normalize-options.ts";
import { createRequire } from "module";

const require = createRequire(import.meta.url);

export default declarePreset((api, opts) => {
  api.assertVersion(
    process.env.BABEL_8_BREAKING && process.env.IS_PUBLISH
      ? PACKAGE_JSON.version
      : 7,
  );
  const {
    all,
    allowDeclareFields,
    ignoreExtensions = false,
    useHermesParser = false,
  } = normalizeOptions(opts);

  const plugins = [[transformFlowStripTypes, { all, allowDeclareFields }]];

  if (useHermesParser) {
    plugins.unshift(require("babel-plugin-syntax-hermes-parser"));
  }

  // TODO: In Babel 7, ignoreExtensions is always true.
  // Allow setting it to false in the next minor.
  if (process.env.BABEL_8_BREAKING ? ignoreExtensions : true) {
    return { plugins };
  }

  if (process.env.BABEL_8_BREAKING) {
    return {
      overrides: [
        {
          test: filename => filename == null || !/\.tsx?$/.test(filename),
          plugins,
        },
      ],
    };
  } else {
    // unreachable
  }
});
