import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  NavLink,
  Switch,
  useParams,
  useLocation,
  useNavigate,
} from "react-router-dom";

import "./style.css";

// Home component
const Home = () => {
  return <h1>Welcome to the Home Page!</h1>;
};

// About component
const About = () => {
  return <h1>About Us</h1>;
};

// User component with dynamic routing
const User = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { id } = useParams();

  const handleGoBack = () => {
    navigate(-1);
  };

  const handleGoForward = () => {
    navigate(1);
  };

  const handlePush = () => {
    navigate("/about");
  };

  return (
    <div>
      <h1>User Details for ID: {id}</h1>
      <p>Location: {location.pathname}</p>
      <button onClick={handleGoBack}>Go Back</button>
      <button onClick={handleGoForward}>Go Forward</button>
      <button onClick={handlePush}>Go to About</button>
    </div>
  );
};

// App component
const App = () => {
  const navigate = useNavigate(); // Use navigate hook here

  // Redirect from /profile to /user/123
  // React.useEffect(() => {
  //   navigate("/user/123", { replace: true });
  // }, [navigate]);

  return (
    <>
      <nav>
        <ul>
          {/* Links for navigation */}
          <li>
            <NavLink to="/" activeclassname="active">
              Home
            </NavLink>
          </li>
          <li>
            <NavLink to="/about" activeclassname="active">
              About
            </NavLink>
          </li>
          <li>
            <NavLink to="/user/123" activeclassname="active">
              User
            </NavLink>
          </li>
        </ul>
      </nav>

      {/* Routes configuration */}
      <Routes> 
      {/* Switch */}
        {/* Home route */}
        <Route path="/" element={<Home />} />

        {/* About route */}
        <Route path="/about" element={<About />} />

        {/* Dynamic route for User component */}
        <Route path="/user/:id" element={<User />} />

        {/* Catch-all route */}
        <Route path="*" element={<h1>Page Not Found</h1>} />
      {/* Switch */}
      </Routes>
    </>
  );
};

export default App;
