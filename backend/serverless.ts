import type {AWS} from '@serverless/typescript';

import {addIntegrator, updateIntegrator, getAllIntegrator, getSingleIntegrator, deleteIntegrator}  from '@functions/integratorCrud'

const serverlessConfiguration: AWS = {
  service: 'nathan-api',
  frameworkVersion: '2',
  useDotenv: true,
  custom: {
    webpack: {
      webpackConfig: './webpack.config.js',
      includeModules: {
        forceExclude: [
          'aws-sdk',
        ],
        forceInclude: [
          'pg',
          'pg-hstore',
        ],
      },
    },
  },
  // package: {
  //   patterns: [
  //     '../api_database/*',
  //   ],
  // },
  plugins: [
    'serverless-offline',
    'serverless-webpack'
  ],
  provider: {
    name: 'aws',
    runtime: 'nodejs14.x',
    apiGateway: {
      minimumCompressionSize: 1024,
      shouldStartNameWithService: true,
    },
    environment: {
      AWS_NODEJS_CONNECTION_REUSE_ENABLED: '1',
      DB_HOST: '${env:DB_HOST}',
      DB_USERNAME: '${env:DB_USERNAME}',
      DB_NAME: '${env:DB_NAME}',
      NODE_ENV: '${env:NODE_ENV}',
    },
    lambdaHashingVersion: '20201221',
  },
  // import the function via paths
  functions: {
    addIntegrator,
    updateIntegrator,
    getAllIntegrator,
    getSingleIntegrator,
    deleteIntegrator
  },
  resources: {
    Resources: {

    },
  },
};

module.exports = serverlessConfiguration;
