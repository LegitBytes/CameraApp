/* eslint-disable new-cap */
/* eslint-disable camelcase */
import {Model, Sequelize, DataTypes} from 'sequelize';
import db from './db';
import {v4 as uuidv4} from 'uuid';

export const participant_adt = (sequelize: Sequelize) => {
  /**
   * Model for participant_adt relation
   */
  class participant_adt extends Model {
        public participant_adt_id!: typeof uuidv4;
        public participant_id: number;
        public sensor_timestamp!: Date;
        public patient_status_change!: string;

        /**
        * Helper method for defining associations.
        * This method is not a part of Sequelize lifecycle.
        * The `models/index` file will call this method automatically.
        * @param {db} models
        */
        static associate(models: typeof db) {
          // define associations here
          participant_adt.belongsTo(
              models.participant, {foreignKey: 'participant_id'},
          );
        }
  };
  participant_adt.init({
    // Add coloumn definations here
    participant_adt_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
    },
    sensor_timestamp: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    patient_status_change: DataTypes.ENUM('admit', 'discharge', 'transfer'),
  }, {
    timestamps: true,
    freezeTableName: true,
    sequelize,
    underscored: true,
    schema: 'sensorum',
    modelName: 'participant_adt',
  });
  return participant_adt;
};
