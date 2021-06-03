export default {
  type: "object",
  properties: {
    camera_name: {
      type: "string",
    },
    camera_ip: {
      type: "string",
    },
    smtp_user_name: {
      type: "string",
    },
    smtp_password: {
      type: "string",
    },
    group_id: {
      type: "string",
    },
    integrator_id: {
      type: "string",
    },
    is_disabled: {
      type: "boolean",
    },
    user_ids: {
      type: "array",
    },
  },
  required: [
    "camera_name",
    "smtp_user_name",
    "smtp_password",
    "group_id",
    "integrator_id",
  ],
} as const;
