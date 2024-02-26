import DOMPurify from "dompurify";

const App = () => {
  const data = `lorem <b onmouseover="alert('mouseover');">ipsum</b>`;
  const sanitizedData = () => ({
    __html: DOMPurify.sanitize(data),
  });

  return <div dangerouslySetInnerHTML={sanitizedData()} />;
};

export default App;

// use DOMPurify in Node.js without DOM Tree
// const createDOMPurify = require("dompurify");
// const { JSDOM } = require("jsdom");

// const window = new JSDOM("").window;
// const DOMPurify = createDOMPurify(window);

// const clean = DOMPurify.sanitize(dirty);