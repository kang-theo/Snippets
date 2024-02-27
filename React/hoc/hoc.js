import React from "react";

// 定义一个高阶组件
const withLogging = (WrappedComponent) => {
  return class extends React.Component {
    componentDidMount() {
      console.log(`Component ${WrappedComponent.name} is mounted.`);
    }

    componentWillUnmount() {
      console.log(`Component ${WrappedComponent.name} is unmounted.`);
    }

    render() {
      // 返回被增强的组件，并将所有传递给高阶组件的 props 传递给它
      return <WrappedComponent {...this.props} />;
    }
  };
};

// 定义一个普通的 React 组件
const MyComponent = ({ name }) => {
  return <div>Hello, {name}!</div>;
};

// 使用高阶组件增强 MyComponent
const EnhancedComponent = withLogging(MyComponent);

// 使用增强后的组件
const App = () => {
  return <EnhancedComponent name="John" />;
};

export default App;
