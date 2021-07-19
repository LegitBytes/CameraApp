import React, { useEffect } from "react";
import { RouteComponentProps } from "react-router-dom";
import LoginTypeComp from "../Components/Auth/LoginType"
interface LoginTypeProps extends RouteComponentProps {}

const LoginType: React.FC<LoginTypeProps> = () => {
  useEffect(() => window.scrollTo(0, 0), []);

  return <LoginTypeComp />;
};

export default LoginType;