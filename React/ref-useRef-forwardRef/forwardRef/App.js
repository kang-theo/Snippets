import React, { useRef } from "react";
import ForwardRefComponent from "./ForwardRefComponent";

const App = () => {
  // 创建一个 ref 对象
  const inputRef = useRef(null);

  // 在组件挂载后，调用 input 元素的 focus 方法
  const handleFocusButtonClick = () => {
    inputRef.current.focus();
  };

  return (
    <div>
      {/* 渲染 ForwardRefComponent 组件，并将 inputRef 作为 ref 参数传递给它 */}
      {/* 这里将 ref 属性传递给了 ForwardRefComponent 组件 */}
      <ForwardRefComponent ref={inputRef} />

      {/* 渲染一个按钮，点击时调用 handleFocusButtonClick 函数 */}
      <button onClick={handleFocusButtonClick}>Focus Input</button>
    </div>
  );
};

export default App;
