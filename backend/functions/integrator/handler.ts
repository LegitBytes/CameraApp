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
import { PrismaClient } from ".prisma/client";

const prisma = new PrismaClient();

// Add a new Integrator
const addNewIntegrator: ValidatedEventAPIGatewayProxyEvent<typeof schema> =
  async (event: any) => {
    try {
      const integrator = await prisma.integrators.create({
        data: { ...event.body },
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
    });
    return formatJSONResponseStatusOk({
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

// Find All integrator details
const findAllIntegrators = async () => {
  const integrators = await prisma.integrators.findMany();
  return formatJSONResponseStatusOk({
    integrators,
  });
};

// Update Integrator
const updateIntegrator: ValidatedEventAPIGatewayProxyEvent<typeof schema> =
  async (event) => {
    if (!event.pathParameters || !event.pathParameters.integratorId) {
      return formatJSONResponseStatusBadRequest({
        message: constants.INTEGRATOR_PATHPARAMETERS_ERROR,
      });
    }
    const integrator = { ...event.body };
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

export const addIntegrator = middyfy(addNewIntegrator);
export const getIntegratorById = middyfy(findIntegratorById);
export const getAllIntegrators = middyfy(findAllIntegrators);
export const editIntegrator = middyfy(updateIntegrator);
export const deleteIntegrator = middyfy(removeIntegrator);
