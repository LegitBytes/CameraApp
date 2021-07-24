import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import LoadingScreen from "../../shared/LoadingScreen";

const Login = React.lazy(() => import("../../pages/Login"));
const ForgotPassword = React.lazy(
  () => import("../../pages/ForgotPassword")
);
const ResetPassword = React.lazy(
  () => import("../../pages/ResetPassword")
);

export const AuthRoutes: React.FC = () => {
  return (
    <Switch>
      <React.Suspense fallback={<LoadingScreen />}>
        <Route exact path="/">
          <Redirect to="/login" />
        </Route>
        <Route exact path="/login" render={(props) => <Login {...props} />} />
        
        <Route
          exact
          path="/forgot-password"
          render={(props) => <ForgotPassword {...props} />}
        />
        <Route
          exact
          path="/reset-password"
          render={(props) => <ResetPassword {...props} />}
        />
        <Redirect from="*" to="/login" />
      </React.Suspense>
    </Switch>
  );
};
