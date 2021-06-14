import { handlerPath } from "@libs/handlerResolver";
import schema from "./schema";

export const addNewSite = {
  handler: `${handlerPath(__dirname)}/handler.addSite`,
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
