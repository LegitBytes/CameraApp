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

// Add a new Site
const addNewSite: ValidatedEventAPIGatewayProxyEvent<typeof schema> = async (
  event: any
) => {
  try {
    const {
      site_name,
      group_id,
      integrator_id,
      user_ids,
      customer_ids,
      camera_ids,
    } = JSON.parse(event.body);

    // const users = user_ids.map(
    //   async (user_id: string) =>
    //     await prisma.users.findUnique({ where: { user_id } })
    // );

    // const customers = customer_ids.map(
    //   async (customer_id: string) =>
    //     await prisma.customers.findUnique({ where: { customer_id } })
    // );

    // const cameras = camera_ids.map(
    //   async (camera_id: string) =>
    //     await prisma.cameras.findUnique({ where: { camera_id } })
    // );

    const site = await prisma.sites.create({
      data: {
        site_name,
        groups: { connect: { group_id } },
        integrators: { connect: { integrator_id } },
        cameras: {
          connect: camera_ids.map((ci) => {
            return { camera_id: ci };
          }),
        },
        customers: {
          connect: customer_ids.map((ci) => {
            return { customer_id: ci };
          }),
        },
        users: {
          connect: user_ids.map((ui) => {
            return { user_id: ui };
          }),
        },
      },
    });

    return formatJSONResponseStatusCreated({
      message: constants.SITE_SAVE,
      site,
    });
  } catch (error) {
    console.error(error);
    return formatJSONResponseStatusServerError({
      message: constants.SERVER_ERROR,
      error,
    });
  }
};

// Find an Site by ID.
const findSiteById = async (event) => {
  if (!event.pathParameters || !event.pathParameters.siteId) {
    return formatJSONResponseStatusBadRequest({
      message: constants.SITE_PATHPARAMETERS_ERROR,
    });
  }
  const site_id = event.pathParameters.siteId;
  try {
    const site = await prisma.sites.findUnique({
      where: {
        site_id,
      },
      select: {
        site_id: true,
        site_name: true,
        is_disabled: true,
        groups: true,
        integrators: true,
        cameras: true,
        customers: true,
        users: true,
      },
    });
    console.log("Find Site by ID :: ", site);
    return formatJSONResponseStatusOk({
      site: {
        ...site,
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

// Find All site details
const findAllSites = async () => {
  const sites = await prisma.sites.findMany({
    select: {
      site_id: true,
      site_name: true,
      is_disabled: true,
      change_name: true,
      groups: true,
      integrators: true,
      cameras: true,
      customers: true,
      users: true,
    },
  });
  console.log("Get all Sites :: ", sites);
  return formatJSONResponseStatusOk({
    sites,
  });
};

// Update Site
const updateSite: ValidatedEventAPIGatewayProxyEvent<typeof schema> = async (
  event: any
) => {
  if (!event.pathParameters || !event.pathParameters.siteId) {
    return formatJSONResponseStatusBadRequest({
      message: constants.SITE_PATHPARAMETERS_ERROR,
    });
  }
  const {
    site_name,
    group_id,
    integrator_id,
    user_ids,
    customer_ids,
    camera_ids,
  } = JSON.parse(event.body);
  const site_id = event.pathParameters.siteId;
  try {
    await prisma.sites.update({
      where: {
        site_id,
      },
      data: {
        site_name,
        groups: { connect: { group_id } },
        integrators: { connect: { integrator_id } },
        cameras: {
          connect: camera_ids.map((ci) => {
            return { camera_id: ci };
          }),
        },
        customers: {
          connect: customer_ids.map((ci) => {
            return { customer_id: ci };
          }),
        },
        users: {
          connect: user_ids.map((ui) => {
            return { user_id: ui };
          }),
        },
      },
    });
    return formatJSONResponseStatusOk({
      message: constants.SITE_UPDATE,
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
const disiableSite = async (event) => {
  if (!event.pathParameters || !event.pathParameters.siteId) {
    return formatJSONResponseStatusBadRequest({
      message: constants.SITE_PATHPARAMETERS_ERROR,
    });
  }

  const site_id = event.pathParameters.siteId;
  const { is_disabled } = JSON.parse(event.body);

  try {
    await prisma.sites.update({
      where: {
        site_id,
      },
      data: { is_disabled },
    });
    return formatJSONResponseStatusOk({
      message: constants.SITE_UPDATE,
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
  if (!event.pathParameters || !event.pathParameters.siteId) {
    return formatJSONResponseStatusBadRequest({
      message: constants.SITE_PATHPARAMETERS_ERROR,
    });
  }

  const site_id = event.pathParameters.siteId;
  const { change_name } = JSON.parse(event.body);

  try {
    await prisma.sites.update({
      where: {
        site_id,
      },
      data: { change_name },
    });
    return formatJSONResponseStatusOk({
      message: constants.SITE_UPDATE,
    });
  } catch (error) {
    console.error(error);
    return formatJSONResponseStatusServerError({
      message: constants.SERVER_ERROR,
      error,
    });
  }
};

// Remove the sites.
const removeSite = async (event) => {
  if (!event.pathParameters || !event.pathParameters.siteId) {
    return formatJSONResponseStatusBadRequest({
      message: constants.SITE_PATHPARAMETERS_ERROR,
    });
  }
  const site_id = event.pathParameters.siteId;
  try {
    await prisma.sites.delete({
      where: {
        site_id,
      },
    });
    return formatJSONResponseStatusOk({
      message: constants.SITE_DELETE,
    });
  } catch (error) {
    console.error(error);
    return formatJSONResponseStatusServerError({
      message: constants.SERVER_ERROR,
      error,
    });
  }
};

export const addSite = addNewSite;
export const getSiteById = findSiteById;
export const getAllSites = findAllSites;
export const editSite = updateSite;
export const editDisableSite = disiableSite;
export const editChangeName = updateChangeName;
export const deleteSite = removeSite;
