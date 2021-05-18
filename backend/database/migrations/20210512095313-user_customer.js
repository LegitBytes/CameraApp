'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {

    await queryInterface.createTable('user_customer', { 
      userId :{
        type : Sequelize.UUID,
        references : {
          model : 'user',
          key : 'userId'
        }
      },
      customerId :{
        type : Sequelize.UUID,
        references : {
          model : 'customer',
          key : 'customerId'
        }
      }
     });
  },

  down: async (queryInterface, Sequelize) => {
 
    await queryInterface.dropTable('user_customer');
  }
};
