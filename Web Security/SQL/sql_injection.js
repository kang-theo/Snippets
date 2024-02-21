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
// if the username input is ' OR '1'='1', and the password input is anything, the resulting query will select all users instead of authenticating against a specific username and password.
// SELECT * FROM users WHERE username='admin' OR '1'='1' -- AND password='anything'
const query = `SELECT * FROM users WHERE username='${username}' AND password='${password}'`;

connection.query(query, (error, results, fields) => {
  if (error) throw error;
  console.log(results);
});

connection.end();
