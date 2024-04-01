(async () => {
  // resolve
  function fetchDataSuccess() {
    return new Promise((resolve, _reject) => {
      setTimeout(() => {
        resolve("success");
      }, 1000);
    });
  }

  let [err, data] = await fetchDataSuccess()
    .then((data) => [null, data])
    .catch((err) => [err, null]);
  console.log("err", err);
  console.log("data", data);

  // reject
  const fetchDataFailure = () => {
    return new Promise((_resolve, reject) => {
      setTimeout(() => {
        reject("failure");
      }, 1000);
    });
  };

  [err, data] = await fetchDataFailure()
    .then((data) => [null, data])
    .catch((err) => [err, null]);
  console.log("err", err);
  console.log("data", data);
})();
