import schema from "./schema";
import {
  formatJSONResponseStatusBadRequest,
  formatJSONResponseStatusCreated,
  formatJSONResponseStatusOk,
  formatJSONResponseStatusServerError,
  ValidatedEventAPIGatewayProxyEvent,
} from "@libs/apiGateway";
import { middyfy } from "@libs/lambda";
import constants from "@libs/constants";


// Add a new Camera
const addNewCamera: ValidatedEventAPIGatewayProxyEvent<typeof schema> = async (
  event: any
) => {
  try {
    const camera = await db.camera.create({
      ...event.body,
    });

    return formatJSONResponseStatusCreated({
      message: constants.GROUP_SAVE,
      camera,
    });
  } catch (error) {
    console.error(error);
    return formatJSONResponseStatusServerError({
      message: constants.SERVER_ERROR,
      error,
    });
  }
};

// Find an Camera by ID.
const findCameraById = async (event) => {
  if (!event.pathParameters || !event.pathParameters.cameraId) {
    return formatJSONResponseStatusBadRequest({
      message: constants.GROUP_PATHPARAMETERS_ERROR,
    });
  }
  const camera_id = event.pathParameters.cameraId;
  try {
    const camera = await db.camera.findOne({
      where: {
        camera_id,
      },
    });
    const number_of_users = 
    return formatJSONResponseStatusOk({
      camera: {
        ...camera, number_of_users
      },
    });
  } catch (error) {
    console.error(error);
    return formatJSONResponseStatusServerError({
      message: constants.SERVER_ERROR,
      error,
    });
  }
};

// Find All camera details
const findAllCameras = async () => {
  const cameras = await db.camera.findAll({});
  return formatJSONResponseStatusOk({
    cameras,
  });
};

// Update Camera
const updateCamera: ValidatedEventAPIGatewayProxyEvent<typeof schema> = async (
  event
) => {
  if (!event.pathParameters || !event.pathParameters.cameraId) {
    return formatJSONResponseStatusBadRequest({
      message: constants.GROUP_PATHPARAMETERS_ERROR,
    });
  }
  const camera = { ...event.body };
  const camera_id = event.pathParameters.cameraId;
  try {
    await db.camera.update(camera, {
      where: {
        camera_id,
      },
    });
    return formatJSONResponseStatusOk({
      message: constants.GROUP_UPDATE,
    });
  } catch (error) {
    console.error(error);
    return formatJSONResponseStatusServerError({
      message: constants.SERVER_ERROR,
      error,
    });
  }
};

// Remove the camera.
const removeCamera = async (event) => {
  if (!event.pathParameters || !event.pathParameters.cameraId) {
    return formatJSONResponseStatusBadRequest({
      message: constants.GROUP_PATHPARAMETERS_ERROR,
    });
  }
  const camera_id = event.pathParameters.cameraId;
  try {
    await db.camera.destroy({
      where: {
        camera_id,
      },
    });
    return formatJSONResponseStatusOk({
      message: constants.GROUP_DELETE,
    });
  } catch (error) {
    console.error(error);
    return formatJSONResponseStatusServerError({
      message: constants.SERVER_ERROR,
      error,
    });
  }
};

export const addCamera = middyfy(addNewCamera);
export const getCameraById = middyfy(findCameraById);
export const getAllCameras = middyfy(findAllCameras);
export const editCamera = middyfy(updateCamera);
export const deleteCamera = middyfy(removeCamera);
