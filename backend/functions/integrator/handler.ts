import schema from "./schema";
import {
  formatJSONResponseStatusBadRequest,
  formatJSONResponseStatusCreated,
  formatJSONResponseStatusOk,
  formatJSONResponseStatusServerError,
  ValidatedEventAPIGatewayProxyEvent,
} from "@libs/apiGateway";
import constants from "@libs/constants";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// Add a new Integrator
const addNewIntegrator: ValidatedEventAPIGatewayProxyEvent<typeof schema> =
  async (event: any) => {
    try {
      const integrator = await prisma.integrators.create({
        data: { ...JSON.parse(event.body) },
      });

      return formatJSONResponseStatusCreated({
        message: constants.INTEGRATOR_SAVE,
        integrator,
      });
    } catch (error) {
      console.error(error);
      return formatJSONResponseStatusServerError({
        message: constants.SERVER_ERROR,
        error,
      });
    }
  };

// Find an Integrator by ID.
const findIntegratorById = async (event) => {
  if (!event.pathParameters || !event.pathParameters.integratorId) {
    return formatJSONResponseStatusBadRequest({
      message: constants.INTEGRATOR_PATHPARAMETERS_ERROR,
    });
  }
  const integrator_id = event.pathParameters.integratorId;
  try {
    const integrator = await prisma.integrators.findUnique({
      where: {
        integrator_id,
      },
      select: {
        integrator_id: true,
        name: true,
        email: true,
        phone: true,
        is_disabled: true,
        createdAt: true,
        updatedAt: true,
        cameras: true,
        customers: true,
        groups: true,
        sites: true,
        users: true,
      },
    });

    const camera_count = await prisma.cameras.count({
      where: { integrator_id },
    });
    const customer_count = await prisma.customers.count({
      where: { integrator_id },
    });
    const group_count = await prisma.groups.count({ where: { integrator_id } });
    const site_count = await prisma.sites.count({ where: { integrator_id } });
    const user_count = await prisma.users.count({ where: { integrator_id } });

    return formatJSONResponseStatusOk({
      integrator: {
        ...integrator,
        group_count,
        user_count,
        customer_count,
        site_count,
        camera_count,
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

// Find All integrator details
const findAllIntegrators = async () => {
  const integrators = await prisma.integrators.findMany({
    select: {
      integrator_id: true,
      name: true,
      email: true,
      phone: true,
      is_disabled: true,
      createdAt: true,
      updatedAt: true,
      cameras: true,
      customers: true,
      groups: true,
      sites: true,
      users: true,
    },
  });

  const updated_integrators = await Promise.all(
    integrators.map(async (integrator) => {
      const integrator_id = integrator.integrator_id;
      const camera_count = await prisma.cameras.count({
        where: { integrator_id },
      });
      const customer_count = await prisma.customers.count({
        where: { integrator_id },
      });
      const group_count = await prisma.groups.count({
        where: { integrator_id },
      });
      const site_count = await prisma.sites.count({ where: { integrator_id } });
      const user_count = await prisma.users.count({ where: { integrator_id } });

      return {
        ...integrator,
        group_count,
        user_count,
        customer_count,
        site_count,
        camera_count,
      };
    })
  );

  return formatJSONResponseStatusOk({
    integrators: updated_integrators,
  });
};

// Update Integrator
const updateIntegrator: ValidatedEventAPIGatewayProxyEvent<typeof schema> =
  async (event: any) => {
    if (!event.pathParameters || !event.pathParameters.integratorId) {
      return formatJSONResponseStatusBadRequest({
        message: constants.INTEGRATOR_PATHPARAMETERS_ERROR,
      });
    }
    const integrator = { ...JSON.parse(event.body) };
    const integrator_id = event.pathParameters.integratorId;
    try {
      await prisma.integrators.update({
        where: {
          integrator_id,
        },
        data: integrator,
      });
      return formatJSONResponseStatusOk({
        message: constants.INTEGRATOR_UPDATE,
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
const disiableIntegrator = async (event) => {
  if (!event.pathParameters || !event.pathParameters.integratorId) {
    return formatJSONResponseStatusBadRequest({
      message: constants.INTEGRATOR_PATHPARAMETERS_ERROR,
    });
  }
 
  const integrator_id = event.pathParameters.integratorId;
  const { is_disabled } = JSON.parse(event.body);
 
  try {
    await prisma.integrators.update({
      where: {
        integrator_id,
      },
      data: { is_disabled },
    });
    return formatJSONResponseStatusOk({
      message: constants.INTEGRATOR_UPDATE,
    });
  } catch (error) {
    console.error(error);
    return formatJSONResponseStatusServerError({
      message: constants.SERVER_ERROR,
      error,
    });
  }
};

// Remove the integrators.
const removeIntegrator = async (event) => {
  if (!event.pathParameters || !event.pathParameters.integratorId) {
    return formatJSONResponseStatusBadRequest({
      message: constants.INTEGRATOR_PATHPARAMETERS_ERROR,
    });
  }
  const integrator_id = event.pathParameters.integratorId;
  try {
    await prisma.integrators.delete({
      where: {
        integrator_id,
      },
    });
    return formatJSONResponseStatusOk({
      message: constants.INTEGRATOR_DELETE,
    });
  } catch (error) {
    console.error(error);
    return formatJSONResponseStatusServerError({
      message: constants.SERVER_ERROR,
      error,
    });
  }
};

export const addIntegrator = addNewIntegrator;
export const getIntegratorById = findIntegratorById;
export const getAllIntegrators = findAllIntegrators;
export const editIntegrator = updateIntegrator;
export const deleteIntegrator = removeIntegrator;
export const editDisableIntegrator = disiableIntegrator;
