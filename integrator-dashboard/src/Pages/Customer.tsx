import React from "react";
import { RouteComponentProps } from "react-router";
import AllCustomers from "../Components/Customer/AllCustomers";

interface CustomerProps extends RouteComponentProps {}

const Customer: React.FC<CustomerProps> = () => {
  return (
    <div>
      <AllCustomers />
    </div>
  );
};

export default Customer;
