function* gen(x) {
  console.log('start')
  z = yield x
  console.log(z)
  const y = yield x * 2
  console.log(y) // next 函数可以接受参数，作为上个阶段异步任务的返回结果
  return y + 2
}

const g = gen(1)
console.log( g.next(5) )   
console.log( g.next(8) ) 
console.log( g.next(3) )

// output
/*
--- g.next(5)
start
{ value: 1, done: false } 
--- g.next(8)
8
{ value: 2, done: false }
--- g.next(3)
3
{ value: 5, done: true }
*/

/* Generator next带参数有什么用

在 JavaScript 中，Generator 函数的 next() 方法可以接受一个参数，这个参数的作用是向 Generator 函数内部传递值。这样可以在 Generator 函数内部使用 yield 关键字来接收这个值，并且可以对生成器的行为产生影响。

主要的用途有两个：

向 Generator 函数内部传递值：当调用 next() 方法并传入参数时，这个参数会作为上一个 yield 表达式的返回值，也就是说它会被赋给 Generator 函数内部的变量。这样可以在迭代器的不同阶段向 Generator 函数内部传递值。
控制 Generator 函数的执行流程：通过传递不同的参数，可以影响 Generator 函数内部的逻辑，从而控制其执行流程。Generator 函数可以根据传入的参数来进行不同的操作或者决策。
下面是一个简单的例子，演示了如何使用 next() 方法传递值并影响 Generator 函数的行为：

`javascript`
function* generatorFunction() {
  let x = yield 'First yield'; // 等待外部传入的值，并赋给 x
  console.log('Received value:', x);
  let y = yield 'Second yield'; // 等待外部传入的值，并赋给 y
  console.log('Received value:', y);
  return 'Generator finished';
}

const generator = generatorFunction();

console.log(generator.next()); // { value: 'First yield', done: false }

console.log(generator.next(10)); // 输出：Received value: 10，{ value: 'Second yield', done: false }

console.log(generator.next(20)); // 输出：Received value: 20，{ value: 'Generator finished', done: true }

在这个例子中，next(10) 方法的参数 10 被传递给了第一个 yield 表达式，然后 next(20) 方法的参数 20 被传递给了第二个 yield 表达式。
*/