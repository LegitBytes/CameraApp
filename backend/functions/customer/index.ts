import { handlerPath } from "@libs/handlerResolver";
import schema from "./schema";

export const addNewCustomer = {
  handler: `${handlerPath(__dirname)}/handler.addCustomer`,
  events: [
    {
      http: {
        method: "post",
        path: "customers/add-customer",
        request: {
          schema: {
            "application/json": schema,
          },
        },
      },
    },
  ],
};

export const findCustomerById = {
  handler: `${handlerPath(__dirname)}/handler.getCustomerById`,
  events: [
    {
      http: {
        method: "get",
        path: "customers/{customerId}",
      },
    },
  ],
};

export const findAllCustomers = {
  handler: `${handlerPath(__dirname)}/handler.getAllCustomers`,
  events: [
    {
      http: {
        method: "get",
        path: "customers",
      },
    },
  ],
};

export const updateCustomer = {
  handler: `${handlerPath(__dirname)}/handler.editCustomer`,
  events: [
    {
      http: {
        method: "put",
        path: "customers/{customerId}",
        request: {
          schema: {
            "application/json": schema,
          },
        },
      },
    },
  ],
};

export const removeCustomer = {
  handler: `${handlerPath(__dirname)}/handler.deleteCustomer`,
  events: [
    {
      http: {
        method: "delete",
        path: "customers/{customerId}",
      },
    },
  ],
};
