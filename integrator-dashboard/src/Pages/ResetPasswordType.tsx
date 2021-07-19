import React, { useEffect } from "react";
import { RouteComponentProps } from "react-router-dom";
interface ResetPasswordTypeProps extends RouteComponentProps {}

const ResetPasswordType: React.FC<ResetPasswordTypeProps> = () => {
  useEffect(() => window.scrollTo(0, 0), []);

  return <div>Hello</div>;
};

export default ResetPasswordType;