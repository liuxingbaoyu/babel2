module.exports = async function (globalConfig, projectConfig) {
  console.log(globalConfig.testPathPattern);
  console.log(projectConfig.cache);

  setInterval(() => {
    console.log(
      "#memory",
      process.pid,
      process.memoryUsage().rss / 1024 / 1024
    );
  }, 500).unref();
};
