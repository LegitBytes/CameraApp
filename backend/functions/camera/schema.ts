export default {
  type: "object",
  properties: {
    camera_name: {
      type: "string",
    },
    camera_ip: {
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
  required: ["camera_name", "group_id", "integrator_id"],
} as const;
