import { Model, Sequelize } from 'sequelize';
import db from './db';

export const customer_location = (sequelize: Sequelize) => {
    class customer_location extends Model{
        public customer_location_id!: number;

        /**
        * Helper method for defining associations.
        * This method is not a part of Sequelize lifecycle.
        * The `models/index` file will call this method automatically.
        */
        static associate(models: typeof db) {
            
        }
    };
    customer_location.init({
    }, {
        timestamps: true,
        sequelize,
        modelName: 'customer_location',
    });
    return customer_location
};