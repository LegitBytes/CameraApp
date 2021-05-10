/* eslint-disable camelcase */
import {Model, Sequelize, DataTypes} from 'sequelize';
import {v4 as uuidv4} from 'uuid';
import db from './db';

export const cough_file = (sequelize: Sequelize) => {
  /**
   * Model for cough_file relation
   */
  class cough_file extends Model {
        public cough_file_id!: string;
        public sensor_event_uid!: string;
        public s3_file_location!: string;

        /**
        * Helper method for defining associations.
        * This method is not a part of Sequelize lifecycle.
        * The `models/index` file will call this method automatically.
        * @param {db} models
        */
        static associate(models: typeof db) {

        }
  };
  cough_file.init({
    // Add coloumn definations here
    cough_file_id: {
      type: DataTypes.UUID,
      allowNull: false,
      primaryKey: true,
    },
    sensor_event_uid: {
      type: DataTypes.UUID,
      allowNull: false,
    },
    file_location: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
  }, {
    timestamps: true,
    sequelize,
    schema: 'sensorum',
    underscored: true,
    freezeTableName: true,
    modelName: 'cough_file',
  });

  cough_file.beforeCreate((cough_file) => {
    cough_file.cough_file_id = uuidv4();
  });
  return cough_file;
};
