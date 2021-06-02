export default {
  type: "object",
  properties: {
    user_email: {
      type: "string",
    },
    user_name: {
      type: "string",
    },
    group_id: {
      type: "string",
    },
    integrator_id: {
      type: "string",
    },
    change_name: {
      type: "string",
    },
    customer_ids: {
      type: "array",
      items: {
        type: "string",
      },
    },
    site_ids: {
      type: "array",
      items: {
        type: "string",
      },
    },
    camera_ids: {
      type: "array",
      items: {
        type: "string",
      },
    },
    is_disabled: {
      type: "boolean",
    },
  },
  required: [
    "user_email",
    "group_id",
    "site_ids",
    "customer_ids",
    "camera_ids",
    "integrator_id",
  ],
} as const;
