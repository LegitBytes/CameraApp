/* eslint-disable new-cap */
/* eslint-disable camelcase */
import {Model, Sequelize, DataTypes} from 'sequelize';
import db from './db';

export const gateway = (sequelize: Sequelize) => {
  /**
   * Model for gateway relation
   */
  class gateway extends Model {
        public gateway_id!: number;
        public mac_address!: string;
        public participant_id!: number;
        public aws_thing_name!: string;

        /**
        * Helper method for defining associations.
        * This method is not a part of Sequelize lifecycle.
        * The `models/index` file will call this method automatically.
        * @param {db} models
        */
        static associate(models: typeof db) {
          // define associations here
          gateway.belongsTo(models.participant, {foreignKey: 'participant_id'});
        }
  };
  gateway.init({
    // Add coloumn definations here
    gateway_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    mac_address: {
      type: DataTypes.STRING(17),
      allowNull: false,
    },
    aws_thing_name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  }, {
    timestamps: true,
    sequelize,
    schema: 'sensorum',
    freezeTableName: true,
    underscored: true,
    modelName: 'gateway',
  });
  return gateway;
};
