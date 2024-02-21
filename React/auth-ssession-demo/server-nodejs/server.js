// server.js

const express = require("express");
const bodyParser = require("body-parser");
const session = require("express-session");
const bcrypt = require("bcrypt");

const app = express();
const PORT = process.env.PORT || 5001;

// 中间件
app.use(bodyParser.json());
app.use(
  session({
    secret: "secret-key", // 应该是一个安全的密钥
    resave: false,
    saveUninitialized: false,
  })
);

// 模拟数据库中的用户数据
const users = [
  {
    id: 1,
    username: "user1",
    password: "$2b$10$zmt9cJMXZPMD0oCj/SB2q.63IiU5zztn08kWV9ENMFbuNRcKkYO6G",
  }, // 密码是123456
];

// 用户登录
app.post("/login", (req, res) => {
  const { username, password } = req.body;
  const user = users.find((u) => u.username === username);
  if (!user) {
    return res.status(401).json({ error: "用户不存在" });
  }
  if (!bcrypt.compareSync(password, user.password)) {
    return res.status(401).json({ error: "密码错误" });
  }
  req.session.user = user;
  res.json(user);
});

// 用户注销
app.post("/logout", (req, res) => {
  req.session.destroy();
  res.sendStatus(200);
});

// 获取当前登录用户信息
app.get("/user", (req, res) => {
  const user = req.session.user;
  if (!user) {
    return res.status(401).json({ error: "未登录" });
  }
  res.json(user);
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
