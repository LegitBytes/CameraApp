import { middyfy } from "@libs/lambda";
import { formatJSONResponseStatusUnauthorized } from "@libs/apiGateway";
import { JwtToken } from "./util/JwtToken";
import { verify } from "jsonwebtoken";

const handler = middyfy(async (event) => {
  const bearer = event.authorizationToken;
  if (!bearer)
    return formatJSONResponseStatusUnauthorized({
      message: "Unauthorized User!",
    });

  try {
    const decodedToken = verifyToken(bearer, "camera-app-secret-jwt");
    console.log("User was authorized", decodedToken);

    return {
      principalId: decodedToken.iss,
      policyDocument: {
        Version: "2012-10-17",
        Statement: [
          {
            Action: "execute-api:Invoke",
            Effect: "Allow",
            Resource: "*",
          },
        ],
      },
    };
  } catch (e) {
    console.log("User was not authorized", e.message);

    return {
      principalId: "user",
      policyDocument: {
        Version: "2012-10-17",
        Statement: [
          {
            Action: "execute-api:Invoke",
            Effect: "Deny",
            Resource: "*",
          },
        ],
      },
    };
  }
});

function verifyToken(authHeader: string, secret: string): JwtToken {
  if (!authHeader) throw new Error("No authentication header");

  if (!authHeader.toLowerCase().startsWith("bearer "))
    throw new Error("Invalid authentication header");

  const split = authHeader.split(" ");
  const token = split[1];

  return verify(token, secret) as JwtToken;
}

export const main = handler;
