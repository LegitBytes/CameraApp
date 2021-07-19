import React, { useEffect } from "react";
import { RouteComponentProps } from "react-router-dom";
import LoginComp from "../Components/Auth/Login";
interface LoginProps extends RouteComponentProps {}
const Login: React.FC<LoginProps> = () => {
  useEffect(() => window.scrollTo(0, 0), []);

  return <LoginComp />;
};

export default Login;
