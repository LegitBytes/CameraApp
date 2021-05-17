import {
  formatJSONResponse,
  ValidatedEventAPIGatewayProxyEvent,
} from "@libs/apiGateway";
import { middyfy } from "@libs/lambda";
import db from "@models/db";
import GroupRequest from "./payload/request/GroupRequest";
import { GroupResponse } from "./payload/response/GroupResponse";
import schema from "./schema";

const addNewGroup: ValidatedEventAPIGatewayProxyEvent<typeof schema> = async (
  event: any
) => {
  const group: GroupRequest = { ...event.body };
  try {
    const savedGroup = await db.group.create({ group });
    return formatJSONResponse({
      message: "Group saved successfully...",
      savedGroup,
    });
  } catch (err) {
    console.error(err);
    return formatJSONResponse({
      message: "Some Error occured can't add the group " + err,
    });
  }
};

const findGroupById = async (event) => {
  const groupId = event.pathParameters.groupId;
  try {
    const group: GroupResponse = await db.group.findOne({
      where: {
        groupId,
      },
    });
    return formatJSONResponse({
      group,
    });
  } catch (err) {
    console.error(err);
    return formatJSONResponse({
      message: "Some Error occured can't find the group " + err,
    });
  }
};

const findAllGroups = async () => {
  console.log("Find all Groups");

  const groups: GroupResponse[] = await db.group.findAll({});
  return formatJSONResponse({
    groups,
  });
};

const updateGroup = async (event) => {
  const group: GroupRequest = { ...event.body };
  const groupId = event.pathParameters.groupId;

  try {
    const updatedGroup = await db.group.update(group, {
      where: {
        groupId,
      },
    });
    return formatJSONResponse({
      success: true,
      body: {
        message: "Group updated successfully...",
        group: updatedGroup,
      },
    });
  } catch (err) {
    return formatJSONResponse({
      message: "Some Error occured can't update the group..." + err,
    });
  }
};

const removeGroup = async (event) => {
  const groupId = event.pathParameters.groupId;
  try {
    await db.group.destroy({
      where: {
        groupId,
      },
    });
    return formatJSONResponse({
      success: true,
      body: {
        message: "Group deleted successfully...",
      },
    });
  } catch (err) {
    return formatJSONResponse({
      message: "Some Error occured can't delete the group..." + err,
    });
  }
};

export const addGroup = middyfy(addNewGroup);
export const getGroupById = middyfy(findGroupById);
export const getAllGroups = middyfy(findAllGroups);
export const editGroup = middyfy(updateGroup);
export const deleteGroup = middyfy(removeGroup);
