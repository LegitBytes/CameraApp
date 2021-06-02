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

// Add a new Customer
const addNewCustomer: ValidatedEventAPIGatewayProxyEvent<typeof schema> = async (
  event: any
) => {
  try {
    const customer= await db.customer.create({
      ...event.body,
    });

    return formatJSONResponseStatusCreated({
      message: constants.GROUP_SAVE,
      customer,
    });
  } catch (error) {
    console.error(error);
    return formatJSONResponseStatusServerError({
      message: constants.SERVER_ERROR,
      error,
    });
  }
};

// Find an Customer by ID.
const findCustomerById = async (event) => {
  if (!event.pathParameters || !event.pathParameters.customerId) {
    return formatJSONResponseStatusBadRequest({
      message: constants.GROUP_PATHPARAMETERS_ERROR,
    });
  }
  const customer_id = event.pathParameters.customerId;
  try {
    const customer = await db.customer.findOne({
      where: {
        customer_id,
      },
    });
    const number_of_users = 
    return formatJSONResponseStatusOk({
      customer: {
        ...customer, number_of_users
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

// Find All customer details
const findAllCustomers = async () => {
  const customers = await db.customer.findAll({});
  return formatJSONResponseStatusOk({
    customers,
  });
};

// Update Customer
const updateCustomer: ValidatedEventAPIGatewayProxyEvent<typeof schema> = async (
  event
) => {
  if (!event.pathParameters || !event.pathParameters.customerId) {
    return formatJSONResponseStatusBadRequest({
      message: constants.GROUP_PATHPARAMETERS_ERROR,
    });
  }
  const customer = { ...event.body };
  const customer_id = event.pathParameters.customerId;
  try {
    await db.customer.update(customer, {
      where: {
        customer_id,
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

// Remove the customer.
const removeCustomer = async (event) => {
  if (!event.pathParameters || !event.pathParameters.customerId) {
    return formatJSONResponseStatusBadRequest({
      message: constants.GROUP_PATHPARAMETERS_ERROR,
    });
  }
  const customer_id = event.pathParameters.customerId;
  try {
    await db.customer.destroy({
      where: {
        customer_id,
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

export const addCustomer = middyfy(addNewCustomer);
export const getCustomerById = middyfy(findCustomerById);
export const getAllCustomers = middyfy(findAllCustomers);
export const editCustomer = middyfy(updateCustomer);
export const deleteCustomer = middyfy(removeCustomer);
