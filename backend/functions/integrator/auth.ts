import {
  formatJSONResponseStatusBadRequest,
  formatJSONResponseStatusCreated,
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
  
  return await cognitoIdp.adminCreateUser(params).promise()
  .then(data => {
    console.log("Email Added :: ", data);

    return cognitoIdp
    .adminAddUserToGroup({
      GroupName: "IntegratorGroup",
      UserPoolId: userPool,
      Username: email,
    }).promise()
    .then(data => {
      console.log("Added Integrator group :: ", data);
      return formatJSONResponseStatusCreated({
        message: "Integrator added successfully"
      })  
    })
    .catch(err => {
      console.log("Unable to update group :: ", err);
    })
    
  })
  .catch(err => {
    console.log("Unable to add Email ID :: ", err);
    return formatJSONResponseStatusBadRequest({
      message: "Email already exists"
    });
  })


  // try {
  //   const createdIntegrator = await cognitoIdp
  //     .adminCreateUser(params)
  //     .promise();
  //   console.log(
  //     "Integrator created with userName :: ",
  //     createdIntegrator.User.Username
  //   );
  // } catch (err) {
  //   if (err.code === "UsernameExistsException") {
  //     console.log("Email already exists in Integrator Pool :: ", userPool);
  //     return formatJSONResponseStatusBadRequest({
  //       message: "Email already exists.",
  //     });
  //   } else {
  //     console.log(
  //       "Error while adding Integrator in Integrator Pool(adminCreateUser) :: ",
  //       err
  //     );
  //     return formatJSONResponseStatusServerError({
  //       message: "Error while adding Integrator in Integrator Pool",
  //       err,
  //     });
  //   }
  // }

  // try {
    // await cognitoIdp
    //   .adminAddUserToGroup({
    //     GroupName: "IntegratorGroup",
    //     UserPoolId: userPool,
    //     Username: email,
    //   })
  //     .promise();
  //   console.log(
  //     `Integrator with id ${integrator_id} is added to IntegratorGroup`
  //   );
  // } catch (err) {
  //   console.log(
  //     "Error while adding Integrator in Integrator Pool (adminAddUserToGroup) :: ",
  //     err
  //   );
  //   return formatJSONResponseStatusServerError({
  //     message: "Error while adding Integrator in Integrator Pool",
  //     err,
  //   });
  // }
};
