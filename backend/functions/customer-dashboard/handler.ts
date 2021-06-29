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

const findAllCustomerDetails = async (event) => {
  try {
    const details = await db.scan({ TableName: table }).promise();
    console.log("Inside findAllCustomerDetails :: ", details.Items);

    return response(200, {
      camera_details: details.Items.sort(sortByDate),
      camera_details_count: details.Count,
    });
  } catch (error) {
    console.log("Catch Block findAllCustomerDetails :: ", error);
    return response(500, error);
  }
};

const findCustomerDetailsById = async (event) => {
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

    const customerDetails = await db.scan(params).promise();
    console.log("Customer Details Promise :: ", customerDetails);
    console.log("Customer Details Promise count :: ", customerDetails.Count);

    if (customerDetails.Items) {
      console.log("Inside findCustomerDetailsById :: ", customerDetails.Items);
      return response(200, {
        camera_details: customerDetails.Items.sort(sortByDate),
        camera_details_count: customerDetails.Count,
      });
    } else {
      return response(404, { error: "Email not found" });
    }
  } catch (error) {
    console.log("Catch Block findCustomerDetailsById :: ", error);
    return response(500, error);
  }
};

export const getAllCustomerDetails = middyfy(findAllCustomerDetails);
export const getCustomerDetailsById = middyfy(findCustomerDetailsById);
