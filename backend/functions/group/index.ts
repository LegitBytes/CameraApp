import { handlerPath } from "@libs/handlerResolver";
import schema from "./schema";

export const addNewGroup = {
  handler: `${handlerPath(__dirname)}/handler.addGroup`,
  events: [
    {
      http: {
        method: "post",
        path: "groups/add-group",
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

export const findGroupById = {
  handler: `${handlerPath(__dirname)}/handler.getGroupById`,
  events: [
    {
      http: {
        method: "get",
        path: "groups/{groupId}",
        cors: true,
        authorizer: {
          name: "authorizer",
          arn: "arn:aws:cognito-idp:us-east-1:962195032846:userpool/us-east-1_6ExNtggrn",
        },
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
        cors: true,
        authorizer: {
          name: "authorizer",
          arn: "arn:aws:cognito-idp:us-east-1:962195032846:userpool/us-east-1_6ExNtggrn",
        },
      },
    },
  ],
};

export const updateGroup = {
  handler: `${handlerPath(__dirname)}/handler.editGroup`,
  events: [
    {
      http: {
        method: "patch",
        path: "groups/{groupId}",
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

export const disiableGroup = {
  handler: `${handlerPath(__dirname)}/handler.editDisableGroup`,
  events: [
    {
      http: {
        method: "patch",
        path: "groups/disable-group/{groupId}",
        cors: true,
        authorizer: {
          name: "authorizer",
          arn: "arn:aws:cognito-idp:us-east-1:962195032846:userpool/us-east-1_6ExNtggrn",
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
        cors: true,
        authorizer: {
          name: "authorizer",
          arn: "arn:aws:cognito-idp:us-east-1:962195032846:userpool/us-east-1_6ExNtggrn",
        },
      },
    },
  ],
};
