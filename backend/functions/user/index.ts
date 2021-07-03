import { handlerPath } from "@libs/handlerResolver";
import schema from "./schema";

export const addNewUser = {
  handler: `${handlerPath(__dirname)}/handler.addUser`,
  provisionedConcurrency: 1,
  events: [
    {
      http: {
        method: "post",
        path: "users/add-user",
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

export const findUserById = {
  handler: `${handlerPath(__dirname)}/handler.getUserById`,
  provisionedConcurrency: 1,
  events: [
    {
      http: {
        method: "get",
        path: "users/{userId}",
        cors: true,
      },
    },
  ],
};

export const findAllUsers = {
  handler: `${handlerPath(__dirname)}/handler.getAllUsers`,
  provisionedConcurrency: 1,
  events: [
    {
      http: {
        method: "get",
        path: "users",
        cors: true,
      },
    },
  ],
};

export const updateUser = {
  handler: `${handlerPath(__dirname)}/handler.editUser`,
  provisionedConcurrency: 1,
  events: [
    {
      http: {
        method: "patch",
        path: "users/{userId}",
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

export const disiableUser = {
  handler: `${handlerPath(__dirname)}/handler.editDisableUser`,
  provisionedConcurrency: 1,
  events: [
    {
      http: {
        method: "patch",
        path: "users/disable-user/{userId}",
        cors: true,
      },
    },
  ],
};

export const removeUser = {
  handler: `${handlerPath(__dirname)}/handler.deleteUser`,
  provisionedConcurrency: 1,
  events: [
    {
      http: {
        method: "delete",
        path: "users/{userId}",
        cors: true,
      },
    },
  ],
};
