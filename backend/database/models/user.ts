import { Model, Sequelize, DataTypes } from "sequelize";
import db from "./db";

export const user = (sequelize: Sequelize) => {
  class user extends Model {
    public user_id!: number;

    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models: typeof db) {
      // define associations here
    }
  }
  user.init(
    {
      // Add coloumn definations here
      user_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
      },
    },
    {
      timestamps: true,
      sequelize,
      modelName: "user",
    }
  );
  return user;
};
