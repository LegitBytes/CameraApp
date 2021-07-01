import React from "react";
import { RouteComponentProps } from "react-router";
import AllSites from "../Components/Site/AllSites";

interface SiteProps extends RouteComponentProps {}

const Site: React.FC<SiteProps> = () => {
  return <AllSites />;
};

export default Site;
