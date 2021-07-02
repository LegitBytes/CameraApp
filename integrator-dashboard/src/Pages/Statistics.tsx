import React, { useEffect } from "react";
import { RouteComponentProps } from "react-router";
import StatisticsComp from "../Components/Statistics/Statistics";
interface StatisticsProps extends RouteComponentProps {}

const Statistics: React.FC<StatisticsProps> = () => {
  useEffect(() => window.scrollTo(0, 0));
  return <StatisticsComp />;
};

export default Statistics;
