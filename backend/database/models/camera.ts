import { Model, Sequelize, DataTypes } from "sequelize";
import db from "./db";

export const camera = (sequelize: Sequelize) => {
  class camera extends Model {
    public cameraId!: string;
    public cameraAliases: string;
    public cameraIp: string;
    public emailId: string;
    public totalRequest: number;
    public smtpUserName: string;
    public smtpPassword: string;

    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;

    static associate(models: typeof db) {
      camera.belongsToMany(models.customer, {
        through: models.customer_camera,
      });
      camera.belongsTo(models.site, { foreignKey: "siteId" });
      camera.belongsTo(models.integrator, { foreignKey: "integratorId" });
    }
  }
  camera.init(
    {
      cameraId: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false,
        primaryKey: true,
      },
      cameraAliases: {
        type: DataTypes.STRING,
      },
      cameraIp: {
        type: DataTypes.STRING,
      },
      totalRequest: {
        type: DataTypes.NUMBER,
      },
      smtpUserName: {
        type: DataTypes.STRING,
      },
      smtpPassword: {
        type: DataTypes.STRING,
      },
      groupId: {
        type: DataTypes.UUID,
        allowNull: false,
      },
      siteId: {
        type: DataTypes.UUID,
        allowNull: false,
      },
      integratorId: {
        type: DataTypes.UUID,
        allowNull: false,
      },
      emailId: {
        type: DataTypes.STRING,
        validate: {
          isEmail: true,
          notEmpty: true,
        },
      },
    },
    {
      timestamps: true,
      sequelize,
      modelName: "camera",
    }
  );
  return camera;
};
