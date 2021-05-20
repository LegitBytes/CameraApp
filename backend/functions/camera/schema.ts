export default {
  title: "Camera",
  type: "object",
  properties: {
    cameraAliases: { type: "string" },
    cameraIp: { type: "string" },
    emailId: { type: "string" },
    totalRequest: { type: "number" },
    smtpUserName: { type: "string" },
    smtpPassword: { type: "string" },
  },
  required: [
    "cameraAliases",
    "emailId",
    "totalRequest",
    "smtpUserName",
    "smtpPassword",
  ],
  additionalProperties: false,
} as const;
