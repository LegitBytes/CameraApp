'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
     await queryInterface.createTable('user_sites', 
     {
       isDisabled  :{
         type : Sequelize.BOOLEAN,
       },
       userId : {
         type : Sequelize.UUID
       },
       siteId : {
         type : Sequelize.UUID
       },
       createdAt: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      updatedAt: {
        type: Sequelize.DATE,
        allowNull: false,
      },
     });
     
  },

  down: async (queryInterface, Sequelize) => {
    
    await queryInterface.dropTable('user_sites');
     
  }
};
