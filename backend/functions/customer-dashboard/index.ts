import { handlerPath } from "@libs/handlerResolver";

export const findCustomerDetailsById = {
  handler: `${handlerPath(__dirname)}/handler.getCustomerDetailsById`,
  events: [
    {
      http: {
        method: "get",
        path: "customer-details/{fromemail}/{date1}/{date2}",
        cors: true,
      },
    },
  ],
};

export const findAllCustomerDetails = {
  handler: `${handlerPath(__dirname)}/handler.getAllCustomerDetails`,
  events: [
    {
      http: {
        method: "get",
        path: "customer-details",
        cors: true,
      },
    },
  ],
};
