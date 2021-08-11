import { handlerPath } from "@libs/handlerResolver";

export const groupCameraByEmail = {
  handler: `${handlerPath(__dirname)}/handler.findGroupCameraByEmail`,
  events: [
    {
      http: {
        method: "get",
        path: "camera-total-count/",
        cors: true,
        authorizer: {
          name: "authorizer",
          arn: "arn:aws:cognito-idp:us-east-1:962195032846:userpool/us-east-1_6ExNtggrn",
        },
      },
    },
  ],
};

// export const findAllCameraDetails = {
//   handler: `${handlerPath(__dirname)}/handler.getAllCameraDetails`,
//   events: [
//     {
//       http: {
//         method: "get",
//         path: "camera-details",
//         cors: true,
//       },
//     },
//   ],
// };
