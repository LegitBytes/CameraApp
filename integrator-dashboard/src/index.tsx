import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { BrowserRouter as Router } from "react-router-dom";
import "./Assets/global.css";
import { AuthProvider } from "./Context/Auth";

//Amplify setup
import { Amplify } from "aws-amplify";
import { RouteProvider } from "./Context/RouteContext";
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
      <AuthProvider>
        <RouteProvider>
          <App />
        </RouteProvider>
      </AuthProvider>
    </Router>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
