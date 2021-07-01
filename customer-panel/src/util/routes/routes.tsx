import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import LoadingScreen from "../../shared/LoadingScreen";

const Main = React.lazy(() => import("../../pages/Main"));
const Alerts = React.lazy(() => import("../../pages/Alerts"));
const MainDetails = React.lazy(() => import("../../pages/MainDetails"));
const Routes: React.FC = () => {
  return (
    <Switch>
      <React.Suspense fallback={<LoadingScreen />}>
        <Route exact path="/">
          <Redirect to="main" />
        </Route>
        <Route exact path="/main" render={(props) => <Main {...props} />} />
        <Route
          exact
          path="/main/:customer/:site/:camera"
          render={(props) => <MainDetails {...props} />}
        />
        <Route exact path="/alerts" render={(props) => <Alerts {...props} />} />
      </React.Suspense>
    </Switch>
  );
};
export default Routes;
