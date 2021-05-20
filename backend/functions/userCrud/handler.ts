// import {adUserSchema} from './schema';
// import type {ValidatedEventAPIGatewayProxyEvent} from '@libs/apiGateway';
import { getUserId } from "@functions/auth/util/utils";
import { formatJSONResponse } from "@libs/apiGateway";
import { middyfy } from "@libs/lambda";

import db from "@models/db";

const addUser = async (event: any) => {
  try {
    const authorization = event.headers.Authorization;
    const split = authorization.split(" ");
    const jwtToken = split[1];
    const userId = getUserId(jwtToken);

    // Get the Email from userId and Store the email to DB.

    let user = await db.user.create({
      name: event.body.name,
      email: event.body.email,
      groupId: event.body.groupId,
      integratorId: event.body.integratorId,
    });

    return formatJSONResponse({
      body: {
        data: event.body,
        message: "Data save successfully",
        user,
      },
    });
  } catch (e) {
    console.error(e);
    return formatJSONResponse({ message: "error occured", e });
  }
};

interface update {
  name?: string;
  email?: string;
  isDisabled?: boolean;
  groupId?: string;
  integratorId?: string;
}
const updateuser = async (event) => {
  try {
    const toUpdate: update = { ...event.body };

    if (!event.pathParameters || !event.pathParameters.userId) {
      return formatJSONResponse({
        success: false,
        message: "Provide userId",
      });
    }

    const userId: string = event.pathParameters.userId;

    console.log("toUpdate", toUpdate);
    const user = await db.user.update(toUpdate, {
      where: {
        userId: userId,
      },
    });

    return formatJSONResponse({
      success: true,
      body: {
        user,
      },
    });
  } catch (e) {
    console.error(e);
    return formatJSONResponse({
      success: false,
      e: e,
    });
  }
};

const fetchSingleUser = async (event) => {
  try {
    if (!event.pathParameters || !event.pathParameters.userId) {
      return formatJSONResponse({
        success: false,
        body: {
          message: "provide userId in params",
        },
      });
    }
    let userId = event.pathParameters.userId;

    let user = await db.user.findOne({
      where: {
        userId: userId,
      },
    });

    return formatJSONResponse({
      success: true,
      body: {
        user,
      },
    });
  } catch (e) {
    console.error(e);
    return formatJSONResponse({ message: "error occured", e });
  }
};

const fetchAllUsers = async (event) => {
  let users = await db.user.findAll({});

  return formatJSONResponse({
    success: true,
    body: {
      users,
    },
  });
};

const delete_user = async (event) => {
  try {
    if (!event.pathParameters || !event.pathParameters.userId) {
      return formatJSONResponse({
        success: false,
        body: {
          message: "provide userId in params",
        },
      });
    }
    let userId = event.pathParameters.userId;

    await db.user.destroy({
      where: {
        userId: userId,
      },
    });
    return formatJSONResponse({
      success: true,
      body: {
        message: "User is deleted",
      },
    });
  } catch (e) {
    console.error(e);
    return formatJSONResponse({
      success: false,
      e: e,
    });
  }
};

export const newUser = middyfy(addUser);
export const updateUser = middyfy(updateuser);
export const deleteUser = middyfy(delete_user);
export const getSingleUser = middyfy(fetchSingleUser);
export const getAllUsers = middyfy(fetchAllUsers);
