// App.js

import React, { useState } from "react";
import LoginForm from "./components/LoginForm";
import Dashboard from "./components/Dashboard";

function App() {
  const [user, setUser] = useState(null);

  const handleLogin = (userData) => {
    // 发送登录请求到后端，验证用户身份
    // 如果验证通过，设置用户数据并保存会话状态
    setUser(userData);
  };

  const handleLogout = () => {
    // 发送注销请求到后端，销毁会话状态
    setUser(null);
  };

  return (
    <div className="App">
      {user ? (
        <Dashboard user={user} onLogout={handleLogout} />
      ) : (
        <LoginForm onLogin={handleLogin} />
      )}
    </div>
  );
}

export default App;
