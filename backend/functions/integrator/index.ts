import { handlerPath } from "@libs/handlerResolver";
import schema from "./schema";

export const addNewIntegrator = {
  handler: `${handlerPath(__dirname)}/handler.addIntegrator`,
  provisionedConcurrency: 1,
  events: [
    {
      http: {
        method: "post",
        path: "integrators/add-integrator",
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

export const findIntegratorById = {
  handler: `${handlerPath(__dirname)}/handler.getIntegratorById`,
  provisionedConcurrency: 1,
  events: [
    {
      http: {
        method: "get",
        path: "integrators/{integratorId}",
        cors: true,
      },
    },
  ],
};

export const findAllIntegrators = {
  handler: `${handlerPath(__dirname)}/handler.getAllIntegrators`,
  provisionedConcurrency: 1,
  events: [
    {
      http: {
        method: "get",
        path: "integrators",
        cors: true,
      },
    },
  ],
};

export const updateIntegrator = {
  handler: `${handlerPath(__dirname)}/handler.editIntegrator`,
  provisionedConcurrency: 1,
  events: [
    {
      http: {
        method: "patch",
        path: "integrators/{integratorId}",
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

export const removeIntegrator = {
  handler: `${handlerPath(__dirname)}/handler.deleteIntegrator`,
  provisionedConcurrency: 1,
  events: [
    {
      http: {
        method: "delete",
        path: "integrators/{integratorId}",
        cors: true,
      },
    },
  ],
};
