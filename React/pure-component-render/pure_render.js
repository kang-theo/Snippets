import React from "react";

const MyComponent = React.memo(({ name }) => {
  return <div>Hello, {name}!</div>;
});
