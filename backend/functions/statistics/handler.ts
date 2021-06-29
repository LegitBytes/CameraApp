import { middyfy } from "@libs/lambda";
import * as AWS from "aws-sdk";

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

const groupCameraByEmail = async (event) => {
  console.log("Inside findAllCameraDetails.");

  try {
    const emailGroupByPromise = await db.scan({ TableName: table }).promise();

    const fromEmails = emailGroupByPromise.Items.map(
      (item) => item["fromemail"]
    );
    const emailGroupByFilter = fromEmails.map((email) => {
      const obj = {};
      obj[email] = fromEmails.filter((c) => c === email).length;
      return obj;
    });
    const strData = emailGroupByFilter.map((data) => JSON.stringify(data));
    const uniqueEmailData = new Set(strData);
    const emailGroupBy = [...uniqueEmailData].map((data) => JSON.parse(data));
    console.log(emailGroupBy);

    console.log("Camera Email and its Count :: ", emailGroupBy);

    return response(200, {
      camera_count: emailGroupBy,
      total_count: emailGroupByPromise.Count,
    });
  } catch (error) {
    console.log("Catch Block findAllCameraDetails :: ", error);
    return response(500, error);
  }
};

// const findCameraDetailsById = async (event) => {
//   try {
//     const { fromemail, date1, date2 } = event.pathParameters;

//     console.log(fromemail, date1, date2);

//     const params = {
//       TableName: table,
//       FilterExpression:
//         "fromemail = :fromemail and #time_stamp between :date1 and :date2",
//       ExpressionAttributeValues: {
//         ":fromemail": fromemail,
//         ":date1": parseInt(date1),
//         ":date2": parseInt(date2),
//       },
//       ExpressionAttributeNames: {
//         "#time_stamp": "timestamp",
//       },
//     };

//     console.log("Params :: ", params);

//     const cameraDetails = await db.scan(params).promise();
//     console.log("Camera Details Promise :: ", cameraDetails);
//     console.log("Camera Details Promise count :: ", cameraDetails.Count);

//     if (cameraDetails.Items) {
//       console.log("Inside findCameraDetailsById :: ", cameraDetails.Items);
//       return response(200, {cameraDetails.Items});
//     } else {
//       return response(404, { error: "Email not found" });
//     }
//   } catch (error) {
//     console.log("Catch Block findCameraDetailsById :: ", error);
//     return response(500, error);
//   }
// };

export const findGroupCameraByEmail = middyfy(groupCameraByEmail);
// export const getCameraDetailsById = middyfy(findCameraDetailsById);
