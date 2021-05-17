import type { AWS } from "@serverless/typescript";

<<<<<<< HEAD
import {addIntegrator, updateIntegrator, getAllIntegrator, getSingleIntegrator, deleteIntegrator}  from '@functions/integratorCrud'

import {addUser, updateUser,getAllUsers, getSingleuser,deleteuser} from '@functions/userCrud'
=======
import {
  addNewGroup,
  findGroupById,
  findAllGroups,
  updateGroup,
  removeGroup,
} from "@functions/group";
>>>>>>> a77f7b667afe1c5bd23889e147b3ebfe359e1d1c

const serverlessConfiguration: AWS = {
  service: "nathan-api",
  frameworkVersion: "2",
  useDotenv: true,
  custom: {
    webpack: {
      webpackConfig: "./webpack.config.js",
      includeModules: {
        forceExclude: ["aws-sdk"],
        forceInclude: ["pg", "pg-hstore"],
      },
    },
  },
<<<<<<< HEAD
  // package: {
  //   patterns: [
  //     '../api_database/*',
  //   ],
  // },
  plugins: [
    'serverless-offline',
    'serverless-webpack'
  ],
=======
  package: {
    patterns: ["../api_database/*"],
  },
  plugins: ["serverless-webpack", "serverless-offline"],
>>>>>>> a77f7b667afe1c5bd23889e147b3ebfe359e1d1c
  provider: {
    name: "aws",
    runtime: "nodejs14.x",
    apiGateway: {
      minimumCompressionSize: 1024,
      shouldStartNameWithService: true,
    },
    environment: {
      AWS_NODEJS_CONNECTION_REUSE_ENABLED: "1",
      DB_HOST: "${env:DB_HOST}",
      DB_USERNAME: "${env:DB_USERNAME}",
      DB_NAME: "${env:DB_NAME}",
      NODE_ENV: "${env:NODE_ENV}",
    },
    lambdaHashingVersion: "20201221",
  },
  // import the function via paths
  functions: {
<<<<<<< HEAD
    addIntegrator,
    updateIntegrator,
    getAllIntegrator,
    getSingleIntegrator,
    deleteIntegrator,
    addUser, 
    updateUser,
    getAllUsers, 
    getSingleuser,
    deleteuser
=======
    addNewGroup,
    findGroupById,
    findAllGroups,
    updateGroup,
    removeGroup,
>>>>>>> a77f7b667afe1c5bd23889e147b3ebfe359e1d1c
  },
  resources: {
    Resources: {},
  },
};

module.exports = serverlessConfiguration;
