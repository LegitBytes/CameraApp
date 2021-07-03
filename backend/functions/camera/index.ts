import { handlerPath } from "@libs/handlerResolver";
import schema from "./schema";

export const addNewCamera = {
  handler: `${handlerPath(__dirname)}/handler.addCamera`,
  provisionedConcurrency: 1,
  events: [
    {
      http: {
        method: "post",
        path: "cameras/add-camera",
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

export const findCameraById = {
  handler: `${handlerPath(__dirname)}/handler.getCameraById`,
  provisionedConcurrency: 1,
  events: [
    {
      http: {
        method: "get",
        path: "cameras/{cameraId}",
        cors: true,
      },
    },
  ],
};

export const findAllCameras = {
  handler: `${handlerPath(__dirname)}/handler.getAllCameras`,
  provisionedConcurrency: 1,
  events: [
    {
      http: {
        method: "get",
        path: "cameras",
        cors: true,
      },
    },
  ],
};

export const updateCamera = {
  handler: `${handlerPath(__dirname)}/handler.editCamera`,
  provisionedConcurrency: 1,
  events: [
    {
      http: {
        method: "patch",
        path: "cameras/{cameraId}",
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

export const disiableCamera = {
  handler: `${handlerPath(__dirname)}/handler.editDisableCamera`,
  provisionedConcurrency: 1,
  events: [
    {
      http: {
        method: "patch",
        path: "cameras/disable-camera/{cameraId}",
        cors: true,
      },
    },
  ],
};

export const removeCamera = {
  handler: `${handlerPath(__dirname)}/handler.deleteCamera`,
  provisionedConcurrency: 1,
  events: [
    {
      http: {
        method: "delete",
        path: "cameras/{cameraId}",
        cors: true,
      },
    },
  ],
};
