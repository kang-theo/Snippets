let foo:any = 123;
console.log(foo.msg); // 符合TS的语法, return undefined if type mismatches
let a_value1: unknown = foo; // OK
let a_value2: any = foo; // OK
let a_value3: string = foo; // OK

let bar: unknown = 222; // OK
console.log(1);
console.log(bar.msg); // Error
let k_value1: unknown = bar; // OK
let k_value2: any = bar; // OK
let k_value3: string = bar; // Error
