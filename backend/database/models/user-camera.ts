import { Model, Sequelize, DataTypes } from 'sequelize';
import db from './db';

export const customer_camera = (sequelize: Sequelize) => {
    class customer_camera extends Model{
        public customer_camera_id!: number;

        /**
        * Helper method for defining associations.
        * This method is not a part of Sequelize lifecycle.
        * The `models/index` file will call this method automatically.
        */
        static associate(models: typeof db) {
            // define associations here
        }
    };
    customer_camera.init({
        
        isDisables : {
            type : DataTypes.BOOLEAN,
            defaultValue : false
        }
    }, {
        timestamps: true,
        sequelize,
        modelName: 'customer_camera',
    });
    return customer_camera
};