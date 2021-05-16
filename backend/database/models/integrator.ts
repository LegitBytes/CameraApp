import { Model, Sequelize, DataTypes } from "sequelize";
import db from "./db";

export const integrator = (sequelize: Sequelize) => {
  class integrator extends Model {
    public integrator_id!: number;

    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models: typeof db) {
      // define associations here
    }
  }
  integrator.init(
    {
      // Add coloumn definations here
      integrator_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
      },
    },
    {
      timestamps: true,
      sequelize,
      modelName: "integrator",
    }
  );
  return integrator;
};
