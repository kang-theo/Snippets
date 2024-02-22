import React, { Component } from "react";

class ClassComponent extends Component {
  // 组件挂载阶段
  componentDidMount() {
    console.log("Component mounted");
    // 在组件挂载后进行一些初始化操作，比如发起网络请求、订阅事件等
  }

  // 组件更新阶段
  componentDidUpdate(prevProps, prevState) {
    console.log("Component updated");
    // 在组件更新后进行一些操作，比如更新DOM、处理状态变化等
  }

  // 组件卸载阶段
  componentWillUnmount() {
    console.log("Component will unmount");
    // 在组件卸载前进行一些清理操作，比如取消网络请求、清除定时器等
  }

  // 组件即将接收新的 props
  componentWillReceiveProps(nextProps) {
    console.log("Component will receive props");
    // 在组件即将接收新的 props 时进行一些操作
  }

  // 组件即将更新
  componentWillUpdate(nextProps, nextState) {
    console.log("Component will update");
    // 在组件即将更新时进行一些操作
  }

  // 组件已经捕获错误
  componentDidCatch(error, info) {
    console.log("Component caught an error");
    // 在组件捕获到错误时进行一些处理，比如记录错误日志、展示错误界面等
  }

  render() {
    console.log("Component rendered");
    return (
      <div>
        {/* 组件的 JSX 结构 */}
        Class Component
      </div>
    );
  }
}

export default ClassComponent;
