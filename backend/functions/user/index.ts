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
      },
    },
  ],
};
