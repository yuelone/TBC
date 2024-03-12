import React, { Suspense, lazy } from "react";
import { BrowserRouter as Router } from "react-router-dom";

import LoadingPage from "Components/LoadingPage";

const Home = lazy(() => import("./pages/home"));

const App = () => {
  return (
    <Router>
      <Suspense fallback={<LoadingPage />}>
        <Home />
      </Suspense>
    </Router>
  );
};

export default App;
