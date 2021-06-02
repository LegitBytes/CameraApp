export default {
  type: "object",
  properties: {
    group_name: {
      type: "string",
    },
    integrator_id: {
      type: "string",
    },
    is_disabled: {
      type: "boolean",
    },
  },
  required: ["group_name"],
} as const;
