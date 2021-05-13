import { Model, Sequelize, DataTypes } from 'sequelize';
import db from './db';

export const site = (sequelize: Sequelize) => {
    class site extends Model{
        
        
        static associate(models: typeof db) {

            site.hasMany(models.camera, {foreignKey : 'siteId'});
            site.belongsTo(models.location, {foreignKey : 'locationId'});
            site.belongsToMany(models.customer, {through : 'customer_site'});
            site.belongsTo(models.integrator, {foreignKey : 'integratorId'})
        }
    };
    site.init({

        siteId: {
            type: DataTypes.UUID,
            allowNull: false,
            primaryKey: true,
            defaultValue : DataTypes.UUIDV4
        },
        locationId: {
            type: DataTypes.UUID
        },
        siteAlias : {
            type : DataTypes.STRING,
            allowNull : false
        },
        organisationId : {
            type: DataTypes.UUID
        },
        integratorId : {
            type : DataTypes.UUID
        }
    }, {
        timestamps: true,
        sequelize,
        modelName: 'site',
    });
    return site
};