/*
函数声明为返回 void 类型表示该函数不会返回任何值。
这意味着它可以执行一些操作，但不会产生任何结果。这样的函数通常用于执行一些操作而不需要返回值的情况。
*/

// 函数返回 void 类型，表示不返回任何值
function greet(name: string): void {
  console.log(`Hello, ${name}!`);
}

// 调用函数
greet("Alice");

/*
函数声明为返回 never 类型表示该函数永远不会正常返回。
这意味着该函数要么无法终止（比如一个无限循环），要么会抛出异常，导致程序中断。通常情况下，never 类型的函数用于表示永远不会执行完整个函数体的情况，
例如抛出异常、无限循环或是在函数体内调用了 throw 语句。
*/

// 函数返回 never 类型，表示函数永远不会正常返回
function throwError(message: string): never {
    throw new Error(message);
}

// 调用函数，由于函数会抛出异常，所以后续代码不会执行
throwError("An error occurred!");
console.log("This line will not be reached."); // 这一行不会被执行
