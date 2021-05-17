/* eslint-disable camelcase */
/* eslint-disable new-cap */
/* eslint-disable max-len */
import {Model, Sequelize, DataTypes} from 'sequelize';
import db from './db';

export const participant = (sequelize: Sequelize) => {
  /**
   * Model for participant relation
   */
  class participant extends Model {
        public participant_id!: number;
        public mrn!: string;
        public first_name!: string;
        public middle_name: string;
        public last_name!: string;
        public date_of_birth!: Date;

        /**
        * Helper method for defining associations.
        * This method is not a part of Sequelize lifecycle.
        * The `models/index` file will call this method automatically.
        * @param {db} models
        */
        static associate(models: typeof db) {
          // define associations here
          // participant.hasMany(models.gateway, {foreignKey: 'participant_id'});
          // participant.hasMany(models.participant_condition, {foreignKey: 'participant_id'});
          participant.belongsToMany(models.condition, {through: 'participant_condition', foreignKey: 'participant_id'});
          // participant.hasMany(models.participant_review, {foreignKey: 'participant_id'});
        }
  };
  participant.init({
    // Add coloumn definations here
    participant_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    mrn: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    first_name: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    middle_name: {
      type: DataTypes.TEXT,
      allowNull: true,
      defaultValue: null,
    },
    last_name: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    date_of_birth: {
      type: DataTypes.DATE,
      allowNull: false,
    },
  }, {
    timestamps: true,
    sequelize,
    schema: 'sensorum',
    freezeTableName: true,
    underscored: true,
    modelName: 'participant',
  });
  return participant;
};
