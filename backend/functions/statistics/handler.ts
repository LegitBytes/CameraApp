import { formatJSONResponseStatusUnAuthorized } from "@libs/apiGateway";
import { isAuthorized } from "@libs/authUtil";
import constants from "@libs/constants";
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
  const userName = event.requestContext.authorizer.claims.sub;
  if (
    (await isAuthorized(userName, "AdminGroup")) ||
    (await isAuthorized(userName, "IntegratorGroup"))
  ) {
    try {
      const emailGroupByPromise = await db.scan({ TableName: table }).promise();

      const fromEmails = emailGroupByPromise.Items.map((item) => ({
        smtp_email: item["fromemail"],
        alert: item["alert"] === undefined ? false : item["alert"],
      }));

      const emailGroupByFilter = fromEmails.map((email) => {
        const obj = {
          smtp_email: email.smtp_email,
          alert: fromEmails.filter(
            (c) => c.smtp_email === email.smtp_email && c.alert === true
          ).length,
          request_count: fromEmails.filter(
            (c) => c.smtp_email === email.smtp_email
          ).length,
        };
        return obj;
      });
      const strData = emailGroupByFilter.map((data) => JSON.stringify(data));
      const uniqueEmailData = new Set(strData);
      const emailGroupBy = [...uniqueEmailData].map((data) => JSON.parse(data));
      console.log(emailGroupBy);

      console.log("Camera Email, Count and its Alert  :: ", emailGroupBy);

      return response(200, {
        camera_details: emailGroupBy,
        total_count: emailGroupByPromise.Count,
      });
    } catch (error) {
      console.log("Catch Block findAllCameraDetails :: ", error);
      return response(500, error);
    }
  } else {
    return formatJSONResponseStatusUnAuthorized({
      message: constants.NOT_AUTHORIZED,
    });
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

export const findGroupCameraByEmail = groupCameraByEmail;
// export const getCameraDetailsById = middyfy(findCameraDetailsById);
