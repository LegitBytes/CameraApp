import React, { useEffect } from "react";
import { RouteComponentProps } from "react-router";
import AllIntegrators from "../Components/Integrator/AllIntegrators";

interface GroupProps extends RouteComponentProps {}

const Group: React.FC<GroupProps> = () => {
  useEffect(() => window.scrollTo(0, 0), []);

  return <AllIntegrators />;
};

export default Group;
