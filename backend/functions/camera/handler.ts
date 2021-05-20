import {
  formatJSONResponseStatusCreated,
  formatJSONResponseStatusOk,
  formatJSONResponseStatusBadRequest,
  formatJSONResponseStatusError,
  ValidatedEventAPIGatewayProxyEvent,
} from "@libs/apiGateway";
import { middyfy } from "@libs/lambda";
import db from "@models/db";
import CameraRequest from "./payload/request/CameraRequest";
import { CameraResponse } from "./payload/response/CameraResponse";
import schema from "./schema";

// Add a new Camera
const addNewCamera: ValidatedEventAPIGatewayProxyEvent<typeof schema> = async (
  event: any
) => {
  const camera: CameraRequest = { ...event.body };
  try {
    const savedCamera = await db.camera.create(camera);
    return formatJSONResponseStatusCreated({
      message: "Camera saved successfully...",
      savedCamera,
    });
  } catch (err) {
    console.error(err);
    return formatJSONResponseStatusError({
      message: "Some Error occured can't add the camera " + err,
    });
  }
};

const findCameraById = async (event) => {
  if (!event.pathParameters || !event.pathParameters.cameraId) {
    return formatJSONResponseStatusBadRequest({
      message: "Please provide Camera ID.",
    });
  }
  const cameraId = event.pathParameters.cameraId;
  try {
    const camera: CameraResponse = await db.camera.findOne({
      where: {
        cameraId,
      },
    });
    return formatJSONResponseStatusOk({
      camera,
    });
  } catch (err) {
    console.error(err);
    return formatJSONResponseStatusError({
      message: "Some Error occured can't find the camera " + err,
    });
  }
};

// Find All camera details
const findAllCameras = async () => {
  const cameras: CameraResponse[] = await db.camera.findAll({});
  return formatJSONResponseStatusOk({
    cameras,
  });
};

// Update Camera
const updateCamera = async (event) => {
  if (!event.pathParameters || !event.pathParameters.cameraId) {
    return formatJSONResponseStatusBadRequest({
      message: "Please provide Camera ID.",
    });
  }
  const camera: CameraRequest = { ...event.body };
  const cameraId = event.pathParameters.cameraId;
  try {
    const updatedCamera = await db.camera.update(camera, {
      where: {
        cameraId,
      },
    });
    return formatJSONResponseStatusOk({
      success: true,
      body: {
        message: "Camera updated successfully...",
        camera: updatedCamera,
      },
    });
  } catch (err) {
    return formatJSONResponseStatusError({
      message: "Some Error occured can't update the camera..." + err,
    });
  }
};

// Remove the camera.
const removeCamera = async (event) => {
  if (!event.pathParameters || !event.pathParameters.cameraId) {
    return formatJSONResponseStatusBadRequest({
      message: "Please provide Camera ID.",
    });
  }
  const cameraId = event.pathParameters.cameraId;
  try {
    await db.camera.destroy({
      where: {
        cameraId,
      },
    });
    return formatJSONResponseStatusOk({
      success: true,
      body: {
        message: "Camera deleted successfully...",
      },
    });
  } catch (err) {
    return formatJSONResponseStatusError({
      message: "Some Error occured can't delete the camera..." + err,
    });
  }
};

export const addCamera = middyfy(addNewCamera);
export const getCameraById = middyfy(findCameraById);
export const getAllCameras = middyfy(findAllCameras);
export const editCamera = middyfy(updateCamera);
export const deleteCamera = middyfy(removeCamera);
