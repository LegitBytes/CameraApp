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

// Add a new Group
const addNewGroup: ValidatedEventAPIGatewayProxyEvent<typeof schema> = async (
  event: any
) => {
  try {
    const group = await db.group.create({
      ...event.body,
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
    const group = await db.group.findOne({
      where: {
        group_id,
      },
    });
    const number_of_users = 
    return formatJSONResponseStatusOk({
      group: {
        ...group, number_of_users
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
  const groups = await db.group.findAll({});
  return formatJSONResponseStatusOk({
    groups,
  });
};

// Update Group
const updateGroup: ValidatedEventAPIGatewayProxyEvent<typeof schema> = async (
  event
) => {
  if (!event.pathParameters || !event.pathParameters.groupId) {
    return formatJSONResponseStatusBadRequest({
      message: constants.GROUP_PATHPARAMETERS_ERROR,
    });
  }
  const group = { ...event.body };
  const group_id = event.pathParameters.groupId;
  try {
    await db.group.update(group, {
      where: {
        group_id,
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

// Remove the group.
const removeGroup = async (event) => {
  if (!event.pathParameters || !event.pathParameters.groupId) {
    return formatJSONResponseStatusBadRequest({
      message: constants.GROUP_PATHPARAMETERS_ERROR,
    });
  }
  const group_id = event.pathParameters.groupId;
  try {
    await db.group.destroy({
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

export const addGroup = middyfy(addNewGroup);
export const getGroupById = middyfy(findGroupById);
export const getAllGroups = middyfy(findAllGroups);
export const editGroup = middyfy(updateGroup);
export const deleteGroup = middyfy(removeGroup);
