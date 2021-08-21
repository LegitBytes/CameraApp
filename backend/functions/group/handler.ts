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
import { PrismaClient } from "@prisma/client";
import { isAuthorized } from "@libs/authUtil";

const prisma = new PrismaClient();

// Add a new Group
const addNewGroup: ValidatedEventAPIGatewayProxyEvent<typeof schema> = async (
  event: any
) => {
  const userName = event.requestContext.authorizer.claims.sub;
  if (
    (await isAuthorized(userName, "AdminGroup")) ||
    (await isAuthorized(userName, "IntegratorGroup"))
  ) {
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
  } else {
    return formatJSONResponseStatusUnAuthorized({
      message: constants.NOT_AUTHORIZED,
    });
  }
};

// Find an Group by ID.
const findGroupById = async (event) => {
  const userName = event.requestContext.authorizer.claims.sub;
  if (
    (await isAuthorized(userName, "AdminGroup")) ||
    (await isAuthorized(userName, "IntegratorGroup")) ||
    (await isAuthorized(userName, "UserGroup"))
  ) {
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
  } else {
    return formatJSONResponseStatusUnAuthorized({
      message: constants.NOT_AUTHORIZED,
    });
  }
};

// Find All group details
const findAllGroups = async (event) => {
  const userName = event.requestContext.authorizer.claims.sub;
  if (
    (await isAuthorized(userName, "AdminGroup")) ||
    (await isAuthorized(userName, "IntegratorGroup"))
  ) {
    if (await isAuthorized(userName, "AdminGroup")) {
      console.log("AdminGroup findAllGroups.");

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
    } else if (await isAuthorized(userName, "IntegratorGroup")) {
      const integrator_id =
        event.requestContext.authorizer.claims["custom:integrator_id"];
      console.log(
        "integrator_id inside findAllGroups method :: ",
        integrator_id
      );
      const groups = await prisma.groups.findMany({
        where: {
          integrator_id,
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
    }
  } else {
    return formatJSONResponseStatusUnAuthorized({
      message: constants.NOT_AUTHORIZED,
    });
  }
};

// Update Group
const updateGroup: ValidatedEventAPIGatewayProxyEvent<typeof schema> = async (
  event: any
) => {
  const userName = event.requestContext.authorizer.claims.sub;
  if (
    (await isAuthorized(userName, "AdminGroup")) ||
    (await isAuthorized(userName, "IntegratorGroup"))
  ) {
    if (!event.pathParameters || !event.pathParameters.groupId) {
      return formatJSONResponseStatusBadRequest({
        message: constants.GROUP_PATHPARAMETERS_ERROR,
      });
    }
    const { group_name, integrator_id } = JSON.parse(event.body);
    const group_id = event.pathParameters.groupId;
    try {
      await prisma.groups.delete({
        where: {
          group_id,
        },
      });

      await prisma.groups.upsert({
        where: {
          group_id,
        },
        update: { group_name, integrator_id },
        create: { group_id, group_name, integrator_id },
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
  } else {
    return formatJSONResponseStatusUnAuthorized({
      message: constants.NOT_AUTHORIZED,
    });
  }
};

// Update is_disiable
const disiableGroup = async (event) => {
  const userName = event.requestContext.authorizer.claims.sub;
  if (
    (await isAuthorized(userName, "AdminGroup")) ||
    (await isAuthorized(userName, "IntegratorGroup"))
  ) {
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
  } else {
    return formatJSONResponseStatusUnAuthorized({
      message: constants.NOT_AUTHORIZED,
    });
  }
};

// Remove the group.
const removeGroup = async (event) => {
  const userName = event.requestContext.authorizer.claims.sub;
  if (
    (await isAuthorized(userName, "AdminGroup")) ||
    (await isAuthorized(userName, "IntegratorGroup"))
  ) {
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
  } else {
    return formatJSONResponseStatusUnAuthorized({
      message: constants.NOT_AUTHORIZED,
    });
  }
};

export const addGroup = addNewGroup;
export const getGroupById = findGroupById;
export const getAllGroups = findAllGroups;
export const editGroup = updateGroup;
export const editDisableGroup = disiableGroup;
export const deleteGroup = removeGroup;
