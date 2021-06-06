import schema from "./schema";
import {
  formatJSONResponseStatusBadRequest,
  formatJSONResponseStatusCreated,
  formatJSONResponseStatusOk,
  formatJSONResponseStatusServerError,
  ValidatedEventAPIGatewayProxyEvent,
} from "@libs/apiGateway";
import { middyfy } from "@libs/lambda";
import constants from "@libs/constants";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// Add a new Customer
const addNewCustomer: ValidatedEventAPIGatewayProxyEvent<typeof schema> =
  async (event: any) => {
    try {
      const { customer_name, group_id, integrator_id, user_ids, site_ids } =
        event.body;

      const sites = site_ids.map(
        async (site_id: string) =>
          await prisma.sites.findUnique({ where: { site_id } })
      );

      const users = user_ids.map(
        async (user_id: string) =>
          await prisma.users.findUnique({ where: { user_id } })
      );

      const customer = await prisma.customers.create({
        data: {
          customer_name,
          groups: { connect: group_id },
          integrators: { connect: integrator_id },
          users: { create: users },
          sites: { create: sites },
        },
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
    const customer = await prisma.customers.findUnique({
      where: {
        customer_id,
      },
    });
    return formatJSONResponseStatusOk({
      customer: {
        ...customer,
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
  const customers = await prisma.customers.findMany();
  return formatJSONResponseStatusOk({
    customers,
  });
};

// Update Customer
const updateCustomer: ValidatedEventAPIGatewayProxyEvent<typeof schema> =
  async (event) => {
    if (!event.pathParameters || !event.pathParameters.customerId) {
      return formatJSONResponseStatusBadRequest({
        message: constants.GROUP_PATHPARAMETERS_ERROR,
      });
    }
    const customer = { ...event.body };
    const customer_id = event.pathParameters.customerId;
    try {
      await prisma.customers.update({
        where: {
          customer_id,
        },
        data: customer,
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

// Remove the customers.
const removeCustomer = async (event) => {
  if (!event.pathParameters || !event.pathParameters.customerId) {
    return formatJSONResponseStatusBadRequest({
      message: constants.GROUP_PATHPARAMETERS_ERROR,
    });
  }
  const customer_id = event.pathParameters.customerId;
  try {
    await prisma.customers.delete({
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
