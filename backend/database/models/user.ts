
import { Model, Sequelize, DataTypes ,
    // HasManyGetAssociationsMixin,
    HasManyAddAssociationMixin,
    HasManyCountAssociationsMixin,
    HasManyCreateAssociationMixin
} from 'sequelize';

import { String } from 'aws-sdk/clients/cloudsearch';
import db from '@models/db'

export const user = (sequelize: Sequelize) => {
    class User extends Model{
        
        public countCustomer !: HasManyCountAssociationsMixin;
        public setCustomer !: HasManyCreateAssociationMixin<Object | String>
        public addCustomer !: HasManyAddAssociationMixin< Object , String | string[]>
        
        public countSite !: HasManyCountAssociationsMixin;
        public setSite !: HasManyCreateAssociationMixin<Object | String>
        public addSite !: HasManyAddAssociationMixin< Object , String | string[]>

        public countCamera !: HasManyCountAssociationsMixin;
        public setCamera !: HasManyCreateAssociationMixin<Object | String>
        public addCamera !: HasManyAddAssociationMixin< Object , String | string[]>


        static associate(models: typeof db) {

            User.belongsToMany(models.camera, {as : 'cameras', through : models.user_camera, foreignKey:'userId'});
            User.belongsTo(models.group, {foreignKey : 'groupId'});
            User.belongsToMany(models.customer, {through : models.user_customer, as : 'customers', foreignKey : 'userId'});
            User.belongsToMany(models.site, {as : 'sites', through : models.user_site, foreignKey: 'userId'});
            User.belongsTo(models.integrator, {foreignKey : 'integratorId'});

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