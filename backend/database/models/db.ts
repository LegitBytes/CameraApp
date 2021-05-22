/* eslint-disable camelcase */
import {
  Sequelize,
} from 'sequelize';
import dbconfig from '../config/config';
import * as AWS from 'aws-sdk';
import {camera} from './camera'
import {user_camera} from './user-camera';
import {user_customer} from './user_customer';
import { user_site } from './user_site';
import {user} from './user';
import {customer} from './customer';
import {site} from './site';
import {integrator} from './integrator';
import { group } from './group';

// const env = process.env.NODE_ENV || 'local';
const env = 'local';
const config = dbconfig[env];
let password: string;
console.log("env is", env)
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
    // config.database, config.username, password, {
     'cameraApp_development', 'postgres', 'awab2027' , {
      host: config.host,
      dialect : 'postgres'
    },
);

(async ()=>{
  try {
    console.log("inside functions")
      await sequelize.authenticate();
      console.log("connection established ")
  } catch(e){
      console.log("unable to connect")
  }
})(); 

const db = {
  user_site : user_site(sequelize),
  user_camera : user_camera(sequelize),
  camera : camera(sequelize),
  user : user(sequelize),
  site : site(sequelize),
  customer : customer(sequelize),
  user_customer : user_customer(sequelize),
  integrator : integrator(sequelize),
  group : group(sequelize),
}
Object.keys(db).forEach((modelName) => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

export default db;
