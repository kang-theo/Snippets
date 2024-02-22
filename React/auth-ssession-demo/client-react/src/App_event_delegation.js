/**
 * SyntheticEvent is a cross-browser wrapper around the browser's native event. 
 * It's a JavaScript event object that wraps the native browser event and has the same interface as the native event. 
 * React uses SyntheticEvent to normalize event handling across different browsers and provide additional functionalities.
 */
import React from "react";

class ParentComponent extends React.Component {
  handleClick = (event) => {
    // 检查点击的是否为子组件
    if (event.target.classList.contains("child")) {
      // 输出点击的子组件的文本内容
      console.log("你点击了按钮:", event.target.textContent);
    }
  };

  render() {
    return (
      <div onClick={this.handleClick}>
        <ChildComponent>Button 1</ChildComponent>
        <ChildComponent>Button 2</ChildComponent>
        <ChildComponent>Button 3</ChildComponent>
      </div>
    );
  }
}

const ChildComponent = ({ children }) => {
  return <button className="child">{children}</button>;
};

export default ParentComponent;
