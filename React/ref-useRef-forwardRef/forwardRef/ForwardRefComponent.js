import React, { forwardRef, useImperativeHandle } from "react";

const ForwardRefComponent = forwardRef((props, ref) => {
  // 使用 useImperativeHandle 定义 ref 的暴露接口
  useImperativeHandle(ref, () => ({
    // 将 input 元素的 focus 方法暴露给外部
    focus: () => {
      ref.current.focus();
    },
  }));

  return (
    <div>
      {/* 将 ref 直接绑定到 input 元素 */}
      <input type="text" ref={ref} />
    </div>
  );
});

export default ForwardRefComponent;
