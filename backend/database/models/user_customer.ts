import { Model, Sequelize } from 'sequelize';
import db from './db';

export const user_customer= (sequelize: Sequelize) => {
    class user_customer extends Model{
        public customer_location_id!: number;

        /**
        * Helper method for defining associations.
        * This method is not a part of Sequelize lifecycle.
        * The `models/index` file will call this method automatically.
        */
        static associate(models: typeof db) {
            
        }
    };
    user_customer.init({

    }, {
        timestamps: true,
        sequelize,
        modelName: 'user_customer'
    });
    return user_customer
};