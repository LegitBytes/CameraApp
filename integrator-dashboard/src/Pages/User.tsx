import React, { useEffect } from "react";
import { RouteComponentProps } from "react-router-dom";
import AllUsers from "../Components/User/AllUsers";
interface UserProps extends RouteComponentProps {}

const User: React.FC<UserProps> = () => {
  useEffect(() => window.scrollTo(0, 0), []);

  return <AllUsers />;
};

export default User;
