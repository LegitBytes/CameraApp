/* eslint-disable camelcase */
import { Sequelize } from "sequelize";
import { dbconfig } from "../config/config";
import * as AWS from "aws-sdk";
import { group } from "./group";
import { integrator } from "./integrator";
import { user } from "./user";

const env = process.env.NODE_ENV || "local";
const config = dbconfig[env];
let password: string;

if (env != "local") {
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
  config.database,
  config.username,
  password,
  config
);

const db = {
  group: group(sequelize),
  integrator: integrator(sequelize),
  user: user(sequelize),
  sequelize,
};

Object.keys(db).forEach((modelName) => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

export default db;
