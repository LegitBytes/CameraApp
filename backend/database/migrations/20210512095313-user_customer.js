'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {

    await queryInterface.createTable('user_customers', { 
      userId :{
        type : Sequelize.UUID,
        references : {
          model : 'users',
          key : 'userId'
        }
      },
      customerId :{
        type : Sequelize.UUID,
        references : {
          model : 'customers',
          key : 'customerId'
        }
      }
     });
  },

  down: async (queryInterface, Sequelize) => {
 
    await queryInterface.dropTable('user_customers');
  }
};
