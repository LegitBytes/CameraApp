import type { AWS } from "@serverless/typescript";

import {
  addNewCamera,
  findCameraById,
  findAllCameras,
  updateCamera,
  removeCamera,
  disiableCamera,
} from "@functions/camera";
import {
  addNewCustomer,
  findCustomerById,
  findAllCustomers,
  updateCustomer,
  removeCustomer,
  disiableCustomer,
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
} from "@functions/integrator";
import {
  addNewSite,
  findSiteById,
  findAllSites,
  updateSite,
  removeSite,
  disiableSite,
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
  findAllCustomerDetails,
  findCustomerDetailsById,
} from "@functions/customer-dashboard";
import { groupCameraByEmail } from "@functions/statistics";

const serverlessConfiguration: AWS = {
  service: "nathan-api",
  frameworkVersion: "2",
  useDotenv: true,
  custom: {
    webpack: {
      webpackConfig: "./webpack.config.js",
      includeModules: true,
      packager: "yarn",
      packagerOptions: {
        scripts: ["npx prisma generate"],
      },
    },
  },
  plugins: ["serverless-offline", "serverless-webpack"],
  // package: {
  //   patterns: ["../api_database/*"],
  // },
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
    addNewCustomer,
    findCustomerById,
    findAllCustomers,
    updateCustomer,
    removeCustomer,
    disiableCustomer,
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
    removeIntegrator,
    addNewSite,
    findSiteById,
    findAllSites,
    updateSite,
    removeSite,
    disiableSite,
    addNewUser,
    findUserById,
    findAllUsers,
    updateUser,
    removeUser,
    disiableUser,
    findAllCustomerDetails,
    findCustomerDetailsById,
    groupCameraByEmail,
  },
};

module.exports = serverlessConfiguration;
