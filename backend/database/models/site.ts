import { Model, Sequelize, DataTypes } from 'sequelize';
import db from './db';

export const site = (sequelize: Sequelize) => {
    class site extends Model{
        
        
        static associate(models: typeof db) {

            site.hasMany(models.camera, {foreignKey : 'siteId'});
            site.belongsTo(models.customer, {foreignKey : 'customerId'});
            site.belongsToMany(models.user, {through : 'user_site'});
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
        customerId: {
            type: DataTypes.UUID
        },
        siteName : {
            type : DataTypes.STRING,
            allowNull : false
        },
        groupId : {
            type: DataTypes.UUID
        },
        integratorId : {
            type : DataTypes.UUID
        }
    }, {
        timestamps: true,
        sequelize,
        modelName: 'site'
    });
    return site
};