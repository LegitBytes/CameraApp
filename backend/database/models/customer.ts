import { Model, Sequelize, DataTypes } from 'sequelize';
import db from './db';
export const customer = (sequelize: Sequelize) => {
    class customer extends Model{
        public customer_id!: number;

        /**
        * Helper method for defining associations.
        * This method is not a part of Sequelize lifecycle.
        * The `models/index` file will call this method automatically.
        */
        static associate(models: typeof db) {

            customer.belongsToMany(models.camera, {as : 'cameras', through : models.customer_camera});
            customer.belongsTo(models.organisation, {foreignKey : 'organisationId'});
            customer.belongsToMany(models.location, {as : 'locations', through : 'customer_location'})
            customer.belongsToMany(models.site, {as : 'sites', through : 'customer_site'})
        }
    };
    customer.init({
    // Add coloumn definations here
        customerId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            defaultValue : DataTypes.UUIDV4
        },

        organisationId :{
            type : DataTypes.UUID,
            allowNull: false,
        },
        // locationId :{
        //     type : DataTypes.UUID,
        //     allowNull: false,
        // },
    }, 
    {
        timestamps: true,
        sequelize,
        modelName: 'customer',
    });
    return customer
};