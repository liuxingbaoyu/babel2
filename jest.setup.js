/* eslint-disable*/


// const v8 = require("v8");

const os = require("os");
const child_process = require("child_process");

module.exports = function (globalConfig, projectConfig) {
  //projectConfig.cache = false;
  console.log(globalConfig?.detectOpenHandles);
  console.log(globalConfig?.testPathPattern);
  console.log(projectConfig?.cache);


  return;
  setInterval(() => {
    console.log(
      `#debug-memory: pid=${process.pid}, rss=${
        process.memoryUsage().rss / 1024 / 1024
      }, totalRam=${os.totalmem() / 1024 / 1024}, freeRam=${
        os.freemem() / 1024 / 1024
      }`
    );
  }, 500).unref();
  if (os.platform() == "linux") {
    setInterval(() => {
      try {
        child_process.exec("df -h", function (err, stdout, stderr) {
          console.log(
            `#debug-disk: err=${err}, stdout=${stdout}, stderr=${stderr}`
          );
        });
      } catch (error) {
        console.error(error);
      }
    }, 5000).unref();
  }

  // const aaa = setInterval(() => {
  //   if (process.memoryUsage().rss / 1024 / 1024 > 500) {
  //     //clearInterval(aaa);
  //     //v8.writeHeapSnapshot();
  //   }
  // }, 10000);
};
