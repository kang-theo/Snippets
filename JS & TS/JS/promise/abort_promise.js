const readline = require("readline");

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

// 示例1, do not catch error, and it will go to the next catch in the chain
const example1 = () => {
  Promise.resolve()
    .then(() => {
      console.log("Step 1");
      throw new Error("Error in Step 1");
    })
    .then(() => {
      console.log("Step 2"); // 这一步不会被执行
    })
    .then(() => {
      console.log("Step 3"); // 这一步不会被执行
    });
};

// 示例2, catch error in the end of the promise chain
const example2 = () => {
  Promise.resolve()
    .then(() => {
      console.log("Step 1");
      throw new Error("Error in Step 1");
    })
    .then(() => {
      console.log("Step 2"); // 这一步不会被执行
    })
    .then(() => {
      console.log("Step 3"); // 这一步不会被执行
    })
    .catch(() => {
      console.log("Step 4, Error catch");
    });
};

// 示例3, catch error and continue
const example3 = () => {
  Promise.resolve()
    .then(() => {
      console.log("Step 1");
      throw new Error("Error in Step 1");
    })
    .catch((err) => {
      console.error("Caught error:", err.message); // 捕获错误并输出错误信息, 链路中对错误进行了捕获，后面的then函数还是会继续执行。
    })
    .then(() => {
      console.log("Step 2"); // 这一步会被执行
    })
    .then(() => {
      console.log("Step 3"); // 这一步也会被执行
    });
};

// 示例4, return a rejected promise
const example4 = () => {
  Promise.resolve()
    .then(() => {
      console.log("Step 1");
      throw new Error("Error in Step 1");
    })
    .catch((err) => {
      console.error("Caught error:", err.message); // 这里会打印错误信息
      // 返回一个 rejected 的 Promise，中断链
      return Promise.reject(err); // there is no catch for this rejected promise, so it will abort the chain and go to the next catch
    })
    .then(() => {
      console.log("Step 2"); // 这一步不会被执行
    });
};

// 示例5, catch error globally
const example5 = () => {
  Promise.resolve()
    .then(() => {
      console.log("Step 1");
      throw new Error("Error in Step 1");
    })
    .then(() => {
      console.log("Step 2"); // 这一步不会被执行
    });

  process.on("unhandledRejection", (err) => {
    console.error("Unhandled rejection error:", err.message); // 这里会打印错误信息
  });
};

// 选择要执行的示例
rl.question(
  `请选择要执行的示例 (1-5):\n1. do not catch error\n2. catch error in the end of the chain\n3. catch error and continue\n4. catch error and return a rejected promise\n5. catch error globally\n`,
  (answer) => {
    switch (answer.trim()) {
      case "1":
        example1();
        break;
      case "2":
        example2();
        break;
      case "3":
        example3();
        break;
      case "4":
        example4();
        break;
      case "5":
        example5();
        break;
      default:
        console.log("请选择正确的示例编号。");
    }
    rl.close();
  }
);
