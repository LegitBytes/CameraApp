/* eslint-disable camelcase */
import {Sequelize} from 'sequelize';
import {dbconfig} from '../config/config';
import * as AWS from 'aws-sdk';
import {participant} from './participant';
import {condition} from './condition';
import {gateway} from './gateway';
import {device} from './device';
import {participant_review} from './participant_review';
import {cough_file} from './cough_file';
import {participant_adt} from './participant_adt';
import {participant_condition} from './participant_condition';

const env = process.env.NODE_ENV || 'local';
const config = dbconfig[env];
let password: string;

if (env != 'local') {
  const signer = new AWS.RDS.Signer();
  password = signer.getAuthToken({
    username: process.env.DB_USERNAME,
    hostname: process.env.DB_HOST,
    port: 5432,
    region: process.env.AWS_REGION,
  });
} else {
  password = config.password;
}

const sequelize = new Sequelize(
    config.database, config.username, password, config,
);

const db = {
  participant: participant(sequelize),
  condition: condition(sequelize),
  participant_condition: participant_condition(sequelize),
  gateway: gateway(sequelize),
  device: device(sequelize),
  participant_review: participant_review(sequelize),
  cough_file: cough_file(sequelize),
  participant_adt: participant_adt(sequelize),
  sequelize,
};

Object.keys(db).forEach((modelName) => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

export default db;
