import { Model, Sequelize, DataTypes } from 'sequelize';
import db from './db';

export const customer = (sequelize: Sequelize) => {
    class customer extends Model{

        public customerId : string;
        public customerName : string;
        public groupId : string;
        public integratorId : string;
        public createdAt : string;
        public updatedAt : string;

        static associate(models: typeof db) {
            customer.hasMany(models.site, {foreignKey : 'customerId', as : 'sites'});
            customer.belongsToMany(models.user, {through : models.user_customer, as : 'users', foreignKey : 'customerId'});
            customer.belongsTo(models.integrator, {foreignKey : 'integratorId'});
            customer.belongsTo(models.group, {foreignKey : 'groupId', as : 'group'})
        }
    };
    customer.init({

        customerId: {
            type: DataTypes.UUID,
            allowNull: false,
            primaryKey: true,
            defaultValue : DataTypes.UUIDV4,
        },
        customerName : {
            type : DataTypes.STRING,
            allowNull : false
        },
        groupId : {
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