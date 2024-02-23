import React, { useState, useEffect } from "react";

function MyComponent() {
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    // 模拟一个可能会发生错误的操作
    try {
      // 这里可以是可能会抛出错误的代码
      throw new Error("Something went wrong");
    } catch (error) {
      // 捕获错误并设置状态为 true
      setHasError(true);
      console.error("Error caught in MyComponent:", error);
    }
  }, []); // 由于只需要在组件挂载时执行一次，因此传递空数组作为依赖项

  if (hasError) {
    // 如果发生错误，则渲染备用UI
    return <h1>Something went wrong in MyComponent.</h1>;
  }

  // 如果没有错误，则正常渲染组件内容
  return <div>MyComponent Content</div>;
}

export default MyComponent;
