import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import LoadingScreen from "../../Shared/LoadingScreen";

const Login = React.lazy(() => import("../../Pages/Login"));
const LoginType = React.lazy(() => import("../../Pages/LoginType"));
const ForgotPasswordType = React.lazy(
  () => import("../../Pages/ForgotPasswordType")
);
const ResetPasswordType = React.lazy(
  () => import("../../Pages/ResetPasswordType")
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
          path="/login/:type"
          render={(props) => <LoginType {...props} />}
        />
        <Route
          exact
          path="/forgot-password/:type"
          render={(props) => <ForgotPasswordType {...props} />}
        />
        <Route
          exact
          path="/reset-password/:type"
          render={(props) => <ResetPasswordType {...props} />}
        />
        <Redirect from="*" to="/login" />
      </React.Suspense>
    </Switch>
  );
};
