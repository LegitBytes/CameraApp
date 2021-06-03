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
import { PrismaClient } from ".prisma/client";

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
    } = event.body;

    const users = user_ids.map(
      async (user_id: string) =>
        await prisma.users.findUnique({ where: { user_id } })
    );

    const customers = customer_ids.map(
      async (customer_id: string) =>
        await prisma.customers.findUnique({ where: { customer_id } })
    );

    const cameras = camera_ids.map(
      async (camera_id: string) =>
        await prisma.cameras.findUnique({ where: { camera_id } })
    );

    const site = await prisma.sites.create({
      data: {
        site_name,
        groups: { connect: group_id },
        integrators: { connect: integrator_id },
        cameras: { create: cameras },
        customers: { create: customers },
        users: { create: users },
      },
    });

    return formatJSONResponseStatusCreated({
      message: constants.GROUP_SAVE,
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
      message: constants.GROUP_PATHPARAMETERS_ERROR,
    });
  }
  const site_id = event.pathParameters.siteId;
  try {
    const site = await prisma.sites.findUnique({
      where: {
        site_id,
      },
    });
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
  const sites = await prisma.sites.findMany();
  return formatJSONResponseStatusOk({
    sites,
  });
};

// Update Site
const updateSite: ValidatedEventAPIGatewayProxyEvent<typeof schema> = async (
  event
) => {
  if (!event.pathParameters || !event.pathParameters.siteId) {
    return formatJSONResponseStatusBadRequest({
      message: constants.GROUP_PATHPARAMETERS_ERROR,
    });
  }
  const site = { ...event.body };
  const site_id = event.pathParameters.siteId;
  try {
    await prisma.sites.update({
      where: {
        site_id,
      },
      data: site,
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

// Remove the sites.
const removeSite = async (event) => {
  if (!event.pathParameters || !event.pathParameters.siteId) {
    return formatJSONResponseStatusBadRequest({
      message: constants.GROUP_PATHPARAMETERS_ERROR,
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

export const addSite = middyfy(addNewSite);
export const getSiteById = middyfy(findSiteById);
export const getAllSites = middyfy(findAllSites);
export const editSite = middyfy(updateSite);
export const deleteSite = middyfy(removeSite);
