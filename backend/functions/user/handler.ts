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
    const sites = site_ids.map(
      async (site_id: string) =>
        await prisma.sites.findUnique({ where: { site_id } })
    );

    const customers = customer_ids.map(
      async (customer_id: string) =>
        await prisma.customers.findUnique({ where: { customer_id } })
    );

    const cameras = camera_ids.map(
      async (camera_id: string) =>
        await prisma.cameras.findUnique({ where: { camera_id } })
    );

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
          create: customers,
        },
        sites: {
          create: sites,
        },
        cameras: {
          create: cameras,
        },
      },
      include: {
        customers: true,
        sites: true,
        cameras: true,
      },
    });

    return formatJSONResponseStatusCreated({
      message: constants.GROUP_SAVE,
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
      message: constants.GROUP_PATHPARAMETERS_ERROR,
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
        customers: true,
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
      JOIN  users u ON cu."B" = u.user_id
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
      customers: true,
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
      JOIN  users u ON cu."B" = u.user_id
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
      message: constants.GROUP_PATHPARAMETERS_ERROR,
    });
  }
  const user = { ...event.body };
  const user_id = event.pathParameters.userId;
  try {
    await prisma.users.update({
      where: {
        user_id,
      },
      data: user,
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

// Remove the users.
const removeUser = async (event) => {
  if (!event.pathParameters || !event.pathParameters.userId) {
    return formatJSONResponseStatusBadRequest({
      message: constants.GROUP_PATHPARAMETERS_ERROR,
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

export const addUser = middyfy(addNewUser);
export const getUserById = middyfy(findUserById);
export const getAllUsers = middyfy(findAllUsers);
export const editUser = middyfy(updateUser);
export const deleteUser = middyfy(removeUser);
