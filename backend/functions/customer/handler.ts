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
// import { findSiteByIds, findUserByIds } from "./service/CustomerService";

const prisma = new PrismaClient();

export const findSiteByIds = async (site_ids, prisma) => {
  return site_ids.map(
    async (site_id: string) =>
      await prisma.sites.findUnique({ where: { site_id } })
  );
};

export const findUserByIds = async (user_ids, prisma) => {
  return user_ids.map(
    async (user_id: string) =>
      await prisma.users.findUnique({ where: { user_id } })
  );
};

// Add a new Customer
const addNewCustomer: ValidatedEventAPIGatewayProxyEvent<typeof schema> =
  async (event: any) => {
    try {
      const { customer_name, group_id, integrator_id, user_ids, site_ids } =
        event.body;

      console.log("Event Body -> ", event.body);

      // const sites = await findSiteByIds(site_ids, prisma);
      // const users = await findUserByIds(user_ids, prisma);

      // console.log("Sites and Users -> ", sites, users);

      // const sitesAndUsers = [...users, ...sites];

      // const sites = await Promise.all(
      //   site_ids.map((site_id: string) => {
      //     prisma.sites.findUnique({ where: { site_id } });
      //   })
      // );

      // const users = await Promise.all(
      //   user_ids.map((user_id: string) => {
      //     prisma.users.findUnique({ where: { user_id } });
      //   })
      // );

      const users = await prisma.users.findMany({
        where: { user_id: { in: user_ids } },
      });

      const sites = await prisma.sites.findMany({
        where: { site_id: { in: site_ids } },
      });

      // const userQuery = prisma.$queryRaw("SELECT * FROM users WHERE user_id IN []")

      console.log("Sites in add Customer -> ", sites);
      console.log("Users in add Customer -> ", users);

      // const customer = await Promise.all(sitesAndUsers).then((sitesUsers) => {
      //   console.log(
      //     "Sites and Users Array inside Promise.all() -> ",
      //     sitesUsers
      //   );
      //   const users = [];
      //   const sites = [];
      //   sitesUsers.map((su) => {
      //     console.log("SU -> ", su);

      //     if (su.hasOwnProperty("site_id")) {
      //       sites.push(su);
      //     } else if (su.hasOwnProperty("user_id")) {
      //       users.push(su);
      //     }
      //   });
      //   console.log("Users -> ", users);
      //   console.log("Sites", sites);
      //   return { users, sites };
      // });

      // console.log(" customer.Users -> ", customer.users);
      // console.log(" customer.Sites", customer.sites);

      const customer = await prisma.customers.create({
        data: {
          customer_name,
          groups: { connect: { group_id } },
          integrators: { connect: { integrator_id } },
          users: {
            connect: user_ids.map((ui) => {
              return { user_id: ui };
            }),
          },
          sites: {
            connect: site_ids.map((si) => {
              return { site_id: si };
            }),
          },
        },
      });
      console.log(" after Create Customer -> ", customer);

      // .then((c) => {
      //   console.log("Customers -> ", c);
      //   customer_id = c.customer_id;
      //   return c;
      // })
      // .catch((err) => {
      //   console.log("Error in Catch block of customer.create() ", err);
      // });
      // let { customer_id } = customer;
      // console.log("Customer ID after Create Customer -> ", customer_id);

      // const customerUpdate = await prisma.customers.update({
      //   where: {
      //     customer_id,
      //   },
      //   data: {
      //     users: { create: users },
      //     sites: { create: sites },
      //   },
      // });

      // console.log("After Update Customer -> ", customerUpdate);

      return formatJSONResponseStatusCreated({
        message: constants.CUSTOMER_SAVE,
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
      message: constants.CUSTOMER_PATHPARAMETERS_ERROR,
    });
  }
  const customer_id = event.pathParameters.customerId;
  try {
    const customer = await prisma.customers.findUnique({
      where: {
        customer_id,
      },
      select: {
        customer_id: true,
        customer_name: true,
        is_disabled: true,
        groups: true,
        integrators: true,
        sites: {
          select: {
            site_id: true,
            site_name: true,
            change_name: true,
            is_disabled: true,
            group_id: true,
            integrator_id: true,
            createdAt: true,
            updatedAt: true,
            cameras: true,
          },
        },
        users: true,
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
  const customers = await prisma.customers.findMany({
    select: {
      customer_id: true,
      customer_name: true,
      is_disabled: true,
      groups: true,
      integrators: true,
      sites: {
        select: {
          site_id: true,
          site_name: true,
          change_name: true,
          is_disabled: true,
          group_id: true,
          integrator_id: true,
          createdAt: true,
          updatedAt: true,
          cameras: true,
        },
      },
      users: true,
    },
  });
  return formatJSONResponseStatusOk({
    customers,
  });
};

// Update Customer
const updateCustomer: ValidatedEventAPIGatewayProxyEvent<typeof schema> =
  async (event) => {
    if (!event.pathParameters || !event.pathParameters.customerId) {
      return formatJSONResponseStatusBadRequest({
        message: constants.CUSTOMER_PATHPARAMETERS_ERROR,
      });
    }
    const { customer_name, group_id, integrator_id, user_ids, site_ids } =
      event.body;
    const customer_id = event.pathParameters.customerId;
    try {
      await prisma.customers.update({
        where: {
          customer_id,
        },
        data: {
          customer_name,
          groups: { connect: { group_id } },
          integrators: { connect: { integrator_id } },
          users: {
            connect: user_ids.map((ui) => {
              return { user_id: ui };
            }),
          },
          sites: {
            connect: site_ids.map((si) => {
              return { site_id: si };
            }),
          },
        },
      });
      return formatJSONResponseStatusOk({
        message: constants.CUSTOMER_UPDATE,
      });
    } catch (error) {
      console.error(error);
      return formatJSONResponseStatusServerError({
        message: constants.SERVER_ERROR,
        error,
      });
    }
  };

// Update is_disiable
const disiableCustomer = async (event) => {
  if (!event.pathParameters || !event.pathParameters.customerId) {
    return formatJSONResponseStatusBadRequest({
      message: constants.CUSTOMER_PATHPARAMETERS_ERROR,
    });
  }

  const customer_id = event.pathParameters.customerId;
  const { is_disabled } = event.body;

  try {
    await prisma.customers.update({
      where: {
        customer_id,
      },
      data: { is_disabled },
    });
    return formatJSONResponseStatusOk({
      message: constants.CUSTOMER_UPDATE,
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
      message: constants.CUSTOMER_PATHPARAMETERS_ERROR,
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
      message: constants.CUSTOMER_DELETE,
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
export const editDisableCustomer = middyfy(disiableCustomer);
export const deleteCustomer = middyfy(removeCustomer);
