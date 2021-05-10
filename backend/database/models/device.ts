/* eslint-disable new-cap */
/* eslint-disable camelcase */
import {Model, Sequelize, DataTypes} from 'sequelize';
import db from './db';

export const device = (sequelize: Sequelize) => {
  /**
   * Model for device table
   */
  class device extends Model {
        public device_id!: number;
        public mac_address!: string;
        public firmware_id!: string;
        public participant_id!: number;

        /**
        * Helper method for defining associations.
        * This method is not a part of Sequelize lifecycle.
        * The `models/index` file will call this method automatically.
        * @param {db} models
        */
        static associate(models: typeof db) {
          // define associations here
          device.belongsTo(models.participant, {foreignKey: 'participant_id'});
        }
  };
  device.init({
    // Add coloumn definations here
    device_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    mac_address: {
      type: DataTypes.STRING(17),
      allowNull: false,
    },
    firmware_id: DataTypes.STRING,
    device_type: {
      // eslint-disable-next-line max-len
      type: DataTypes.ENUM('cough_sensor', 'bed_sensor', 'door_sensor', 'chair_sensor', 'toliet_flush_sensor', 'fridge_sensor', 'proximitiy_sensor'),
      allowNull: false,
    },
  }, {
    timestamps: true,
    sequelize,
    modelName: 'device',
    schema: 'sensorum',
    freezeTableName: true,
    underscored: true,
    indexes: [{
      name: 'device_mac_address',
      fields: ['mac_address'],
    },
    {
      name: 'device_participant_id',
      fields: ['participant_id'],
    }],
  });
  return device;
};
