import React from "react";

// const App = () => {
//   const data = 'lorem <b>ipsum</b>';

//   return (
//     <div>
//       {data}
//     </div>
//   );
// }
// export default App;

const App = () => {
  const data = "lorem <b>ipsum</b>";

  return <div dangerouslySetInnerHTML={{ __html: data }} />;
};
export default App;
