import React, { useRef, useEffect } from "react";

const UseRefComponent = () => {
  // 创建一个 ref 对象
  const inputRef = useRef(null);

  useEffect(() => {
    // 在组件挂载后，将焦点设置到输入框
    inputRef.current.focus();
  }, []);

  return (
    <div>
      {/* 使用 ref 属性将 inputRef 绑定到 input 元素 */}
      <input type="text" ref={inputRef} />
      <button onClick={() => inputRef.current.focus()}>Focus Input</button>
    </div>
  );
};

export default UseRefComponent;
