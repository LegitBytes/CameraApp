import { handlerPath } from "@libs/handlerResolver";
import schema from "./schema";

export const addNewGroup = {
  handler: `${handlerPath(__dirname)}/handler.addGroup`,
  events: [
    {
      http: {
        method: "post",
        path: "groups/add-group",
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
  events: [
    {
      http: {
        method: "get",
        path: "groups/{groupId}",
      },
    },
  ],
};

export const findAllGroups = {
  handler: `${handlerPath(__dirname)}/handler.getAllGroups`,
  events: [
    {
      http: {
        method: "get",
        path: "groups",
      },
    },
  ],
};

export const updateGroup = {
  handler: `${handlerPath(__dirname)}/handler.editGroup`,
  events: [
    {
      http: {
        method: "put",
        path: "groups/{groupId}",
        request: {
          schema: {
            "application/json": schema,
          },
        },
      },
    },
  ],
};

export const removeGroup = {
  handler: `${handlerPath(__dirname)}/handler.deleteGroup`,
  events: [
    {
      http: {
        method: "delete",
        path: "groups/{groupId}",
      },
    },
  ],
};
