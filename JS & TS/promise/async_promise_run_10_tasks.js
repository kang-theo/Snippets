(async () => {
  const sleep = async (time) => {
    return new Promise((resolve, reject) => {
      setTimeout(_ => { // _ is not used
        resolve(); // fullfillment
      }, time);
    });
  }

  const task = async (i) => {
    return new Promise(async (resolve, reject) => {
      console.log(`now is task ${i}`);
      await sleep(500);
      i++;
      resolve(i);
    });
  }


  // await has to execute in a async function, using IIFE here
  let param = 0;
  for(let i=0; i<=4; i++){
    param = await task(param);
    // console.log(typeof(param));
  }
})();