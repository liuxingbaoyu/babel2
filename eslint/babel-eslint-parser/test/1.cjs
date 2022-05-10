const worker_threads = require("worker_threads");

//console.log("worker")
worker_threads.parentPort.addListener("message", async ({ signal, port }) => {
  port.postMessage("");
  port.close();
  Atomics.store(signal, 0, 1);
  Atomics.notify(signal, 0);
  //worker_threads.parentPort.close()
  //setTimeout(()=>{worker_threads.parentPort.close()},300)
});
