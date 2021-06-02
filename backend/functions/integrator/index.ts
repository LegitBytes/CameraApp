import { handlerPath } from "@libs/handlerResolver";
import schema from "./schema";

export const addNewIntegrator = {
  handler: `${handlerPath(__dirname)}/handler.addIntegrator`,
  events: [
    {
      http: {
        method: "post",
        path: "integrators/add-integrator",
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
      },
    },
  ],
};

export const updateIntegrator = {
  handler: `${handlerPath(__dirname)}/handler.editIntegrator`,
  events: [
    {
      http: {
        method: "put",
        path: "integrators/{integratorId}",
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
  events: [
    {
      http: {
        method: "delete",
        path: "integrators/{integratorId}",
      },
    },
  ],
};
