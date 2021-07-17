import schema from "./schema";
import {
  formatJSONResponseStatusBadRequest,
  formatJSONResponseStatusCreated,
  formatJSONResponseStatusOk,
  formatJSONResponseStatusServerError,
  ValidatedEventAPIGatewayProxyEvent,
} from "@libs/apiGateway";
import constants from "@libs/constants";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// Add a new Group
const addNewGroup: ValidatedEventAPIGatewayProxyEvent<typeof schema> = async (
  event: any
) => {
  try {
    const { group_name, integrator_id } = JSON.parse(event.body);
    const group = await prisma.groups.create({
      data: {
        group_name,
        integrator_id,
      },
    });

    return formatJSONResponseStatusCreated({
      message: constants.GROUP_SAVE,
      group,
    });
  } catch (error) {
    console.error(error);
    return formatJSONResponseStatusServerError({
      message: constants.SERVER_ERROR,
      error,
    });
  }
};

// Find an Group by ID.
const findGroupById = async (event) => {
  if (!event.pathParameters || !event.pathParameters.groupId) {
    return formatJSONResponseStatusBadRequest({
      message: constants.GROUP_PATHPARAMETERS_ERROR,
    });
  }
  const group_id = event.pathParameters.groupId;
  try {
    const group = await prisma.groups.findUnique({
      where: {
        group_id,
      },
      select: {
        group_id: true,
        group_name: true,
        is_disabled: true,
        createdAt: true,
        updatedAt: true,
        integrators: true,
        cameras: true,
        customers: true,
        sites: true,
        users: true,
      },
    });

    const camera_count = await prisma.cameras.count({
      where: { group_id },
    });
    const customer_count = await prisma.customers.count({
      where: { group_id },
    });
    const site_count = await prisma.sites.count({ where: { group_id } });
    const user_count = await prisma.users.count({ where: { group_id } });

    return formatJSONResponseStatusOk({
      group: {
        ...group,
        camera_count,
        customer_count,
        site_count,
        user_count,
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

// Find All group details
const findAllGroups = async () => {
  const groups = await prisma.groups.findMany({
    select: {
      group_id: true,
      group_name: true,
      is_disabled: true,
      createdAt: true,
      updatedAt: true,
      integrators: true,
      cameras: true,
      customers: true,
      sites: true,
      users: true,
    },
  });

  const updated_groups = await Promise.all(
    groups.map(async (group) => {
      const group_id = group.group_id;
      const camera_count = await prisma.cameras.count({
        where: { group_id },
      });
      const customer_count = await prisma.customers.count({
        where: { group_id },
      });
      const site_count = await prisma.sites.count({ where: { group_id } });
      const user_count = await prisma.users.count({ where: { group_id } });

      return {
        ...group,
        camera_count,
        customer_count,
        site_count,
        user_count,
      };
    })
  );

  return formatJSONResponseStatusOk({
    groups: updated_groups,
  });
};

// Update Group
const updateGroup: ValidatedEventAPIGatewayProxyEvent<typeof schema> = async (
  event:any
) => {
  if (!event.pathParameters || !event.pathParameters.groupId) {
    return formatJSONResponseStatusBadRequest({
      message: constants.GROUP_PATHPARAMETERS_ERROR,
    });
  }
  const { group_name, integrator_id } = JSON.parse(event.body);
  const group_id = event.pathParameters.groupId;
  try {
    await prisma.groups.update({
      where: {
        group_id,
      },
      data: { group_name, integrator_id },
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

// Update is_disiable
const disiableGroup = async (event) => {
  if (!event.pathParameters || !event.pathParameters.groupId) {
    return formatJSONResponseStatusBadRequest({
      message: constants.GROUP_PATHPARAMETERS_ERROR,
    });
  }

  const group_id = event.pathParameters.groupId;
  const { is_disabled } = JSON.parse(event.body);

  try {
    await prisma.groups.update({
      where: {
        group_id,
      },
      data: { is_disabled },
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

// Remove the group.
const removeGroup = async (event) => {
  if (!event.pathParameters || !event.pathParameters.groupId) {
    return formatJSONResponseStatusBadRequest({
      message: constants.GROUP_PATHPARAMETERS_ERROR,
    });
  }
  const group_id = event.pathParameters.groupId;
  try {
    await prisma.groups.delete({
      where: {
        group_id,
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

export const addGroup = addNewGroup;
export const getGroupById = findGroupById;
export const getAllGroups = findAllGroups;
export const editGroup = updateGroup;
export const editDisableGroup = disiableGroup;
export const deleteGroup = removeGroup;
