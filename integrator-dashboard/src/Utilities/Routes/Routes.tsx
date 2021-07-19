import React, { useContext } from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import LoadingScreen from "../../Shared/LoadingScreen";
import { AuthContext } from "../../Context/Auth"

const Statistics = React.lazy(() => import("../../Pages/Statistics"));
const Camera = React.lazy(() => import("../../Pages/Camera"));
const Customer = React.lazy(() => import("../../Pages/Customer"));
const Group = React.lazy(() => import("../../Pages/Group"));
const Site = React.lazy(() => import("../../Pages/Site"));
const User = React.lazy(() => import("../../Pages/User"));
const Integrator = React.lazy(() => import("../../Pages/Integrator"));



export const Routes: React.FC = () => {

  const { isSuperAdmin } = useContext(AuthContext)

  return (
    <Switch>
      <React.Suspense fallback={<LoadingScreen />}>
        <Route exact path="/">
          <Redirect to="/statistics" />
        </Route>
        <Route
          exact
          path="/statistics"
          render={(props) => <Statistics {...props} />}
        />
        <Route exact path="/camera" render={(props) => <Camera {...props} />} />
        <Route
          exact
          path="/customer"
          render={(props) => <Customer {...props} />}
        />
        <Route exact path="/Group" render={(props) => <Group {...props} />} />
        <Route exact path="/site" render={(props) => <Site {...props} />} />
        <Route exact path="/user" render={(props) => <User {...props} />} />
        {isSuperAdmin && <Route
          exact
          path="/integrator"
          render={(props) => <Integrator {...props} />}
        />}
        <Redirect from="*" to="/statistics" />
      </React.Suspense>
    </Switch>
  );
};
