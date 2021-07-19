import React, { useEffect } from "react";
import { RouteComponentProps } from "react-router-dom";
interface ForgotPasswordProps extends RouteComponentProps {}

const ForgotPassword: React.FC<ForgotPasswordProps> = () => {
  useEffect(() => window.scrollTo(0, 0), []);

  return <div>Hello</div>;
};

export default ForgotPassword;