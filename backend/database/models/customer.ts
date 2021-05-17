import { Model, Sequelize, DataTypes } from 'sequelize';
import db from './db';

export const customer = (sequelize: Sequelize) => {
    class customer extends Model{
        public location_id!: number;

        static associate(models: typeof db) {
            customer.hasMany(models.site, {foreignKey : 'customerId'});
            customer.belongsToMany(models.user, {as : 'users', through : 'user_customer'});
            customer.belongsTo(models.integrator, {foreignKey : 'integratorId'});
        }
    };
    customer.init({

        customerId: {
            type: DataTypes.UUID,
            allowNull: false,
            primaryKey: true,
            defaultValue : DataTypes.UUIDV4,
        },
        customerAlias : {
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
        modelName: 'customer',
    }
        );
    return customer
};