/* eslint-disable camelcase */
import {Model, Sequelize, DataTypes} from 'sequelize';
import db from './db';

export const condition = (sequelize: Sequelize) => {
  /**
   * Model class for condition relation
   */
  class condition extends Model {
        public condition_id!: number;
        public condition_name!: string;

        /**
        * Helper method for defining associations.
        * This method is not a part of Sequelize lifecycle.
        * The `models/index` file will call this method automatically.
        * @param {db} models
        */
        static associate(models: typeof db) {
          // define associations here
          console.log('Association Executed condition');
          condition.belongsToMany(models.participant,
              {through: 'participant_condition', foreignKey: 'condition_id'},
          );
        }
  };
  condition.init({
    // Add coloumn definations here
    condition_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      allowNull: false,
      autoIncrement: true,
    },
    condition_name: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
  }, {
    timestamps: false,
    schema: 'sensorum',
    sequelize,
    freezeTableName: true,
    underscored: true,
    modelName: 'condition',
  });
  return condition;
};
