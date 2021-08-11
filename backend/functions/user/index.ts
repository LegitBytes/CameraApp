import { handlerPath } from "@libs/handlerResolver";
import schema from "./schema";

export const addNewUser = {
  handler: `${handlerPath(__dirname)}/handler.addUser`,
  events: [
    {
      http: {
        method: "post",
        path: "users/add-user",
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

export const findUserById = {
  handler: `${handlerPath(__dirname)}/handler.getUserById`,
  events: [
    {
      http: {
        method: "get",
        path: "users/{userId}",
        cors: true,
        authorizer: {
          name: "authorizer",
          arn: "arn:aws:cognito-idp:us-east-1:962195032846:userpool/us-east-1_6ExNtggrn",
        },
      },
    },
  ],
};

export const findAllUsers = {
  handler: `${handlerPath(__dirname)}/handler.getAllUsers`,
  events: [
    {
      http: {
        method: "get",
        path: "users",
        cors: true,
        authorizer: {
          name: "authorizer",
          arn: "arn:aws:cognito-idp:us-east-1:962195032846:userpool/us-east-1_6ExNtggrn",
        },
      },
    },
  ],
};

export const updateUser = {
  handler: `${handlerPath(__dirname)}/handler.editUser`,
  events: [
    {
      http: {
        method: "patch",
        path: "users/{userId}",
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

export const disiableUser = {
  handler: `${handlerPath(__dirname)}/handler.editDisableUser`,
  events: [
    {
      http: {
        method: "patch",
        path: "users/disable-user/{userId}",
        cors: true,
        authorizer: {
          name: "authorizer",
          arn: "arn:aws:cognito-idp:us-east-1:962195032846:userpool/us-east-1_6ExNtggrn",
        },
      },
    },
  ],
};

export const removeUser = {
  handler: `${handlerPath(__dirname)}/handler.deleteUser`,
  events: [
    {
      http: {
        method: "delete",
        path: "users/{userId}",
        cors: true,
        authorizer: {
          name: "authorizer",
          arn: "arn:aws:cognito-idp:us-east-1:962195032846:userpool/us-east-1_6ExNtggrn",
        },
      },
    },
  ],
};
