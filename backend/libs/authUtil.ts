import * as AWS from "aws-sdk";

const cognitoidentityserviceprovider = new AWS.CognitoIdentityServiceProvider();

export const isAuthorized = async (userName, group) => {
  console.log("Entered Group :: ", group);

  let authorized = false;

  const params = {
    UserPoolId: "us-east-1_6ExNtggrn",
    Username: userName,
  };

  try {
    const data = await cognitoidentityserviceprovider
      .adminListGroupsForUser(params)
      .promise();
    console.log(
      "Group from adminListGroupsForUser :: ",
      data.Groups.filter((g) => g.GroupName === group)
    );
    if (data.Groups.filter((g) => g.GroupName === group)) {
      console.log(
        "Is Group present :: ",
        data.Groups.filter((g) => g.GroupName === group).includes(group)
      );
      authorized = true;
    } else {
      console.log(
        "Is Group present :: ",
        data.Groups.filter((g) => g.GroupName === group).includes(group)
      );
      authorized = false;
    }
  } catch (err) {
    console.log(
      "Error inside findAllCameraDetails (adminListGroupsForUser) :: " + err,
      err.stack
    );
  }
  return authorized;
};
