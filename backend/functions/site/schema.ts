export default {
  type: "object",
  properties: {
    site_name: {
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
    customer_ids: {
      type: "array",
    },
    camera_ids: {
      type: "array",
    },
    is_disabled: {
      type: "boolean",
    },
  },
  required: [
    "site_name",
    "group_id",
    "integrator_id",
    "user_ids",
    "customer_ids",
    "camera_ids",
  ],
} as const;
