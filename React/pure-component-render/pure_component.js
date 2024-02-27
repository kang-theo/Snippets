import React, { PureComponent } from "react";

class MyComponent extends PureComponent {
  render() {
    return <div>Hello, {this.props.name}!</div>;
  }
}

// 浅比较(shallowEqual)，即react源码中的一个函数，然后根据下面的方法进行是不是PureComponent的判断，帮我们做了本来应该我们在 shouldComponentUpdate 中做的事情
/*
  if (this._compositeType === CompositeTypes.PureClass) {
    shouldUpdate =
      !shallowEqual(prevProps, nextProps) || !shallowEqual(inst.state, nextState);
  }
*/
