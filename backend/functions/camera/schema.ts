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
  },
  required: ["camera_name", "smtp_user_name", "smtp_password"],
} as const;
