// App.js

import React, { useState, useEffect } from "react";
import LoginForm from "./components/LoginForm";
import Dashboard from "./components/Dashboard";
import axios from "axios";

function App() {
  const [user, setUser] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      // 如果本地存储中有 token，则验证 token
      axios
        .get("/user", { headers: { Authorization: token } })
        .then((response) => setUser(response.data))
        .catch((err) => console.error("身份验证失败:", err));
    }
  }, []);

  const handleLogin = (username, password) => {
    axios
      .post("/login", { username, password })
      .then((response) => {
        const token = response.data.token;
        localStorage.setItem("token", token); // 将 token 存储到本地
        setUser({ username });
      })
      .catch((err) => setError(err.response.data.error));
  };

  const handleLogout = () => {
    localStorage.removeItem("token"); // 移除本地存储中的 token
    setUser(null);
  };

  return (
    <div className="App">
      {user ? (
        <Dashboard user={user} onLogout={handleLogout} />
      ) : (
        <LoginForm onLogin={handleLogin} error={error} />
      )}
    </div>
  );
}

export default App;
