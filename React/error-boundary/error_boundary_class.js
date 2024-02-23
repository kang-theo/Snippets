import React, { Component } from "react";

class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    // 返回一个新的状态对象，指示发生了错误
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    // 捕获错误并设置状态为 true
    this.setState({ hasError: true });
    console.error("Error caught by ErrorBoundary:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      // 如果发生错误，则渲染备用UI
      return <h1>Something went wrong.</h1>;
    }
    // 如果没有错误，则正常渲染子组件
    return this.props.children;
  }
}

export default ErrorBoundary;
