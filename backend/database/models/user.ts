
import { Model, Sequelize, DataTypes ,
    // HasManyGetAssociationsMixin,
    HasManyAddAssociationMixin,
    // Association,
    HasManyCountAssociationsMixin,
    HasManyCreateAssociationMixin
} from 'sequelize';
import db from './db';
// import {customerInterface} from './interfaces';

import {customer} from './customer'


export const user = (sequelize: Sequelize) => {
    class User extends Model{
        
        public countCustomer !: HasManyCountAssociationsMixin;
        public addCustomer !: HasManyAddAssociationMixin<typeof customer, 'string'>
        public setCustomer !: HasManyCreateAssociationMixin<typeof customer>

        static associate(models: typeof db) {
            console.log("association in users")
            
            User.belongsToMany(models.camera, {as : 'cameras', through : models.customer_camera, foreignKey:'userId'});
            User.belongsTo(models.group, {foreignKey : 'groupId'});
            User.belongsToMany(models.customer, {through : models.user_customer, as : 'customer', foreignKey : 'userId'})
            User.belongsToMany(models.site, {as : 'sites', through : 'user_site', foreignKey: 'userId'})
            User.belongsTo(models.integrator, {foreignKey : 'integratorId'})
        }
    };
    User.init({
        
        userId: {
            type: DataTypes.UUID,
            allowNull: false,
            primaryKey: true,
            defaultValue : DataTypes.UUIDV4
        },
        groupId :{
            type : DataTypes.UUID,
            allowNull: false,
        },
        integratorId :{
            type : DataTypes.UUID
        },
        name : {
            type : DataTypes.STRING
        },
        email :{
            type : DataTypes.STRING,
            validate : {
                isEmail : true
            }
        },
        isDisabled : {
            type : DataTypes.BOOLEAN,
            defaultValue : false
        }
    }, 
    {
        timestamps: true,
        sequelize,
        modelName: 'user'
    });
    return User
};