import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { BrowserRouter as Router } from "react-router-dom";
import { MuiPickersUtilsProvider } from "@material-ui/pickers";
import DateFnsUtils from "@date-io/date-fns";
import { AuthProvider } from "./context/Auth";

//Amplify setup
import { Amplify } from "aws-amplify";
import { RouteProvider } from "./context/RouteContext";
Amplify.configure({
  Auth: {
    userPoolId: process.env.REACT_APP_USERPOOLID,
    userPoolWebClientId: process.env.REACT_APP_USERPOOLWEBCLIENTID,
    awsCognitoIdentityPoolId: process.env.REACT_APP_IDENTITYPOOLID,
  },
  Analytics: {
    disabled: true,
  },
});

ReactDOM.render(
  <React.StrictMode>
    <Router>
      <MuiPickersUtilsProvider utils={DateFnsUtils}>
        <AuthProvider>
          <RouteProvider>
            <App />
          </RouteProvider>
        </AuthProvider>
      </MuiPickersUtilsProvider>
    </Router>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
