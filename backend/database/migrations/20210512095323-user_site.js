'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
     await queryInterface.createTable('user_site', 
     {
       isDisabled  :{
         type : Sequelize.BOOLEAN,
       },
       userId : {
         type : Sequelize.UUID
       },
       siteId : {
         type : Sequelize.UUID
       }
     });
     
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
  }
};
