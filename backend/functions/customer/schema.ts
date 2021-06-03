export default {
  type: "object",
  properties: {
    customer_name: {
      type: "string",
    },
    group_id: {
      type: "string",
    },
    integrator_id: {
      type: "string",
    },
    user_ids: {
      type: "array",
    },
    site_ids: {
      type: "array",
    },
    is_disabled: {
      type: "boolean",
    },
  },
  required: [
    "customer_name",
    "group_id",
    "user_ids",
    "site_ids",
    "integrator_id",
  ],
} as const;
