class Calculator {
  constructor(value) {
    this.value = value;
  }

  add(num) {
    this.value += num;
    return this; // 返回对象本身，以便链式调用
  }

  subtract(num) {
    this.value -= num;
    return this; // 返回对象本身，以便链式调用
  }

  multiply(num) {
    this.value *= num;
    return this; // 返回对象本身，以便链式调用
  }

  divide(num) {
    this.value /= num;
    return this; // 返回对象本身，以便链式调用
  }
}

const calc = new Calculator(10);
const result = calc.add(5).multiply(2).subtract(3).divide(2).value;
console.log(result); // 输出结果为 9
