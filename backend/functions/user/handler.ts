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
import { auth } from "./auth";

const prisma = new PrismaClient();

// Add a new User
const addNewUser: ValidatedEventAPIGatewayProxyEvent<typeof schema> = async (
  event: any
) => {
  try {
    const {
      user_email,
      group_id,
      site_ids,
      customer_ids,
      camera_ids,
      integrator_id,
    } = event.body;

    if (!site_ids) {
      return formatJSONResponseStatusBadRequest({
        message: constants.SITE_ID_NOT_PROVIDED_ERROR,
      });
    }
    if (!customer_ids) {
      return formatJSONResponseStatusBadRequest({
        message: constants.CUSTOMER_ID_NOT_PROVIDED_ERROR,
      });
    }
    if (!camera_ids) {
      return formatJSONResponseStatusBadRequest({
        message: constants.CAMERA_ID_NOT_PROVIDED_ERROR,
      });
    }

    await auth(user_email);

    const user = await prisma.users.create({
      data: {
        groups: {
          connect: { group_id },
        },
        integrators: {
          connect: { integrator_id },
        },
        user_email: user_email,
        customers: {
          connect: customer_ids.map((ci) => {
            return { customer_id: ci };
          }),
        },
        sites: {
          connect: site_ids.map((si) => {
            return { site_id: si };
          }),
        },
        cameras: {
          connect: camera_ids.map((ci) => {
            return { camera_id: ci };
          }),
        },
      },
      include: {
        customers: true,
        sites: true,
        cameras: true,
      },
    });

    return formatJSONResponseStatusCreated({
      message: constants.USER_SAVE,
      user,
    });
  } catch (error) {
    console.error(error);
    return formatJSONResponseStatusServerError({
      message: constants.SERVER_ERROR,
      error,
    });
  }
};

