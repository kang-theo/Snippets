// App.js
import React, { useEffect } from "react";
import { connect, Provider } from "react-redux";
import { fetchPosts } from "./actions";
import store from "./store";

const App = ({ loading, posts, error, fetchPosts }) => {
  useEffect(() => {
    fetchPosts();
  }, [fetchPosts]);

  return (
    <div>
      {loading && <p>Loading...</p>}
      {error && <p>Error: {error}</p>}
      <h1>Posts</h1>
      <ul>
        {posts.map((post) => (
          <li key={post.id}>{post.title}</li>
        ))}
      </ul>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    loading: state.posts.loading,
    posts: state.posts.posts,
    error: state.posts.error,
  };
};

const mapDispatchToProps = {
  fetchPosts,
};

const ConnectedApp = connect(mapStateToProps, mapDispatchToProps)(App);

const AppContainer = () => {
  return (
    <Provider store={store}>
      <ConnectedApp />
    </Provider>
  );
};

export default AppContainer;
