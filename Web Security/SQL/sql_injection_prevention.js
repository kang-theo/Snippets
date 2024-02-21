// To prevent SQL injection, you should use parameterized queries or prepared statements
const mysql = require("mysql");
const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "password",
  database: "mydatabase",
});

connection.connect();

const username = req.body.username;
const password = req.body.password;

const query = "SELECT * FROM users WHERE username=? AND password=?";
const values = [username, password];
/*
There is no need for additional sanitation of the username and password parameters before passing them to the connection.query() function.
When you provide the array values containing the username and password, the MySQL driver internally handles the parameterization process, 
  ensuring that the user input is properly escaped and sanitized before it is incorporated into the query.
However, it's essential to ensure that the username and password variables themselves are properly validated and sanitized before they are used in the query construction. 
  For example, you might want to trim leading and trailing whitespaces from the username and password inputs to prevent unintended behavior. 
  Additionally, you should consider validating the inputs against any specific requirements (e.g., minimum length, character restrictions) to ensure data integrity and application functionality.
*/
connection.query(query, values, (error, results, fields) => {
  if (error) throw error;
  console.log(results);
});

connection.end();
