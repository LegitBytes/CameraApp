import { Model, Sequelize, DataTypes } from 'sequelize';
import db from './db';

export const user_site = (sequelize: Sequelize) => {
    class user_site extends Model{
        public user_site_id!: number;

        static associate(models: typeof db) {
            // define associations here
        }
    };
    user_site.init({

        userId : {
            type : DataTypes.UUID
        },
        siteId : {
            type : DataTypes.UUID
        },
        isDisabled : {
            type : DataTypes.BOOLEAN,
            defaultValue : false
        }
    
    }, {
        timestamps: true,
        sequelize,
        modelName: 'user_site',
    });
    return user_site
};