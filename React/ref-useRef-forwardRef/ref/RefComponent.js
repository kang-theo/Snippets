import React, { Component } from "react";

class RefComponent extends Component {
  constructor(props) {
    super(props);
    // 创建一个 ref 对象并将其赋值给实例属性
    this.inputRef = React.createRef();
  }

  componentDidMount() {
    // 在组件挂载后，将焦点设置到输入框
    this.inputRef.current.focus();
  }

  render() {
    return (
      <div>
        {/* 使用 ref 属性将 inputRef 绑定到 input 元素 */}
        <input type="text" ref={this.inputRef} />
        <button onClick={() => this.inputRef.current.focus()}>
          Focus Input
        </button>
      </div>
    );
  }
}

export default RefComponent;
