import { handlerPath } from "@libs/handlerResolver";
import schema from "./schema";

export const addNewIntegrator = {
  handler: `${handlerPath(__dirname)}/handler.addIntegrator`,
  events: [
    {
      http: {
        method: "post",
        path: "integrators/add-integrator",
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

export const findIntegratorById = {
  handler: `${handlerPath(__dirname)}/handler.getIntegratorById`,
  events: [
    {
      http: {
        method: "get",
        path: "integrators/{integratorId}",
        cors: true,
        authorizer: {
          name: "authorizer",
          arn: "arn:aws:cognito-idp:us-east-1:962195032846:userpool/us-east-1_6ExNtggrn",
        },
      },
    },
  ],
};

export const findAllIntegrators = {
  handler: `${handlerPath(__dirname)}/handler.getAllIntegrators`,
  events: [
    {
      http: {
        method: "get",
        path: "integrators",
        cors: true,
        authorizer: {
          name: "authorizer",
          arn: "arn:aws:cognito-idp:us-east-1:962195032846:userpool/us-east-1_6ExNtggrn",
        },
      },
    },
  ],
};

export const updateIntegrator = {
  handler: `${handlerPath(__dirname)}/handler.editIntegrator`,
  events: [
    {
      http: {
        method: "patch",
        path: "integrators/{integratorId}",
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

export const disiableIntegrator = {
  handler: `${handlerPath(__dirname)}/handler.editDisableIntegrator`,
  events: [
    {
      http: {
        method: "patch",
        path: "integrators/disable-integrator/{integratorId}",
        cors: true,
        authorizer: {
          name: "authorizer",
          arn: "arn:aws:cognito-idp:us-east-1:962195032846:userpool/us-east-1_6ExNtggrn",
        },
      },
    },
  ],
};

export const removeIntegrator = {
  handler: `${handlerPath(__dirname)}/handler.deleteIntegrator`,
  events: [
    {
      http: {
        method: "delete",
        path: "integrators/{integratorId}",
        cors: true,
        authorizer: {
          name: "authorizer",
          arn: "arn:aws:cognito-idp:us-east-1:962195032846:userpool/us-east-1_6ExNtggrn",
        },
      },
    },
  ],
};
