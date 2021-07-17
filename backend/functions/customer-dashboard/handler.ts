import * as AWS from "aws-sdk";

import { PrismaClient } from "@prisma/client";
import constants from "@libs/constants";

const prisma = new PrismaClient();

const db = new AWS.DynamoDB.DocumentClient();

const table = "EmailData";

const sortByDate = (a, b) => {
  if (a.timestamp > b.timestamp) {
    return -1;
  } else return 1;
};

const response = (statusCode, message) => {
  return {
    statusCode,
    body: JSON.stringify(message),
    headers: {
      "Access-Control-Allow-Headers": "Content-Type",
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "OPTIONS,POST,GET,PUT,DELETE,PATCH",
    },
  };
};

const findAllCameraDetails = async (event) => {
  try {
    const details = await db.scan({ TableName: table }).promise();
    console.log("Inside findAllCameraDetails :: ", details.Items);

    return response(200, {
      camera_details: details.Items.sort(sortByDate),
      camera_details_count: details.Count,
    });
  } catch (error) {
    console.log("Catch Block findAllCameraDetails :: ", error);
    return response(500, { message: constants.SERVER_ERROR });
  }
};

const findCameraDetailsById = async (event) => {
  try {
    const { fromemail, date1, date2 } = event.pathParameters;

    console.log(fromemail, date1, date2);

    const params = {
      TableName: table,
      FilterExpression:
        "fromemail = :fromemail and #time_stamp between :date1 and :date2",
      ExpressionAttributeValues: {
        ":fromemail": fromemail,
        ":date1": parseInt(date1),
        ":date2": parseInt(date2),
      },
      ExpressionAttributeNames: {
        "#time_stamp": "timestamp",
      },
    };

    console.log("Params :: ", params);

    const cameraDetails = await db.scan(params).promise();
    console.log("Camera Details Promise :: ", cameraDetails);
    console.log("Camera Details Promise count :: ", cameraDetails.Count);

    if (cameraDetails.Items) {
      console.log("Inside findCameraDetailsById :: ", cameraDetails.Items);
      return response(200, {
        camera_details: cameraDetails.Items.sort(sortByDate),
        camera_details_count: cameraDetails.Count,
      });
    } else {
      return response(404, { error: "Email not found" });
    }
  } catch (error) {
    console.log("Catch Block findCameraDetailsById :: ", error);
    return response(500, {
      message: constants.SERVER_ERROR,
    });
  }
};

const findCameraDetailsByUserId = async (event) => {
  if (!event.pathParameters || !event.pathParameters.userId) {
    return response(400, {
      message: constants.USER_PATHPARAMETERS_ERROR,
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
        cameras: true,
        sites: true,
      },
    });
    const cameraEmails = user.cameras.map((camera) => camera.smtp_user_name);

    const camera_details = await Promise.all(
      cameraEmails.map(async (email) => await cameraDetails(email))
    );

    return response(200, {
      user: {
        ...user,
        camera_details,
      },
    });
  } catch (error) {
    console.error(error);
    return response(500, {
      message: constants.SERVER_ERROR,
      error,
    });
  }
};

const cameraDetails = async (email) => {
  const cameraDetailsArr = await db
    .query({
      TableName: table,
      KeyConditionExpression: "fromemail = :fromemail",
      ExpressionAttributeValues: {
        ":fromemail": email,
      },
    })
    .promise();

  // const camera_details = [];
  // if (cameraDetailsArr.Items) {
  //   console.log("Camera Details of  :: ", email);
  //   camera_details.push(cameraDetailsArr.Items.sort(sortByDate));
  // } else {
  //   camera_details.push({ error: "Email not found" });
  // }
  return cameraDetailsArr.Items;
};

export const getAllCameraDetails = findAllCameraDetails;
export const getCameraDetailsById = findCameraDetailsById;
export const getCameraDetailsByUserId = findCameraDetailsByUserId;
