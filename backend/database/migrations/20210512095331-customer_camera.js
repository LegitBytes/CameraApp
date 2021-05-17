'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    
    await queryInterface.createTable('customer_camera', {
      isDisables : {
        type : Sequelize.BOOLEAN,
        defaultValue : false
      }
    });
     
  },

  down: async (queryInterface, Sequelize) => {

    await queryInterface.dropTable('customer_camera');
  }
};
