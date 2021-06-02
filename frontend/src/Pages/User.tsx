import React from "react";
import { RouteComponentProps } from "react-router-dom";
import AllUsers from "../Components/User/AllUsers";
interface UserProps extends RouteComponentProps {}

const User: React.FC<UserProps> = () => {
  return <AllUsers />;
};

export default User;
