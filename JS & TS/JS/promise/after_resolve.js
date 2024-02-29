new Promise((resolve, reject) => {
  console.log("Start of Promise executor");
  resolve("Resolved value");
  /*
    在 Promise 中，调用 resolve() 或 reject() 方法后，Promise 的状态会立即改变，
    但是后续的代码仍然会继续执行，直到当前的微任务队列（Promise 的回调函数）执行完毕。
    下面通过延时，让微任务队列中的 Promise 回调函数先执行，可见后面的代码就不会被执行了。
  */
  delay(1000);
  console.log("After resolve");
})
  .then((value) => {
    console.log("Promise is resolved:", value);
  })
  .catch((error) => {
    console.error("Promise is rejected:", error);
  });

// 如果不需要执行，需要在 resolve 语句前加上 return