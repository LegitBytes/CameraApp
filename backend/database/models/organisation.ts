import { Model, Sequelize, DataTypes } from 'sequelize';
import db from './db';

export const organisation = (sequelize: Sequelize) => {
    class organisation extends Model{
        public organisation_id!: number;

        /**
        * Helper method for defining associations.
        * This method is not a part of Sequelize lifecycle.
        * The `models/index` file will call this method automatically.
        */
        static associate(models: typeof db) {
            // define associations here

            // this will add organisationId in customerTable
            organisation.hasMany(models.customer, {foreignKey : 'organisationId'});
            organisation.belongsTo(models.integrator, {foreignKey: 'integratorId' })
        }
    };
    organisation.init({
    // Add coloumn definations here
        organisationId: {
            type: DataTypes.UUID,
            allowNull: false,
            primaryKey: true,
            defaultValue : DataTypes.UUIDV4
        },
        organisationAlias : {
            type : DataTypes.STRING,
            allowNull : false
        },
        smtpUserName : {
            type : DataTypes.STRING,
            unique : true,
        },
        smtpPassword : {
            type : DataTypes.STRING,
        },
        integratorId : {
            type : DataTypes.UUID
        }
    }, {
        timestamps: true,
        sequelize,
        modelName: 'organisation',
    });
    return organisation
};