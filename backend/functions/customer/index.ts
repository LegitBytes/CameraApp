import { handlerPath } from "@libs/handlerResolver";
import schema from "./schema";

export const addNewCustomer = {
  handler: `${handlerPath(__dirname)}/handler.addCustomer`,
  provisionedConcurrency: 1,
  events: [
    {
      http: {
        method: "post",
        path: "customers/add-customer",
        cors: true,
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
  provisionedConcurrency: 1,
  events: [
    {
      http: {
        method: "get",
        path: "customers/{customerId}",
        cors: true,
      },
    },
  ],
};

export const findAllCustomers = {
  handler: `${handlerPath(__dirname)}/handler.getAllCustomers`,
  provisionedConcurrency: 1,
  events: [
    {
      http: {
        method: "get",
        path: "customers",
        cors: true,
      },
    },
  ],
};

export const updateCustomer = {
  handler: `${handlerPath(__dirname)}/handler.editCustomer`,
  provisionedConcurrency: 1,
  events: [
    {
      http: {
        method: "patch",
        path: "customers/{customerId}",
        cors: true,
        request: {
          schema: {
            "application/json": schema,
          },
        },
      },
    },
  ],
};

export const disiableCustomer = {
  handler: `${handlerPath(__dirname)}/handler.editDisableCustomer`,
  provisionedConcurrency: 1,
  events: [
    {
      http: {
        method: "patch",
        path: "customers/disable-customer/{customerId}",
        cors: true,
      },
    },
  ],
};

export const removeCustomer = {
  handler: `${handlerPath(__dirname)}/handler.deleteCustomer`,
  provisionedConcurrency: 1,
  events: [
    {
      http: {
        method: "delete",
        path: "customers/{customerId}",
        cors: true,
      },
    },
  ],
};
