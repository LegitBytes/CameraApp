'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    
    await queryInterface.createTable('user_cameras', {
      isDisables : {
        type : Sequelize.BOOLEAN,
        defaultValue : false
      }
    });
     
  },

  down: async (queryInterface, Sequelize) => {

    await queryInterface.dropTable('user_cameras');
  }
};
