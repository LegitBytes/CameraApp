import { handlerPath } from "@libs/handlerResolver";
import schema from "./schema";

export const addNewGroup = {
  handler: `${handlerPath(__dirname)}/handler.addGroup`,
  provisionedConcurrency: 1,
  events: [
    {
      http: {
        method: "post",
        path: "groups/add-group",
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

export const findGroupById = {
  handler: `${handlerPath(__dirname)}/handler.getGroupById`,
  provisionedConcurrency: 1,
  events: [
    {
      http: {
        method: "get",
        path: "groups/{groupId}",
        cors: true,
      },
    },
  ],
};

export const findAllGroups = {
  handler: `${handlerPath(__dirname)}/handler.getAllGroups`,
  provisionedConcurrency: 1,
  events: [
    {
      http: {
        method: "get",
        path: "groups",
        cors: true,
      },
    },
  ],
};

export const updateGroup = {
  handler: `${handlerPath(__dirname)}/handler.editGroup`,
  provisionedConcurrency: 1,
  events: [
    {
      http: {
        method: "patch",
        path: "groups/{groupId}",
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

export const disiableGroup = {
  handler: `${handlerPath(__dirname)}/handler.editDisableGroup`,
  provisionedConcurrency: 1,
  events: [
    {
      http: {
        method: "patch",
        path: "groups/disable-group/{groupId}",
        cors: true,
      },
    },
  ],
};

export const removeGroup = {
  handler: `${handlerPath(__dirname)}/handler.deleteGroup`,
  provisionedConcurrency: 1,
  events: [
    {
      http: {
        method: "delete",
        path: "groups/{groupId}",
        cors: true,
      },
    },
  ],
};
