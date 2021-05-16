export default {
  title: "Group",
  type: "object",
  properties: {
    groupName: { type: "string" },
    isDisabled: { type: "boolean" },
  },
  required: ["groupName", "isDisabled"],
  additionalProperties: false,
} as const;
