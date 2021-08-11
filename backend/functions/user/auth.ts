import {
  formatJSONResponseStatusBadRequest,
  formatJSONResponseStatusServerError,
} from "@libs/apiGateway";
import * as AWS from "aws-sdk";

const cognitoIdp = new AWS.CognitoIdentityServiceProvider();

export const auth = async (email, user_id) => {
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
        Name: "custom:user_id",
        Value: user_id,
      },
      {
        Name: "email_verified",
        Value: "true",
      },
    ],
  };
  try {
    const createdUser = await cognitoIdp.adminCreateUser(params).promise();
    console.log("User created with userName :: ", createdUser.User.Username);

    await cognitoIdp
      .adminAddUserToGroup({
        GroupName: "UserGroup",
        UserPoolId: userPool,
        Username: createdUser.User.Username,
      })
      .promise();
    console.log(`User with id ${user_id} is added to UserGroup`);
  } catch (err) {
    if (err.code === "UsernameExistsException") {
      console.log("User already exists in User Pool :: ", userPool);
      return formatJSONResponseStatusBadRequest({
        message: "User already exists.",
      });
    } else {
      console.log("Error while adding User in User Pool :: ", err);
      return formatJSONResponseStatusServerError({
        message: "Error while adding User in User Pool",
        err,
      });
    }
  }
};
