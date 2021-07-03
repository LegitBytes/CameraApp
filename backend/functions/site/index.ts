import { handlerPath } from "@libs/handlerResolver";
import schema from "./schema";

export const addNewSite = {
  handler: `${handlerPath(__dirname)}/handler.addSite`,
  provisionedConcurrency: 1,
  events: [
    {
      http: {
        method: "post",
        path: "sites/add-site",
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

export const findSiteById = {
  handler: `${handlerPath(__dirname)}/handler.getSiteById`,
  provisionedConcurrency: 1,
  events: [
    {
      http: {
        method: "get",
        path: "sites/{siteId}",
        cors: true,
      },
    },
  ],
};

export const findAllSites = {
  handler: `${handlerPath(__dirname)}/handler.getAllSites`,
  provisionedConcurrency: 1,
  events: [
    {
      http: {
        method: "get",
        path: "sites",
        cors: true,
      },
    },
  ],
};

export const updateSite = {
  handler: `${handlerPath(__dirname)}/handler.editSite`,
  provisionedConcurrency: 1,
  events: [
    {
      http: {
        method: "patch",
        path: "sites/{siteId}",
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

export const disiableSite = {
  handler: `${handlerPath(__dirname)}/handler.editDisableSite`,
  provisionedConcurrency: 1,
  events: [
    {
      http: {
        method: "patch",
        path: "sites/disable-site/{siteId}",
        cors: true,
      },
    },
  ],
};

export const removeSite = {
  handler: `${handlerPath(__dirname)}/handler.deleteSite`,
  provisionedConcurrency: 1,
  events: [
    {
      http: {
        method: "delete",
        path: "sites/{siteId}",
        cors: true,
      },
    },
  ],
};
