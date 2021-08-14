import type { AWS } from "@serverless/typescript";

import {
  addNewCamera,
  findCameraById,
  findAllCameras,
  updateCamera,
  removeCamera,
  disiableCamera,
  updateChangeNameCamera,
} from "@functions/camera";
import {
  addNewCustomer,
  findCustomerById,
  findAllCustomers,
  updateCustomer,
  removeCustomer,
  disiableCustomer,
  updateChangeNameCustomer,
} from "@functions/customer";
import {
  addNewGroup,
  findGroupById,
  findAllGroups,
  updateGroup,
  removeGroup,
  disiableGroup,
} from "@functions/group";
import {
  addNewIntegrator,
  findIntegratorById,
  findAllIntegrators,
  updateIntegrator,
  removeIntegrator,
  disiableIntegrator,
} from "@functions/integrator";
import {
  addNewSite,
  findSiteById,
  findAllSites,
  updateSite,
  removeSite,
  disiableSite,
  updateChangeNameSite,
} from "@functions/site";
import {
  addNewUser,
  findUserById,
  findAllUsers,
  updateUser,
  removeUser,
  disiableUser,
} from "@functions/user";
import {
  findCameraDetailsById,
  findAllCameraDetails,
  findCameraDetailsByUserId,
} from "@functions/customer-dashboard";
import { groupCameraByEmail } from "@functions/statistics";

const serverlessConfiguration: AWS = {
  service: "nathan-api",
  frameworkVersion: "2",
  useDotenv: true,
  custom: {
    prune: {
      automatic: true,
      number: 4,
    },
    webpack: {
      webpackConfig: "./webpack.config.js",
      includeModules: true,
      packager: "yarn",
      packagerOptions: {
        scripts: ["npx prisma generate"],
      },
    },
  },
  plugins: [
    "serverless-offline",
    "serverless-webpack",
    "serverless-prune-plugin",
  ],
  package: {
    excludeDevDependencies: true,
  },
  provider: {
    name: "aws",
    runtime: "nodejs14.x",
    apiGateway: {
      minimumCompressionSize: 1024,
      shouldStartNameWithService: true,
    },
    environment: {
      AWS_NODEJS_CONNECTION_REUSE_ENABLED: "1",
      DATABASE_URL: "${env:DATABASE_URL}",
      // DB_HOST: "${env:DB_HOST}",
      // DB_USERNAME: "${env:DB_USERNAME}",
      // DB_NAME: "${env:DB_NAME}",
      // NODE_ENV: "${env:NODE_ENV}",
    },
    lambdaHashingVersion: "20201221",
    iamRoleStatements: [
      {
        Effect: "Allow",
        Action: [
          "dynamodb:DescribeTable",
          "dynamodb:Scan",
          "dynamodb:GetItem",
          "dynamodb:Query",
          "dynamodb:PutItem",
          "dynamodb:UpdateItem",
          "dynamodb:DeleteItem",
          "cognito-idp:AdminCreateUser",
          "cognito-idp:AdminListGroupsForUser",
          "cognito-idp:AdminAddUserToGroup",
          "iam:CreateUser",
          "iam:PutUserPolicy",
          "iam:CreateAccessKey",
        ],
        Resource: "*",
      },
    ],
  },
  // import the function via paths
  functions: {
    addNewCamera,
    findCameraById,
    findAllCameras,
    updateCamera,
    removeCamera,
    disiableCamera,
    updateChangeNameCamera,
    addNewCustomer,
    findCustomerById,
    findAllCustomers,
    updateCustomer,
    removeCustomer,
    disiableCustomer,
    updateChangeNameCustomer,
    addNewGroup,
    findGroupById,
    findAllGroups,
    updateGroup,
    removeGroup,
    disiableGroup,
    addNewIntegrator,
    findIntegratorById,
    findAllIntegrators,
    updateIntegrator,
    disiableIntegrator,
    removeIntegrator,
    addNewSite,
    findSiteById,
    findAllSites,
    updateSite,
    removeSite,
    disiableSite,
    updateChangeNameSite,
    addNewUser,
    findUserById,
    findAllUsers,
    updateUser,
    removeUser,
    disiableUser,
    findCameraDetailsById,
    findAllCameraDetails,
    findCameraDetailsByUserId,
    groupCameraByEmail,
  },

  resources: {
    Resources: {
      UserPoolCameraApp: {
        Type: "AWS::Cognito::UserPool",
        Properties: {
          MfaConfiguration: "OFF",
          UserPoolName: "user-camera-app",
          UsernameAttributes: ["email"],
        },
      },
    },
  },
};

module.exports = serverlessConfiguration;
