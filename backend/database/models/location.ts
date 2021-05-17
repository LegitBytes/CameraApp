import { Model, Sequelize, DataTypes } from 'sequelize';
import db from './db';

export const location = (sequelize: Sequelize) => {
    class location extends Model{
        public location_id!: number;

        static associate(models: typeof db) {
            location.hasMany(models.site, {foreignKey : 'locationId'});
            location.belongsToMany(models.customer, {as : 'customers', through : 'customer_location'});
            location.belongsTo(models.integrator, {foreignKey : 'integratorId'});
        }
    };
    location.init({
    // Add coloumn definations here
        locationId: {
            type: DataTypes.UUID,
            allowNull: false,
            primaryKey: true,
            defaultValue : DataTypes.UUIDV4,
        },
        locationAlias : {
            type : DataTypes.STRING,
            allowNull : false
        },
        organisationId : {
            type: DataTypes.UUID
        },
        integratorId : {
            type : DataTypes.UUID
        }
    },
    {
        timestamps: true,
        sequelize,
        modelName: 'location',
    }
        );
    return location
};