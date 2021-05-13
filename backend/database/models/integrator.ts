import { Model, Sequelize, DataTypes } from 'sequelize';
import db from './db';

export const integrator = (sequelize: Sequelize) => {
    class integrator extends Model{

        static associate(models: typeof db) {
            integrator.hasMany(models.location, {foreignKey : 'integratorId'});
            integrator.hasMany(models.site, {foreignKey : 'integratorId'});
            integrator.hasMany(models.camera, {foreignKey : 'integratorId'});
        }
    };
    integrator.init({

        integratorId: {
            type: DataTypes.UUID,
            allowNull: false,
            primaryKey: true,
            defaultValue : DataTypes.UUIDV4,
        },

        email : {
            type : DataTypes.STRING,
            validate :{
                isEmail : true
            }
        },
        phone : {
            type : DataTypes.NUMBER,
            validate : {
                len : [10, 10]
            }
        }

    }, {
        timestamps: true,
        sequelize,
        modelName: 'integrator',
    });
    return integrator
};