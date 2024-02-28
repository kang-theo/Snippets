const arr = ['1', '2', '3'];

const result_error = arr.map(parseInt);
console.log(result_error); // [1, NaN, NaN]

const result = arr.map(num => parseInt(num, 10));
console.log(result); // [1, 2, 3]
//  parseInt('1', 10)  1
//  parseInt('2', 10)  2
//  parseInt('3', 10)  3
