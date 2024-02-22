// server.js

const express = require("express");
const bodyParser = require("body-parser");
const session = require("express-session");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const app = express();
const PORT = process.env.PORT || 5000;
const secretKey = "secret-key"; // 用于签署 JWT 的密钥，应该是一个安全的密钥

app.use(bodyParser.json());

// 模拟数据库中的用户数据
const users = [
  {
    id: 1,
    username: "user1",
    password: "$2b$10$zmt9cJMXZPMD0oCj/SB2q.63IiU5zztn08kWV9ENMFbuNRcKkYO6G",
  }, // 密码是123456
];

// 用户登录，生成并返回 JWT
app.post("/login", (req, res) => {
  const { username, password } = req.body;
  const user = users.find((u) => u.username === username);
  if (!user) {
    return res.status(401).json({ error: "用户不存在" });
  }
  if (!bcrypt.compareSync(password, user.password)) {
    return res.status(401).json({ error: "密码错误" });
  }
  const token = jwt.sign({ userId: user.id }, secretKey, { expiresIn: "1h" }); // 生成 JWT，有效期 1 小时
  res.json({ token });
});

// 保护需要身份验证的路由
app.get("/user", authenticateToken, (req, res) => {
  const user = users.find((u) => u.id === req.userId);
  if (!user) {
    return res.status(401).json({ error: "未找到用户信息" });
  }
  res.json(user);
});

// 验证 JWT 的中间件
function authenticateToken(req, res, next) {
  const token = req.headers["authorization"];
  if (!token) {
    return res.status(401).json({ error: "未提供身份验证令牌" });
  }
  jwt.verify(token, secretKey, (err, decoded) => {
    if (err) {
      return res.status(403).json({ error: "身份验证失败" });
    }
    req.userId = decoded.userId;
    next();
  });
}

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
