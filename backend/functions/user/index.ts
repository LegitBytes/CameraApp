import { handlerPath } from "@libs/handlerResolver";
import schema from "./schema";

export const addNewUser = {
  handler: `${handlerPath(__dirname)}/handler.addUser`,
  events: [
    {
      http: {
        method: "post",
        path: "users/add-user",
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
      },
    },
  ],
};

export const updateUser = {
  handler: `${handlerPath(__dirname)}/handler.editUser`,
  events: [
    {
      http: {
        method: "put",
        path: "users/{userId}",
        request: {
          schema: {
            "application/json": schema,
          },
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
      },
    },
  ],
};
