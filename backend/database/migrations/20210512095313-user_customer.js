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
      },
      createdAt: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      updatedAt: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      isDisabled : {
        type : Sequelize.BOOLEAN,
        default : false
      }
    });
  },

  down: async (queryInterface, Sequelize) => {
 
    await queryInterface.dropTable('user_customers');
  }
};
