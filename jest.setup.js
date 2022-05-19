const v8 = require("v8");
const os = require("os");

module.exports = async function (globalConfig, projectConfig) {
  //projectConfig.cache = false;

  console.log(globalConfig.testPathPattern);
  console.log(projectConfig.cache);

  setInterval(() => {
    console.log(
      `#debug: pid=${process.pid}, rss=${
        process.memoryUsage().rss / 1024 / 1024
      }, totalRam=${os.totalmem() / 1024 / 1024}, freeRam=${
        os.freemem() / 1024 / 1024
      }`
    );
  }, 500).unref();
  // const aaa = setInterval(() => {
  //   if (process.memoryUsage().rss / 1024 / 1024 > 500) {
  //     //clearInterval(aaa);
  //     //v8.writeHeapSnapshot();
  //   }
  // }, 10000);
};
