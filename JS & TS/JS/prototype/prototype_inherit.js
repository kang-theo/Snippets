function Animal(name) {
  this.name = name;
}

Animal.prototype.sayHello = function () {
  console.log("Hello, I'm " + this.name);
};

function Cat(name, color) {
  Animal.call(this, name);
  this.color = color;
}

Cat.prototype = new Animal();
Cat.prototype.constructor = Cat;

var fluffy = new Cat("Fluffy", "white");
fluffy.sayHello(); // Output: Hello, I'm Fluffy
