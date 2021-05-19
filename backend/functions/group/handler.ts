import {
  formatJSONResponseStatusCreated,
  formatJSONResponseStatusOk,
  formatJSONResponseStatusBadRequest,
  formatJSONResponseStatusError,
  ValidatedEventAPIGatewayProxyEvent,
} from "@libs/apiGateway";
import { middyfy } from "@libs/lambda";
import db from "@models/db";
import GroupRequest from "./payload/request/GroupRequest";
import { GroupResponse } from "./payload/response/GroupResponse";
import schema from "./schema";

// Add a new Group
const addNewGroup: ValidatedEventAPIGatewayProxyEvent<typeof schema> = async (
  event: any
) => {
  const group: GroupRequest = { ...event.body };
  try {
    const savedGroup = await db.group.create(group);
    return formatJSONResponseStatusCreated({
      message: "Group saved successfully...",
      savedGroup,
    });
  } catch (err) {
    console.error(err);
    return formatJSONResponseStatusError({
      message: "Some Error occured can't add the group " + err,
    });
  }
};




const findGroupById = async (event) => {
  if (!event.pathParameters || !event.pathParameters.groupId) {
    return formatJSONResponseStatusBadRequest({
      message: "Please provide Group ID.",
    });
  }
  const groupId = event.pathParameters.groupId;
  try {
    const group: GroupResponse = await db.group.findOne({
      where: {
        groupId,
      },
    });
    return formatJSONResponseStatusOk({
      group,
    });
  } catch (err) {
    console.error(err);
    return formatJSONResponseStatusError({
      message: "Some Error occured can't find the group " + err,
    });
  }
};

// Find All group details
const findAllGroups = async () => {
  const groups: GroupResponse[] = await db.group.findAll({});
  return formatJSONResponseStatusOk({
    groups,
  });
};

// Update Group
const updateGroup = async (event) => {
  if (!event.pathParameters || !event.pathParameters.groupId) {
    return formatJSONResponseStatusBadRequest({
      message: "Please provide Group ID.",
    });
  }
  const group: GroupRequest = { ...event.body };
  const groupId = event.pathParameters.groupId;
  try {
    const updatedGroup = await db.group.update(group, {
      where: {
        groupId,
      },
    });
    return formatJSONResponseStatusOk({
      success: true,
      body: {
        message: "Group updated successfully...",
        group: updatedGroup,
      },
    });
  } catch (err) {
    return formatJSONResponseStatusError({
      message: "Some Error occured can't update the group..." + err,
    });
  }
};

// Remove the group.
const removeGroup = async (event) => {
  if (!event.pathParameters || !event.pathParameters.groupId) {
    return formatJSONResponseStatusBadRequest({
      message: "Please provide Group ID.",
    });
  }
  const groupId = event.pathParameters.groupId;
  try {
    await db.group.destroy({
      where: {
        groupId,
      },
    });
    return formatJSONResponseStatusOk({
      success: true,
      body: {
        message: "Group deleted successfully...",
      },
    });
  } catch (err) {
    return formatJSONResponseStatusError({
      message: "Some Error occured can't delete the group..." + err,
    });
  }
};

export const addGroup = middyfy(addNewGroup);
export const getGroupById = middyfy(findGroupById);
export const getAllGroups = middyfy(findAllGroups);
export const editGroup = middyfy(updateGroup);
export const deleteGroup = middyfy(removeGroup);
