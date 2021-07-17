import React, { useEffect } from "react";
import { RouteComponentProps } from "react-router";
import AllGroups from "../Components/Group/AllGroups";

interface GroupProps extends RouteComponentProps {}

const Group: React.FC<GroupProps> = () => {
  useEffect(() => window.scrollTo(0, 0), []);

  return <AllGroups />;
};

export default Group;
