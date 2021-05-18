import { Model, Sequelize, DataTypes } from 'sequelize';
import db from './db';
export const user = (sequelize: Sequelize) => {
    class User extends Model{
        public customer_id!: number;

        static associate(models: typeof db) {

            User.belongsToMany(models.camera, {as : 'cameras', through : models.customer_camera, foreignKey:'userId'});
            User.belongsTo(models.group, {foreignKey : 'groupId'});
            User.belongsToMany(models.customer, {through : 'user_customer'})
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
        modelName: 'user',
        freezeTableName : true
    });
    return User
};