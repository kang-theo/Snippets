import React, { ComponentType, useEffect } from "react";

// 定义一个高阶组件
const withLogging = <P extends object>(WrappedComponent: ComponentType<P>) => {
  const WithLogging: React.FC<P> = (props) => {
    useEffect(() => {
      console.log(`Component ${WrappedComponent.name} is mounted.`);
      return () => {
        console.log(`Component ${WrappedComponent.name} is unmounted.`);
      };
    }, []);

    // 返回被增强的组件，并将所有传递给高阶组件的 props 传递给它
    return <WrappedComponent {...props} />;
  };

  return WithLogging;
};

// 定义一个普通的 React 组件
interface MyComponentProps {
  name: string;
}

const MyComponent: React.FC<MyComponentProps> = ({ name }) => {
  return <div>Hello, {name}!</div>;
};

// 使用高阶组件增强 MyComponent
const EnhancedComponent = withLogging(MyComponent);

// 使用增强后的组件
const App: React.FC = () => {
  return <EnhancedComponent name="John" />;
};

export default App;
