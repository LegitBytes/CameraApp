import React, { useEffect } from "react";
import { RouteComponentProps } from "react-router";
import AllSites from "../Components/Site/AllSites";

interface SiteProps extends RouteComponentProps {}

const Site: React.FC<SiteProps> = () => {
  useEffect(() => window.scrollTo(0,0),[]);
  return <AllSites />;
};

export default Site;
