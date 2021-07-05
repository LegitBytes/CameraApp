import React from "react";
import { RouteComponentProps } from "react-router";
import AllGroups from "../Components/Group/AllGroups";

interface GroupProps extends RouteComponentProps {}

const Group: React.FC<GroupProps> = () => {
  return (
    <AllGroups />
  );
};

export default Group;
