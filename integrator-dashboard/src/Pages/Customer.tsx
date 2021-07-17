import React, { useEffect } from "react";
import { RouteComponentProps } from "react-router";
import AllCustomers from "../Components/Customer/AllCustomers";

interface CustomerProps extends RouteComponentProps {}

const Customer: React.FC<CustomerProps> = () => {
  useEffect(() => window.scrollTo(0, 0), []);

  return (
    <div>
      <AllCustomers />
    </div>
  );
};

export default Customer;
