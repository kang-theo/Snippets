import React, { useEffect, useState } from "react";

const FunctionComponent = () => {
  const [count, setCount] = useState(0);

  // 模拟 componentDidMount 和 componentDidUpdate
  useEffect(() => {
    console.log("Component mounted or updated");
    // 在组件挂载或更新后进行一些操作，比如发起网络请求、订阅事件等
    return () => {
      console.log("Component will unmount");
      // 在组件卸载前进行一些清理操作，比如取消网络请求、清除定时器等
    };
  });

  // 模拟 componentWillReceiveProps
  useEffect(() => {
    console.log("Component will receive props");
    // 在组件即将接收新的 props 时进行一些操作
  }, [count]); // 依赖项为 count，只在 count 发生变化时执行

  // 模拟 componentWillUnmount
  useEffect(() => {
    return () => {
      console.log("Component will unmount");
      // 在组件卸载前进行一些清理操作，比如取消网络请求、清除定时器等
    };
  }, []);

  console.log("Component rendered");

  return (
    <div>
      {/* 组件的 JSX 结构 */}
      <button onClick={() => setCount(count + 1)}>Increase Count</button>
      Function Component: {count}
    </div>
  );
};

export default FunctionComponent;
