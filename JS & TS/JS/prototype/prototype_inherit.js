function Animal(name) {
  this.name = name;
}

// prototype is a property of constructor functions.
Animal.prototype.sayHello = function () {
  console.log("Hello, I'm " + this.name);
};

// __proto__ is a property of all objects in JavaScript (except null).
var cat = new Animal("Whiskers");
console.log(cat.__proto__ === Animal.prototype); // true

function Cat(name, color) {
  Animal.call(this, name);
  this.color = color;
}

Cat.prototype = new Animal();
Cat.prototype.constructor = Cat;

var fluffy = new Cat("Fluffy", "white");
fluffy.sayHello(); // Output: Hello, I'm Fluffy
