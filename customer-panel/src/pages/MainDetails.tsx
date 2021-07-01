import React, { useEffect } from "react";
import { RouteComponentProps } from "react-router-dom";
import MainDetailsComp from "../components/MainDetails/MainDetails";
interface MainDetailsProps extends RouteComponentProps {}

const MainDetails: React.FC<MainDetailsProps> = () => {
  useEffect(() => window.scrollTo(0, 0));

  return <MainDetailsComp />;
};

export default MainDetails;
