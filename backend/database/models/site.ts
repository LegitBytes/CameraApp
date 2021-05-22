import { Model, Sequelize, DataTypes,
    // HasManyGetAssociationsMixin,
    HasManyAddAssociationMixin,
    HasManyCountAssociationsMixin,
    HasManyCreateAssociationMixin
} from 'sequelize';
import db from './db';

export const site = (sequelize: Sequelize) => {
    class site extends Model{
        
        public countUser !: HasManyCountAssociationsMixin;
        public setUser !: HasManyCreateAssociationMixin<Object | String>
        public addUser !: HasManyAddAssociationMixin< Object , String | string[]>
        
    
        static associate(models: typeof db) {

            site.hasMany(models.camera, {foreignKey : 'siteId', as : 'cameras'});
            site.belongsTo(models.customer, {foreignKey : 'customerId', as : 'customers'});
            site.belongsToMany(models.user, {through : models.user_site, as : 'users', foreignKey : 'siteId'});
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
        // changedName : {
        //     type : DataTypes.STRING
        // },
        groupId : {
            type: DataTypes.UUID,
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