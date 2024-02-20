// npm install ts-mixer
import { mixin } from "ts-mixer";

// 定义一个可 mixin 的类
class Greeter {
  // 1. mixin后，编译器并不知道 Greeter 中含有name 属性，使用 this: Person 告诉 TypeScript this 的类型为 Person
  greet(this: Person) {
    console.log("Hello, " + this.name);
  }
}

// 将 Greeter 类的形状合并到 Person 接口中
interface Person extends Greeter {}

// 定义一个目标类，并将 mixin 应用到目标类上
class Person {
  name: string;
  constructor(name: string) {
    this.name = name;
  }
}

// 使用 mixin 函数将 Greeter mixin 应用到 Person 类上
mixin(Person, Greeter);

// 创建一个 Person 实例，并调用 mixin 方法
let person = new Person("Alice");
person.greet(); // 输出: Hello, Alice
