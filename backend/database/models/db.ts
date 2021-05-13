/* eslint-disable camelcase */
import {Sequelize} from 'sequelize';
import {dbconfig} from '../config/config';
import * as AWS from 'aws-sdk';
import {participant} from './participant';
import {condition} from './condition';
import {camera} from './camera'
import {customer_camera} from './customer_camera';
import {customer_location} from './customer_location';
import {customer} from './customer';
import {location} from './location';
import{organisation} from './organisation';
import {site} from './site';
import {integrator} from './integrator';

// import {gateway} from './gateway';
// import {device} from './device';
// import {participant_review} from './participant_review';
// import {cough_file} from './cough_file';
// import {participant_adt} from './participant_adt';
// import {participant_condition} from './participant_condition';

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
  password = process.env.DB_PASSWORD;
}

const sequelize = new Sequelize(
    config.database, config.username, password, config,
);

const db = {
 /* to be deleted */
  participant: participant(sequelize),
  condition: condition(sequelize),
  /* to be deleted*/

  camera : camera(sequelize),
  customer_camera : customer_camera(sequelize),
  customer_location : customer_location(sequelize),
  customer : customer(sequelize),
  location : location(sequelize),
  organisation : organisation(sequelize),
  site : site(sequelize),
  integrator : integrator(sequelize),
  sequelize
}
Object.keys(db).forEach((modelName) => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

export default db;
