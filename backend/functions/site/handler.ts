import schema from "./schema";
import {
  formatJSONResponseStatusBadRequest,
  formatJSONResponseStatusCreated,
  formatJSONResponseStatusOk,
  formatJSONResponseStatusServerError,
  ValidatedEventAPIGatewayProxyEvent,
} from "@libs/apiGateway";
import { middyfy } from "@libs/lambda";
import db from "@models/db";
import constants from "@libs/constants";

// Add a new Site
const addNewSite: ValidatedEventAPIGatewayProxyEvent<typeof schema> = async (
  event: any
) => {
  try {
    const site = await db.site.create({
      ...event.body,
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
    const site = await db.site.findOne({
      where: {
        site_id,
      },
    });
    const number_of_users = 
    return formatJSONResponseStatusOk({
      site: {
        ...site, number_of_users
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
  const sites = await db.site.findAll({});
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
    await db.site.update(site, {
      where: {
        site_id,
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

// Remove the site.
const removeSite = async (event) => {
  if (!event.pathParameters || !event.pathParameters.siteId) {
    return formatJSONResponseStatusBadRequest({
      message: constants.GROUP_PATHPARAMETERS_ERROR,
    });
  }
  const site_id = event.pathParameters.siteId;
  try {
    await db.site.destroy({
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
