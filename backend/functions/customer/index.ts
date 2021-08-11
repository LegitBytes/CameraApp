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
        authorizer: {
          name: "authorizer",
          arn: "arn:aws:cognito-idp:us-east-1:962195032846:userpool/us-east-1_6ExNtggrn",
        },
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
        authorizer: {
          name: "authorizer",
          arn: "arn:aws:cognito-idp:us-east-1:962195032846:userpool/us-east-1_6ExNtggrn",
        },
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
        authorizer: {
          name: "authorizer",
          arn: "arn:aws:cognito-idp:us-east-1:962195032846:userpool/us-east-1_6ExNtggrn",
        },
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
        authorizer: {
          name: "authorizer",
          arn: "arn:aws:cognito-idp:us-east-1:962195032846:userpool/us-east-1_6ExNtggrn",
        },
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
        authorizer: {
          name: "authorizer",
          arn: "arn:aws:cognito-idp:us-east-1:962195032846:userpool/us-east-1_6ExNtggrn",
        },
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
        authorizer: {
          name: "authorizer",
          arn: "arn:aws:cognito-idp:us-east-1:962195032846:userpool/us-east-1_6ExNtggrn",
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
        cors: true,
        authorizer: {
          name: "authorizer",
          arn: "arn:aws:cognito-idp:us-east-1:962195032846:userpool/us-east-1_6ExNtggrn",
        },
      },
    },
  ],
};
