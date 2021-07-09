import { handlerPath } from "@libs/handlerResolver";
import schema from "./schema";

export const addNewCustomer = {
  handler: `${handlerPath(__dirname)}/handler.addCustomer`,
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

export const updateChangeNameCustomer = {
  handler: `${handlerPath(__dirname)}/handler.editChangeName`,
  events: [
    {
      http: {
        method: "patch",
        path: "customers/aliase-customer/{customerId}",
        cors: true,
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
        cors: true,
      },
    },
  ],
};
