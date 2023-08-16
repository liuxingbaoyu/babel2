import Benchmark from "benchmark";
//import baseline from "@babel-baseline/traverse";
import current from "@babel/traverse";
import parser from "@babel/parser";
import { report } from "../../util.mjs";
import { readFileSync } from "fs";
//import { serialize, deserialize } from "v8";

const suite = new Benchmark.Suite();

const content = readFileSync(new URL("./jquery-3.6.txt", import.meta.url), {
  encoding: "utf-8",
});

const inputs = [1, 4].map(length => ({
  tag: length,
  get body() {
    if (!this._cache) this._cache = parser.parse(content.repeat(length));
    return this._cache;
    // return deserialize(serialize(this._cache));
  },
}));

/**
 *
 * @param {*} name
 * @param {*} implementation
 * @param {import("@babel/traverse").TraverseOptions} options
 */
function benchCases(name, implementation, options) {
  for (const input of inputs) {
    suite.add(`${name} ${input.tag} traverse all node`, () => {
      implementation.cache.clear();
      implementation(input.body, options);
    });
  }
}

// benchCases("current with remove `VariableDeclarator`", current.default, {
//   VariableDeclarator(path) {
//     path.remove();
//   },
// });

// benchCases("current with remove `ExpressionStatement`", current.default, {
//   ExpressionStatement(path) {
//     path.remove();
//   },
// });

benchCases("current with empty enter and exit", current.default, {
  enter() {},
  exit() {},
});

// benchCases("baseline with remove `VariableDeclarator`", baseline.default, {
//   VariableDeclarator(path) {
//     path.remove();
//   },
// });

// benchCases("baseline with remove `ExpressionStatement`", baseline.default, {
//   ExpressionStatement(path) {
//     path.remove();
//   },
// });

// benchCases("baseline with empty enter and exit", baseline.default, {
//   enter() {},
//   exit() {},
// });

suite.on("cycle", report).run();
