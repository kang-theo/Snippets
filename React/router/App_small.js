import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

export default function App() {
  return (
    <Router>
      {/* <main>
        <nav>
          <ul>
            <li>
              <a href="/">Home</a>
            </li>
            <li>
              <a href="/about">About</a>
            </li>
            <li>
              <a href="/contact">Contact</a>
            </li>
          </ul>
        </nav>
      </main> */}
      <Routes>
        {/* <Route path="/" render={() => <h1>Welcome!</h1>} /> */}
        <Route path="/" element={<h1>Welcome!</h1>} />{" "} {/* React Router v6, Specify the element to render */}
      </Routes>
    </Router>
  );
}
