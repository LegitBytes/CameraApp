import { handlerPath } from "@libs/handlerResolver";
import schema from "./schema";

export const addNewSite = {
  handler: `${handlerPath(__dirname)}/handler.addSite`,
  events: [
    {
      http: {
        method: "post",
        path: "sites/add-site",
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
      },
    },
  ],
};

export const updateSite = {
  handler: `${handlerPath(__dirname)}/handler.editSite`,
  events: [
    {
      http: {
        method: "put",
        path: "sites/{siteId}",
        request: {
          schema: {
            "application/json": schema,
          },
        },
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
      },
    },
  ],
};
