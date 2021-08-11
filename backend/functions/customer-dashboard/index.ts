import { handlerPath } from "@libs/handlerResolver";

export const findCameraDetailsById = {
  handler: `${handlerPath(__dirname)}/handler.getCameraDetailsById`,
  events: [
    {
      http: {
        method: "get",
        path: "camera-details/{fromemail}/{date1}/{date2}",
        cors: true,
        authorizer: {
          name: "authorizer",
          arn: "arn:aws:cognito-idp:us-east-1:962195032846:userpool/us-east-1_6ExNtggrn",
        },
      },
    },
  ],
};

export const findAllCameraDetails = {
  handler: `${handlerPath(__dirname)}/handler.getAllCameraDetails`,
  events: [
    {
      http: {
        method: "get",
        path: "camera-details",
        cors: true,
        authorizer: {
          name: "authorizer",
          arn: "arn:aws:cognito-idp:us-east-1:962195032846:userpool/us-east-1_6ExNtggrn",
        },
      },
    },
  ],
};

export const findCameraDetailsByUserId = {
  handler: `${handlerPath(__dirname)}/handler.getCameraDetailsByUserId`,
  events: [
    {
      http: {
        method: "get",
        path: "user-details/{userId}",
        cors: true,
      },
      authorizer: {
        name: "authorizer",
        arn: "arn:aws:cognito-idp:us-east-1:962195032846:userpool/us-east-1_6ExNtggrn",
      },
    },
  ],
};
