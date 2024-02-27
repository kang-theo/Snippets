import React, { Suspense } from "react";

// 自定义的错误边界组件
function ErrorBoundary({ children }) {
  const [hasError, setHasError] = React.useState(false);

  React.useEffect(() => {
    const errorHandler = () => setHasError(true);
    window.addEventListener("error", errorHandler);
    return () => window.removeEventListener("error", errorHandler);
  }, []);

  return hasError ? <div>Something went wrong.</div> : children;
}

// 懒加载组件
const LazyComponent = React.lazy(() => import("./LazyComponent"));

function App() {
  return (
    <div>
      <h1>Lazy-loaded Component with ErrorBoundary</h1>
      <ErrorBoundary>
        <Suspense fallback={<div>Loading...</div>}>
          <LazyComponent />
        </Suspense>
      </ErrorBoundary>
    </div>
  );
}

export default App;

/*
  - ErrorBoundary 组件用于捕获 LazyComponent 组件中发生的错误，并渲染备用 UI 或错误提示信息。
  - React.lazy() 用于动态加载 LazyComponent 组件，实现组件的懒加载。
  - Suspense 组件用于在组件加载过程中显示加载指示器或备用 UI，以提供更好的用户体验。
    Suspense 内部主要通过捕获组件的状态去判断如何加载， React.lazy 创建的动态加载组件具有 Pending、Resolved、Rejected 三种状态，
    当这个组件的状态为 Pending 时显示的是 Suspense 中 fallback 的内容，只有状态变为 resolve 后才显示组件。
*/