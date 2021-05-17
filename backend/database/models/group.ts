import { Model, Sequelize, DataTypes } from "sequelize";
import db from "./db";

export const group = (sequelize: Sequelize) => {
  class group extends Model {
    public id!: string;
    public groupName: string;
    public isDisabled: boolean;

    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;

    static associate(models: typeof db) {
      models.group.hasMany(models.user, { foreignKey: "groupId" });
      models.user.belongsTo(models.group, {foreignKey : 'groupId'});
      models.group.belongsTo(models.integrator, {foreignKey : 'integratorId'});
    }
  }
  group.init(
    {
      groupId: {
        type: DataTypes.UUIDV4,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
        allowNull: false,
      },
      groupName: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      isDisabled: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },
    },
    {
      timestamps: true,
      sequelize,
      modelName: "groups",
    }
  );
  return group;
};
