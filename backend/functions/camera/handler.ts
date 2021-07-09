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
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// Add a new Camera
const addNewCamera: ValidatedEventAPIGatewayProxyEvent<typeof schema> = async (
  event: any
) => {
  try {
    console.log(event.body);

    const {
      camera_name,
      smtp_user_name,
      smtp_password,
      group_id,
      integrator_id,
    } = event.body;

    if (event.body.camera_ip) {
      const camera = await prisma.cameras.create({
        data: {
          camera_name,
          camera_ip: event.body.camera_ip,
          smtp_user_name,
          smtp_password,
          group_id,
          integrator_id,
        },
      });
      return formatJSONResponseStatusCreated({
        message: constants.CAMERA_SAVE,
        camera,
      });
    }

    // if (event.body.user_ids) {
    //   const users = event.body.user_ids.map(
    //     async (user_id: string) =>
    //       await prisma.users.findUnique({ where: { user_id } })
    //   );
    //   const camera = await prisma.cameras.create({
    //     data: {
    //       camera_name,
    //       smtp_user_name,
    //       smtp_password,
    //       group_id,
    //       integrator_id,
    //       users: {
    //         create: users,
    //       },
    //     },
    //   });
    //   return formatJSONResponseStatusCreated({
    //     message: constants.CAMERA_SAVE,
    //     camera,
    //   });
    // }

    const camera = await prisma.cameras.create({
      data: {
        camera_name,
        smtp_user_name,
        smtp_password,
        group_id,
        integrator_id,
      },
    });
    return formatJSONResponseStatusCreated({
      message: constants.CAMERA_SAVE,
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
      message: constants.CAMERA_PATHPARAMETERS_ERROR,
    });
  }
  const camera_id = event.pathParameters.cameraId;
  try {
    const camera = await prisma.cameras.findUnique({
      where: {
        camera_id,
      },
      select: {
        camera_id: true,
        camera_name: true,
        smtp_user_name: true,
        smtp_password: true,
        is_disabled: true,
        change_name: true,
        groups: true,
        sites: true,
        integrators: true,
        users: true,
      },
    });

    console.log({ ...camera });

    return formatJSONResponseStatusOk({
      camera: {
        ...camera,
        total_request: 0,
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
  const cameras = await prisma.cameras.findMany({
    select: {
      camera_id: true,
      camera_name: true,
      smtp_user_name: true,
      smtp_password: true,
      is_disabled: true,
      change_name: true,
      groups: true,
      sites: true,
      integrators: true,
      users: true,
    },
  });
  console.log({ ...cameras });
  const new_camera = cameras.map((camera) => {
    return { ...camera, total_request: 0 };
  });
  console.log({ ...new_camera });
  return formatJSONResponseStatusOk({
    cameras: new_camera,
  });
};

// Update Camera
const updateCamera: ValidatedEventAPIGatewayProxyEvent<typeof schema> = async (
  event
) => {
  if (!event.pathParameters || !event.pathParameters.cameraId) {
    return formatJSONResponseStatusBadRequest({
      message: constants.CAMERA_PATHPARAMETERS_ERROR,
    });
  }
  const {
    camera_name,
    smtp_user_name,
    smtp_password,
    group_id,
    integrator_id,
  } = event.body;
  const camera_id = event.pathParameters.cameraId;

  if (event.body.camera_ip) {
    const camera = await prisma.cameras.create({
      data: {
        camera_name,
        camera_ip: event.body.camera_ip,
        smtp_user_name,
        smtp_password,
        group_id,
        integrator_id,
      },
    });
    return formatJSONResponseStatusCreated({
      message: constants.CAMERA_SAVE,
      camera,
    });
  }

  try {
    await prisma.cameras.update({
      where: {
        camera_id,
      },
      data: {
        camera_name,
        smtp_user_name,
        smtp_password,
        group_id,
        integrator_id,
      },
    });
    return formatJSONResponseStatusOk({
      message: constants.CAMERA_UPDATE,
    });
  } catch (error) {
    console.error(error);
    return formatJSONResponseStatusServerError({
      message: constants.SERVER_ERROR,
      error,
    });
  }
};

// Update is_disiable
const disiableCamera = async (event) => {
  if (!event.pathParameters || !event.pathParameters.cameraId) {
    return formatJSONResponseStatusBadRequest({
      message: constants.CAMERA_PATHPARAMETERS_ERROR,
    });
  }

  const camera_id = event.pathParameters.cameraId;
  const { is_disabled } = event.body;

  try {
    await prisma.cameras.update({
      where: {
        camera_id,
      },
      data: { is_disabled },
    });
    return formatJSONResponseStatusOk({
      message: constants.CAMERA_UPDATE,
    });
  } catch (error) {
    console.error(error);
    return formatJSONResponseStatusServerError({
      message: constants.SERVER_ERROR,
      error,
    });
  }
};

// Update change_name
const updateChangeName = async (event) => {
  if (!event.pathParameters || !event.pathParameters.cameraId) {
    return formatJSONResponseStatusBadRequest({
      message: constants.CAMERA_PATHPARAMETERS_ERROR,
    });
  }

  const camera_id = event.pathParameters.cameraId;
  const { change_name } = event.body;

  try {
    await prisma.cameras.update({
      where: {
        camera_id,
      },
      data: { change_name },
    });
    return formatJSONResponseStatusOk({
      message: constants.CAMERA_UPDATE,
    });
  } catch (error) {
    console.error(error);
    return formatJSONResponseStatusServerError({
      message: constants.SERVER_ERROR,
      error,
    });
  }
};

// Remove the cameras.
const removeCamera = async (event) => {
  if (!event.pathParameters || !event.pathParameters.cameraId) {
    return formatJSONResponseStatusBadRequest({
      message: constants.CAMERA_PATHPARAMETERS_ERROR,
    });
  }
  const camera_id = event.pathParameters.cameraId;
  try {
    await prisma.cameras.delete({
      where: {
        camera_id,
      },
    });
    return formatJSONResponseStatusOk({
      message: constants.CAMERA_DELETE,
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
export const editDisableCamera = middyfy(disiableCamera);
export const editChangeName = middyfy(updateChangeName);
export const deleteCamera = middyfy(removeCamera);
