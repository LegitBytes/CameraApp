import {
  formatJSONResponseStatusBadRequest,
  formatJSONResponseStatusServerError,
} from "@libs/apiGateway";
import * as AWS from "aws-sdk";

const cognitoIdp = new AWS.CognitoIdentityServiceProvider();

export const auth = async (email, integrator_id) => {
  // const userPool = process.env.USER_POOL_CAMERA_APP;
  const userPool = "us-east-1_6ExNtggrn";
  const params = {
    UserPoolId: userPool,
    Username: email,
    UserAttributes: [
      {
        Name: "email",
        Value: email,
      },
      {
        Name: "custom:integrator_id",
        Value: integrator_id,
      },
      {
        Name: "email_verified",
        Value: "true",
      },
    ],
  };
  try {
    const createdIntegrator = await cognitoIdp
      .adminCreateUser(params)
      .promise();
    console.log(
      "Integrator created with userName :: ",
      createdIntegrator.User.Username
    );

    await cognitoIdp
      .adminAddUserToGroup({
        GroupName: "IntegratorGroup",
        UserPoolId: userPool,
        Username: createdIntegrator.User.Username,
      })
      .promise();
    console.log(
      `Integrator with id ${integrator_id} is added to IntegratorGroup`
    );
  } catch (err) {
    if (err.code === "UsernameExistsException") {
      console.log("Integrator already exists in Integrator Pool :: ", userPool);
      return formatJSONResponseStatusBadRequest({
        message: "Integrator already exists.",
      });
    } else {
      console.log("Error while adding Integrator in Integrator Pool :: ", err);
      return formatJSONResponseStatusServerError({
        message: "Error while adding Integrator in Integrator Pool",
        err,
      });
    }
  }
};
