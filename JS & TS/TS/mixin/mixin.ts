// 定义一个可 mixin 的类
class Greeter {
  // 1. mixin后，编译器并不知道 Greeter 中含有name 属性，使用 this: Person 告诉 TypeScript this 的类型为 Person
  greet(this: Person) {
    console.log("Hello, " + this.name);
  }
}

// 定义一个 mixin 函数，用于将 mixins 应用到目标类上
function applyMixins(derivedCtor: any, baseCtors: any[]) {
  baseCtors.forEach((baseCtor) => {
    Object.getOwnPropertyNames(baseCtor.prototype).forEach((name) => {
      derivedCtor.prototype[name] = baseCtor.prototype[name];
    });
  });
}

/*
  2. TypeScript 编译器认为 Person 类上不存在 greet 方法。这可能是因为 TypeScript 不知道 greet 方法已经被混入到了 Person 类中。
  为了解决这个问题，可以创建一个接口来描述 Person 类的形状，可以使用类型断言来告诉 TypeScript Person 类确实包含 greet 方法。
*/
// 将 Greeter 类的形状合并到 Person 接口中
interface Person extends Greeter {}

// 定义一个目标类，并将 mixin 应用到目标类上
class Person {
  name: string;
  constructor(name: string) {
    this.name = name;
  }
}

applyMixins(Person, [Greeter]);

// 创建一个 Person 实例，并调用 mixin 方法
let person = new Person("Alice");
person.greet(); // 输出: Hello, Alice
