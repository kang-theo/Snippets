// (async () => {
//   const fetchData = () => {
//     return new Promise((resolve, reject) => {
//       setTimeout(() => {
//         resolve("fetch data is me");
//       }, 1000);
//     });
//   };

//   const [err, data] = await fetchData()
//     .then((data) => [null, data])
//     .catch((err) => [err, null]);
//   console.log("err", err);
//   console.log("data", data);
//   // err null
//   // data fetch data is me
// })();

(async () => {
  const fetchData = () => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve("fetch data is me");
      }, 1000);
    });
  };

  // 抽离成公共方法
  const awaitWrap = (promise) => {
    return promise.then((data) => [null, data]).catch((err) => [err, null]);
  };

  const [err, data] = await awaitWrap(fetchData());
  console.log("err", err);
  console.log("data", data);
  // err null
  // data fetch data is me
})();
