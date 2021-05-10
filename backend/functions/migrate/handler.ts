import 'source-map-support/register';
import {Sequelize, DataTypes} from 'sequelize';
import Umzug from 'umzug';
import * as path from 'path';
import {dbconfig} from '@dbconfig/config';
import * as AWS from 'aws-sdk';

const env = 'dev';
const config = dbconfig[env];

const signer = new AWS.RDS.Signer({
  username: process.env.DB_USERNAME,
  hostname: process.env.DB_HOST,
  port: 5432,
  region: process.env.AWS_REGION,
});
const password = signer.getAuthToken({});
console.log('Password', password);

const sequelize = new Sequelize(
    config.database, config.username, password, config,
);

const umzug = new Umzug({
  migrations: {
    path: path.join(__dirname, './migrations'),
    params: [
      sequelize.getQueryInterface(),
      DataTypes,
    ],
  },
  storage: 'sequelize',
  storageOptions: {
    sequelize: sequelize,
  },
});

const migrate = async () => {
  try {
    const migrations = await umzug.up();
    if (migrations.length == 0) {
      return {
        message: 'Migration already up to date',
      };
    } else {
      return {
        message: 'Migration completed',
        migrations,
      };
    }
  } catch (error) {
    console.log(error);

    return {
      message: 'Unable to complete migration',
      error: error.message,
    };
  }
};

export const main = migrate;
