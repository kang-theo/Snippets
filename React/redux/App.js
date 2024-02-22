// App.js
import React from "react";
import { Provider, connect } from "react-redux";
import { increment, decrement } from "./actions";

class App extends React.Component {
  render() {
    return (
      <div>
        <h1>Count: {this.props.count}</h1>
        <button onClick={this.props.increment}>Increment</button>
        <button onClick={this.props.decrement}>Decrement</button>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    count: state.count,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    increment: () => dispatch(increment()),
    decrement: () => dispatch(decrement()),
  };
};

const ConnectedApp = connect(mapStateToProps, mapDispatchToProps)(App);

/**
 * 
 * 创建了一个名为 AppContainer 的函数组件，它充当了应用的根组件，并使用 Provider 组件将 Redux 的 store 注入整个应用中。在 Provider 的 store 属性中传入了 Redux 的 store。
 * 在 AppContainer 中，通过 connect 函数将 App 组件与 Redux store 进行连接，并将 mapStateToProps 和 mapDispatchToProps 中定义的状态和操作映射到 App 组件的 props 上。
 * 连接后的组件被赋值给了 ConnectedApp 变量。最后，ConnectedApp 组件被渲染在 Provider 组件的内部，这样整个应用都可以访问 Redux 的状态和操作。
 */
const AppContainer = () => {
  return (
    <Provider store={store}>
      <ConnectedApp />
    </Provider>
  );
};

export default AppContainer;

/*
  - actions.js 包含了增加和减少计数的action创建函数。
  - reducers.js 包含了计数器的reducer函数。
  - store.js 创建了Redux store，使用了 counterReducer 作为参数。
  - App.js 定义了一个React组件 App，它通过 connect 函数连接到Redux store，并通过 mapStateToProps 和 mapDispatchToProps 映射了状态和操作到组件的props上。最后，通过 Provider 将 store 注入整个应用。
*/