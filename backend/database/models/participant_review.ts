/* eslint-disable new-cap */
/* eslint-disable camelcase */
/* eslint-disable max-len */
import {Model, Sequelize, DataTypes} from 'sequelize';
import db from './db';

export const participant_review = (sequelize: Sequelize) => {
  /**
   * Model for participant_review relation
   */
  class participant_review extends Model {
        public participant_review_id!: number;
        public participant_id!: number;
        public reviewer_id!: number;
        public reviewer_result!: string;
        public review_rationale_payload: JSON;
        public review_note: string;

        /**
        * Helper method for defining associations.
        * This method is not a part of Sequelize lifecycle.
        * The `models/index` file will call this method automatically.
        * @param {db} models
        */
        static associate(models: typeof db) {
          // define associations here
          participant_review.belongsTo(models.participant, {foreignKey: 'participant_id'});
        }
  };
  participant_review.init({
    // Add coloumn definations here
    participant_review_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    reviewer_result: {
      type: DataTypes.ENUM('no_action', 'escalate', 'other'),
      allowNull: false,
    },
    review_rationale_payload: {
      type: DataTypes.JSON,
    },
    review_note: {
      type: DataTypes.TEXT,
    },
  }, {
    timestamps: true,
    sequelize,
    freezeTableName: true,
    schema: 'sensorum',
    underscored: true,
    modelName: 'participant_review',
  });
  return participant_review;
};