// Find an User by ID.
const findUserById = async (event) => {
  if (!event.pathParameters || !event.pathParameters.userId) {
    return formatJSONResponseStatusBadRequest({
      message: constants.USER_PATHPARAMETERS_ERROR,
    });
  }
  const user_id = event.pathParameters.userId;
  try {
    const user = await prisma.users.findUnique({
      where: {
        user_id,
      },
      select: {
        user_id: true,
        user_email: true,
        is_disabled: true,
        createdAt: true,
        updatedAt: true,
        groups: true,
        integrators: true,
        cameras: true,
        customers: {
          select: {
            customer_id: true,
            customer_name: true,
            change_name: true,
            is_disabled: true,
            group_id: true,
            integrator_id: true,
            createdAt: true,
            updatedAt: true,
            groups: true,
            integrators: true,
            sites: {
              select: {
                site_id: true,
                site_name: true,
                change_name: true,
                is_disabled: true,
                group_id: true,
                integrator_id: true,
                createdAt: true,
                updatedAt: true,
                cameras: true,
              },
            },
            users: true,
          },
        },
        sites: true,
      },
    });

    const camera_count_query = await prisma.$queryRaw(`SELECT c.camera_id
      FROM  "_camerasTousers" cu
      JOIN  cameras c ON cu."A" = c.camera_id
      JOIN  users u ON cu."B" = u.user_id
      WHERE u.user_id::text = '${user_id}'
      GROUP BY c.camera_id;`);

    const customer_count_query = await prisma.$queryRaw(`SELECT c.customer_id
      FROM  "_customersTousers" cu
      JOIN  customers c ON cu."A" = c.customer_id
      JOIN  users u ON cu."B" = u.user_id
      WHERE u.user_id::text = '${user_id}'
      GROUP BY c.customer_id;`);

    const site_count_query = await prisma.$queryRaw(`SELECT s.site_id
      FROM  "_sitesTousers" su
      JOIN  sites s ON su."A" = s.site_id
      JOIN  users u ON su."B" = u.user_id
      WHERE u.user_id::text = '${user_id}'
      GROUP BY s.site_id;`);

    const camera_count = camera_count_query.length;
    const customer_count = customer_count_query.length;
    const site_count = site_count_query.length;

    return formatJSONResponseStatusOk({
      user: {
        ...user,
        camera_count,
        customer_count,
        site_count,
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

// Find All user details
const findAllUsers = async () => {
  const users = await prisma.users.findMany({
    select: {
      user_id: true,
      user_email: true,
      is_disabled: true,
      createdAt: true,
      updatedAt: true,
      groups: true,
      integrators: true,
      cameras: true,
      customers: {
        select: {
          customer_id: true,
          customer_name: true,
          change_name: true,
          is_disabled: true,
          group_id: true,
          integrator_id: true,
          createdAt: true,
          updatedAt: true,
          groups: true,
          integrators: true,
          sites: {
            select: {
              site_id: true,
              site_name: true,
              change_name: true,
              is_disabled: true,
              group_id: true,
              integrator_id: true,
              createdAt: true,
              updatedAt: true,
              cameras: true,
            },
          },
          users: true,
        },
      },
      sites: true,
    },
  });

  const updated_users = await Promise.all(
    users.map(async (user) => {
      const user_id = user.user_id;
      const camera_count_query = await prisma.$queryRaw(`SELECT c.camera_id
      FROM  "_camerasTousers" cu
      JOIN  cameras c ON cu."A" = c.camera_id
      JOIN  users u ON cu."B" = u.user_id
      WHERE u.user_id::text = '${user_id}'
      GROUP BY c.camera_id;`);

      const customer_count_query = await prisma.$queryRaw(`SELECT c.customer_id
      FROM  "_customersTousers" cu
      JOIN  customers c ON cu."A" = c.customer_id
      JOIN  users u ON cu."B" = u.user_id
      WHERE u.user_id::text = '${user_id}'
      GROUP BY c.customer_id;`);

      const site_count_query = await prisma.$queryRaw(`SELECT s.site_id
      FROM  "_sitesTousers" su
      JOIN  sites s ON su."A" = s.site_id
      JOIN  users u ON su."B" = u.user_id
      WHERE u.user_id::text = '${user_id}'
      GROUP BY s.site_id;`);

      const camera_count = camera_count_query.length;
      const customer_count = customer_count_query.length;
      const site_count = site_count_query.length;

      return {
        ...user,
        camera_count,
        customer_count,
        site_count,
      };
    })
  );

  return formatJSONResponseStatusOk({
    users: updated_users,
  });
};

// Update User
const updateUser: ValidatedEventAPIGatewayProxyEvent<typeof schema> = async (
  event
) => {
  if (!event.pathParameters || !event.pathParameters.userId) {
    return formatJSONResponseStatusBadRequest({
      message: constants.USER_PATHPARAMETERS_ERROR,
    });
  }
  const {
    user_email,
    group_id,
    site_ids,
    customer_ids,
    camera_ids,
    integrator_id,
  } = event.body;
  const user_id = event.pathParameters.userId;

  try {
    await prisma.users.update({
      where: {
        user_id,
      },
      data: {
        groups: {
          connect: { group_id },
        },
        integrators: {
          connect: { integrator_id },
        },
        user_email: user_email,
        customers: {
          connect: customer_ids.map((ci) => {
            return { customer_id: ci };
          }),
        },
        sites: {
          connect: site_ids.map((si) => {
            return { site_id: si };
          }),
        },
        cameras: {
          connect: camera_ids.map((ci) => {
            return { camera_id: ci };
          }),
        },
      },
    });
    return formatJSONResponseStatusOk({
      message: constants.USER_UPDATE,
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
const disiableUser = async (event) => {
  if (!event.pathParameters || !event.pathParameters.userId) {
    return formatJSONResponseStatusBadRequest({
      message: constants.USER_PATHPARAMETERS_ERROR,
    });
  }

  const user_id = event.pathParameters.userId;
  const { is_disabled } = event.body;

  try {
    await prisma.users.update({
      where: {
        user_id,
      },
      data: { is_disabled },
    });
    return formatJSONResponseStatusOk({
      message: constants.USER_UPDATE,
    });
  } catch (error) {
    console.error(error);
    return formatJSONResponseStatusServerError({
      message: constants.SERVER_ERROR,
      error,
    });
  }
};

// Remove the users.
const removeUser = async (event) => {
  if (!event.pathParameters || !event.pathParameters.userId) {
    return formatJSONResponseStatusBadRequest({
      message: constants.USER_PATHPARAMETERS_ERROR,
    });
  }
  const user_id = event.pathParameters.userId;
  try {
    await prisma.users.delete({
      where: {
        user_id,
      },
    });
    return formatJSONResponseStatusOk({
      message: constants.USER_DELETE,
    });
  } catch (error) {
    console.error(error);
    return formatJSONResponseStatusServerError({
      message: constants.SERVER_ERROR,
      error,
    });
  }
};

export const addUser = middyfy(addNewUser);
export const getUserById = middyfy(findUserById);
export const getAllUsers = middyfy(findAllUsers);
export const editUser = middyfy(updateUser);
export const editDisableUser = middyfy(disiableUser);
export const deleteUser = middyfy(removeUser);
