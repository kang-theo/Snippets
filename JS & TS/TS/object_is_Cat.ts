interface Cat {
  meow(): void;
}

// object is Cat to ensure the return value is boolean
function isCat(object: any): object is Cat {
  return typeof object.meow === "function";
}

function callCatAction(object: any) {
  if (isCat(object)) {
    object.meow(); // 在这里，TypeScript 理解 object 是 Cat 类型
  } else {
    console.log("Not a cat!");
  }
}

const myCat = {
  meow: () => console.log("Meow!"),
};

callCatAction(myCat); // 输出 "Meow!"
