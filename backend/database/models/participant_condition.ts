/* eslint-disable camelcase */
import {Model, Sequelize} from 'sequelize';

export const participant_condition = (sequelize: Sequelize) => {
  /**
   * Model for participant_condiiton relation
   */
  class participant_condition extends Model {

  };
  participant_condition.init({
    // Add coloumn definations here
  }, {
    sequelize,
    underscored: true,
    timestamps: false,
    freezeTableName: true,
    schema: 'sensorum',
    modelName: 'participant_condition',
  });
  return participant_condition;
};
