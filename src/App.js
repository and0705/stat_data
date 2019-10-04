import React, { lazy, Suspense } from "react";
import { Router, Route, Switch } from "react-router-dom";
import { createBrowserHistory } from "history";
import "./App.scss";

const loading = () => {
  return (
    <div>
      <p>Loading...</p>
    </div>
  );
};

const browserHistory = createBrowserHistory();

const Home = lazy(() => import("./components/Home"));
const Chart = lazy(() => import("./components/Chart"));

const App = () => {
  return (
    <div>
      <Router history={browserHistory}>
        <Suspense fallback={loading}>
          <Switch>
            <Route exact path="/chart" name="Chart" component={Chart} />
            <Route path="/" name="Home" component={Home} />
          </Switch>
        </Suspense>
      </Router>
    </div>
  );
};

export default App;
