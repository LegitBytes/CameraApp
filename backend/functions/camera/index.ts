import { handlerPath } from "@libs/handlerResolver";
import schema from "./schema";

export const addNewCamera = {
  handler: `${handlerPath(__dirname)}/handler.addCamera`,
  events: [
    {
      http: {
        method: "post",
        path: "cameras/add-camera",
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

export const findCameraById = {
  handler: `${handlerPath(__dirname)}/handler.getCameraById`,
  events: [
    {
      http: {
        method: "get",
        path: "cameras/{cameraId}",
        cors: true,
        authorizer: {
          name: "authorizer",
          arn: "arn:aws:cognito-idp:us-east-1:962195032846:userpool/us-east-1_6ExNtggrn",
        },
      },
    },
  ],
};

export const findAllCameras = {
  handler: `${handlerPath(__dirname)}/handler.getAllCameras`,
  events: [
    {
      http: {
        method: "get",
        path: "cameras",
        cors: true,
        authorizer: {
          name: "authorizer",
          arn: "arn:aws:cognito-idp:us-east-1:962195032846:userpool/us-east-1_6ExNtggrn",
        },
      },
    },
  ],
};

export const updateCamera = {
  handler: `${handlerPath(__dirname)}/handler.editCamera`,
  events: [
    {
      http: {
        method: "patch",
        path: "cameras/{cameraId}",
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

export const disiableCamera = {
  handler: `${handlerPath(__dirname)}/handler.editDisableCamera`,
  events: [
    {
      http: {
        method: "patch",
        path: "cameras/disable-camera/{cameraId}",
        cors: true,
        authorizer: {
          name: "authorizer",
          arn: "arn:aws:cognito-idp:us-east-1:962195032846:userpool/us-east-1_6ExNtggrn",
        },
      },
    },
  ],
};

export const updateChangeNameCamera = {
  handler: `${handlerPath(__dirname)}/handler.editChangeName`,
  events: [
    {
      http: {
        method: "patch",
        path: "cameras/aliase-camera/{cameraId}",
        cors: true,
        authorizer: {
          name: "authorizer",
          arn: "arn:aws:cognito-idp:us-east-1:962195032846:userpool/us-east-1_6ExNtggrn",
        },
      },
    },
  ],
};

export const removeCamera = {
  handler: `${handlerPath(__dirname)}/handler.deleteCamera`,
  events: [
    {
      http: {
        method: "delete",
        path: "cameras/{cameraId}",
        cors: true,
        authorizer: {
          name: "authorizer",
          arn: "arn:aws:cognito-idp:us-east-1:962195032846:userpool/us-east-1_6ExNtggrn",
        },
      },
    },
  ],
};

export const removeIAMPolicy = {
  handler: `${handlerPath(__dirname)}/handler.deleteIAMPolicy`,
  events: [
    {
      http: {
        method: "delete",
        path: "delete-policy/{policyArn}",
        cors: true,
        authorizer: {
          name: "authorizer",
          arn: "arn:aws:cognito-idp:us-east-1:962195032846:userpool/us-east-1_6ExNtggrn",
        },
      },
    },
  ],
};
