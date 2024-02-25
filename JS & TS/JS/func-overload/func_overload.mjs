/* 
  JS do not support function overload by default; jQuery support it based on ES5 but do not support default parameters and types;
  To support function overload in ES6+, we need to create a new function to support it;
  It does not create functions with the same name, but add different functions into the a Map object.
*/
import createOverload from "./overload.mjs";

// support default parameters and types;
const getUsers = createOverload();

getUsers.addImpl(() => {
  console.log("查询所有用户");
});

const searchPage = (page, size = 10) => {
  console.log("按照页码和数量查询用户");
};
getUsers.addImpl("number", searchPage);
getUsers.addImpl("number", "number", searchPage);

getUsers.addImpl("string", (name) => {
  console.log("按照姓名查询用户");
});

getUsers.addImpl("string", "string", (name, sex) => {
  console.log("按照姓名和性别查询用户");
});

// test: node func_overload.mjs
getUsers(1);
getUsers();
getUsers("a_name");
getUsers("b_name", "male");
