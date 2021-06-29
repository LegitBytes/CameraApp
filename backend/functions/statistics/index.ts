import { handlerPath } from "@libs/handlerResolver";

export const groupCameraByEmail = {
  handler: `${handlerPath(__dirname)}/handler.findGroupCameraByEmail`,
  events: [
    {
      http: {
        method: "get",
        path: "camera-total-count/",
        cors: true,
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
