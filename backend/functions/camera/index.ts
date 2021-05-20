import { handlerPath } from "@libs/handlerResolver";
import schema from "./schema";

export const addNewCamera = {
  handler: `${handlerPath(__dirname)}/handler.addCamera`,
  events: [
    {
      http: {
        method: "post",
        path: "cameras/add-camera",
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
      },
    },
  ],
};

export const updateCamera = {
  handler: `${handlerPath(__dirname)}/handler.editCamera`,
  events: [
    {
      http: {
        method: "put",
        path: "cameras/{cameraId}",
        request: {
          schema: {
            "application/json": schema,
          },
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
      },
    },
  ],
};
