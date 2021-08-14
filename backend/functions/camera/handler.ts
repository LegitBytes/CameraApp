import schema from "./schema";
import {
  formatJSONResponseStatusBadRequest,
  formatJSONResponseStatusCreated,
  formatJSONResponseStatusOk,
  formatJSONResponseStatusServerError,
  formatJSONResponseStatusUnAuthorized,
  ValidatedEventAPIGatewayProxyEvent,
} from "@libs/apiGateway";
import constants from "@libs/constants";
import { PrismaClient, Prisma } from "@prisma/client";
import { isAuthorized } from "@libs/authUtil";
import * as AWS from "aws-sdk";
import { generatePassword } from "./generatePassword";
import * as randomWords from "random-words";

const prisma = new PrismaClient();

const iam = new AWS.IAM();

const response = (statusCode, message) => {
  return {
    statusCode,
    body: JSON.stringify(message),
    headers: {
      "Access-Control-Allow-Headers": "Content-Type",
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "OPTIONS,POST,GET,PUT,DELETE,PATCH",
    },
  };
};

// Add a new Camera
const addNewCamera: ValidatedEventAPIGatewayProxyEvent<typeof schema> = async (
  event: any
) => {
  const userName = event.requestContext.authorizer.claims.sub;
  if (
    (await isAuthorized(userName, "AdminGroup")) ||
    (await isAuthorized(userName, "IntegratorGroup"))
  ) {
    try {
      console.log(JSON.parse(event.body));
      // const camera_id = uuidv4();

      let fromEmail: string = randomWords({ exactly: 2, join: "_" }) + process.env.DOMAIN;
      // do {
        // fromEmail = randomWords({ exactly: 2, join: "_" }) + process.env.DOMAIN;
      // } while (isCameraEmailExists(fromEmail));

      console.log("fromEmail :: ", fromEmail);

      const { camera_name, group_id, integrator_id } = JSON.parse(event.body);

      if (JSON.parse(event.body).camera_ip) {
        const {
          SecretAccessKey: secretAccessKey,
          AccessKeyId: smtp_user_name,
        } = await createSMTPCredential(fromEmail, fromEmail);
        const smtp_password = generatePassword(secretAccessKey);
        let camera : any = await createCameraInPrisma(fromEmail, camera_name, smtp_user_name, smtp_password, event, group_id, integrator_id);
        while (!camera.result) {
          fromEmail = randomWords({ exactly: 2, join: "_" }) + process.env.DOMAIN;
          camera = await createCameraInPrisma(fromEmail, camera_name, smtp_user_name, smtp_password, event, group_id, integrator_id);
        }
        return formatJSONResponseStatusCreated({
          message: constants.CAMERA_SAVE,
          camera,
        });
      }

      // if (JSON.parse(event.body).user_ids) {
      //   const users = JSON.parse(event.body).user_ids.map(
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

      const { SecretAccessKey: secretAccessKey, AccessKeyId: smtp_user_name } =
        await createSMTPCredential(fromEmail, fromEmail);
      const smtp_password = generatePassword(secretAccessKey);

      const camera = await prisma.cameras.create({
        data: {
          camera_id: fromEmail,
          camera_name,
          smtp_user_name,
          smtp_password,
          group_id,
          integrator_id,
          email: fromEmail,
        },
      });

      console.log("Camera :: ", camera);

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
  } else {
    return formatJSONResponseStatusUnAuthorized({
      message: constants.NOT_AUTHORIZED,
    });
  }
};

// Find an Camera by ID.
const findCameraById = async (event) => {
  const userName = event.requestContext.authorizer.claims.sub;
  if (
    (await isAuthorized(userName, "AdminGroup")) ||
    (await isAuthorized(userName, "IntegratorGroup")) ||
    (await isAuthorized(userName, "UserGroup"))
  ) {
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
  } else {
    return formatJSONResponseStatusUnAuthorized({
      message: constants.NOT_AUTHORIZED,
    });
  }
};

// Find All camera details
const findAllCameras = async (event) => {
  const userName = event.requestContext.authorizer.claims.sub;
  if (
    (await isAuthorized(userName, "AdminGroup")) ||
    (await isAuthorized(userName, "IntegratorGroup"))
  ) {
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
  } else {
    return formatJSONResponseStatusUnAuthorized({
      message: constants.NOT_AUTHORIZED,
    });
  }
};

// const isCameraEmailExists = async (email: string): Promise<boolean> => {
//   try {
//     const camera = await prisma.cameras.findUnique({
//       where: {
//         email,
//       },
//     });

//     console.log({ ...camera });

//     return camera ? true : false;
//   } catch (error) {
//     console.error("isCameraEmailExists :: ", error);
//   }
// };

// Update Camera
const updateCamera: ValidatedEventAPIGatewayProxyEvent<typeof schema> = async (
  event: any
) => {
  const userName = event.requestContext.authorizer.claims.sub;
  if (
    (await isAuthorized(userName, "AdminGroup")) ||
    (await isAuthorized(userName, "IntegratorGroup"))
  ) {
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
    } = JSON.parse(event.body);
    const camera_id = event.pathParameters.cameraId;

    if (JSON.parse(event.body).camera_ip) {
      const camera = await prisma.cameras.update({
        where: {
          camera_id,
        },
        data: {
          camera_name,
          camera_ip: JSON.parse(event.body).camera_ip,
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
      // await prisma.cameras.delete({
      //   where: {
      //     camera_id,
      //   },
      // });

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
  } else {
    return formatJSONResponseStatusUnAuthorized({
      message: constants.NOT_AUTHORIZED,
    });
  }
};

// Update is_disiable
const disiableCamera = async (event) => {
  const userName = event.requestContext.authorizer.claims.sub;
  if (
    (await isAuthorized(userName, "AdminGroup")) ||
    (await isAuthorized(userName, "IntegratorGroup"))
  ) {
    if (!event.pathParameters || !event.pathParameters.cameraId) {
      return formatJSONResponseStatusBadRequest({
        message: constants.CAMERA_PATHPARAMETERS_ERROR,
      });
    }

    const camera_id = event.pathParameters.cameraId;
    const { is_disabled } = JSON.parse(event.body);

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
  } else {
    return formatJSONResponseStatusUnAuthorized({
      message: constants.NOT_AUTHORIZED,
    });
  }
};

// Update change_name
const updateChangeName = async (event) => {
  const userName = event.requestContext.authorizer.claims.sub;
  if (
    (await isAuthorized(userName, "AdminGroup")) ||
    (await isAuthorized(userName, "IntegratorGroup")) ||
    (await isAuthorized(userName, "UserGroup"))
  ) {
    if (!event.pathParameters || !event.pathParameters.cameraId) {
      return formatJSONResponseStatusBadRequest({
        message: constants.CAMERA_PATHPARAMETERS_ERROR,
      });
    }

    const camera_id = event.pathParameters.cameraId;
    const { change_name } = JSON.parse(event.body);

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
  } else {
    return formatJSONResponseStatusUnAuthorized({
      message: constants.NOT_AUTHORIZED,
    });
  }
};

// Remove the cameras.
const removeCamera = async (event) => {
  const userName = event.requestContext.authorizer.claims.sub;
  if (
    (await isAuthorized(userName, "AdminGroup")) ||
    (await isAuthorized(userName, "IntegratorGroup"))
  ) {
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
  } else {
    return formatJSONResponseStatusUnAuthorized({
      message: constants.NOT_AUTHORIZED,
    });
  }
};

const createSMTPCredential = async (
  camera_id,
  fromEmail: string
): Promise<AWS.IAM.AccessKey> => {
  const params = { UserName: camera_id };

  // IAM - createUser
  try {
    await iam.createUser(params).promise();
  } catch (error) {
    console.log("Catch Block createSMTPCredential -> createUser :: ", error);
    throw response(500, error);
  }

  //  IAM - addUserToGroup
  const addUserToGroupParams = { GroupName: "Camera", UserName: camera_id };
  try {
    await iam.addUserToGroup(addUserToGroupParams).promise();
  } catch (error) {
    console.log("Catch Block addUserToGroup :: ", error);
    throw response(500, error);
  }

  // IAM - putUserPolicy
  const toEmail: string = process.env.RECIPIENT;
  console.log("toEmail :: ", toEmail);

  const putUserPolicyParams = {
    // PolicyDocument: JSON.stringify(policy),
    PolicyDocument: `{"Version":"2012-10-17","Statement":{"Effect":"Allow","Action":["ses:SendEmail","ses:SendRawEmail"],"Resource":"*","Condition":{"ForAllValues:StringLike":{"ses:Recipients":[${toEmail}]},"StringEquals":{"ses:FromAddress":${fromEmail}}}}}`,
    PolicyName: "SESAllAccessPolicy",
    UserName: camera_id,
  };
  try {
    await iam.putUserPolicy(putUserPolicyParams).promise();
  } catch (error) {
    console.log("Catch Block createSMTPCredential -> putUserPolicy :: ", error);
    throw response(500, error);
  }

  // IAM - createAccessKey
  try {
    const accessKey = await (
      await iam.createAccessKey(params).promise()
    ).AccessKey;
    console.log("SecretAccessKey :: ", accessKey);
    return accessKey;
  } catch (error) {
    console.log(
      "Catch Block createSMTPCredential -> createAccessKey :: ",
      error
    );
    throw response(500, error);
  }
};

export const addCamera = addNewCamera;
export const getCameraById = findCameraById;
export const getAllCameras = findAllCameras;
export const editCamera = updateCamera;
export const editDisableCamera = disiableCamera;
export const editChangeName = updateChangeName;
export const deleteCamera = removeCamera;
const createCameraInPrisma = async (fromEmail: string, camera_name: any, smtp_user_name: string, smtp_password: string, event: any, group_id: any, integrator_id: any) : Promise<object>  => {
  try {
    const camera = await prisma.cameras.create({
      data: {
        camera_id: fromEmail,
        camera_name,
        smtp_user_name,
        smtp_password,
        camera_ip: JSON.parse(event.body).camera_ip,
        group_id,
        integrator_id,
        email: fromEmail,
      },
    });
    return {...camera, result: true};
  } catch (e) {
    if (e instanceof Prisma.PrismaClientKnownRequestError) {
      // The .code property can be accessed in a type-safe manner
      if (e.code === 'P2002') {
        console.log(
          'There is a unique constraint violation, a new user cannot be created with this email'
        );
        return {result: false};
      }
    }
  }
}
