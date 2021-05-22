import { Model, Sequelize, DataTypes } from 'sequelize';
import db from './db';

export const user_camera = (sequelize: Sequelize) => {
    class user_camera extends Model{

        static associate(models: typeof db) {
            // define associations here
        }
    };
    user_camera.init({
        
        isDisables : {
            type : DataTypes.BOOLEAN,
            defaultValue : false
        }
    }, {
        timestamps: true,
        sequelize,
        modelName: 'user_camera',
    });
    return user_camera
};