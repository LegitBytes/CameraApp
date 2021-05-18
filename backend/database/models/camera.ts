import { Model, Sequelize, DataTypes } from 'sequelize';
import db from './db';

export const camera = (sequelize: Sequelize) => {
    class camera extends Model{
        public camera_id!: number;

        /**
        * Helper method for defining associations.
        * This method is not a part of Sequelize lifecycle.
        * The `models/index` file will call this method automatically.
        */
        static associate(models: typeof db) {
            camera.belongsToMany(models.customer, {through : models.customer_camera});
            camera.belongsTo(models.site, {foreignKey : 'siteId'});
            camera.belongsTo(models.integrator, {foreignKey : 'integratorId'});
        }
    };
    camera.init({
    // Add coloumn definations here
        cameraId: {
            type : DataTypes.UUID,
            defaultValue : DataTypes.UUIDV4,
            allowNull: false,
            primaryKey: true,
        },
        cameraAliases :{
            type : DataTypes.STRING
        },
        groupId :{
            type : DataTypes.UUID,
            allowNull: false,
        },
        siteId :{
            type : DataTypes.UUID,
            allowNull: false
        },
        integratorId : {
            type : DataTypes.UUID,
            allowNull: false
        },
        emailId : {
            type : DataTypes.STRING,
            validate : {
                isEmail : true,
                notEmpty : true
            }
        }
    }, 
    {
        timestamps: true,
        sequelize,
        modelName: 'camera',
    });
    return camera
};