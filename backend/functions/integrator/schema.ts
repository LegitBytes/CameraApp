export default {
  type: "object",
  properties: {
    name: {
      type: "string",
    },
    email: {
      type: "string",
    },
    phone: {
      type: "number",
    },
    is_disabled: {
      type: "boolean",
    },
  },
  required: ["name", "email", "phone"],
} as const;
