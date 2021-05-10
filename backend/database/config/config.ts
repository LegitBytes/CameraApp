import style from './logger';
import * as fs from 'fs';
import * as path from 'path';

export const dbconfig = {
  'local': {
    'username': 'postgres',
    'password': '1234',
    'database': 'database_development',
    'host': '127.0.0.1',
    'dialect': 'postgres',
    'dialectOptions': {},
    'logging': (msg: string) => style(msg),
  },
  'dev': {
    'username': process.env.DB_USERNAME,
    'database': process.env.DB_NAME,
    'host': process.env.DB_HOST,
    'region': process.env.AWS_REGION,
    'dialect': 'postgres',
    'dialectOptions': {
      'ssl': {
        'rejectUnauthorized': true,
        'ca': fs.readFileSync(
            path.join(__dirname, '../rds-combined-ca-bundle.pem'),
        ),
      },
    },
    'logging': (msg: string) => style(msg),
  },
  'prod': {
    'username': process.env.DB_USERNAME,
    'database': process.env.DB_NAME,
    'host': process.env.DB_HOST,
    'region': process.env.AWS_REGION,
    'dialect': 'postgres',
    'dialectOptions': {
      'ssl': {
        'rejectUnauthorized': true,
        'ca': fs.readFileSync(
            path.join(__dirname, '../rds-combined-ca-bundle.pem'),
        ),
      },
    },
    'logging': (msg: string) => style(msg),
  },
};
