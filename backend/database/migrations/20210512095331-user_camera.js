'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    
    await queryInterface.createTable('user_cameras', {
      isDisables : {
        type : Sequelize.BOOLEAN,
        defaultValue : false
      },
      userId : {
        type : Sequelize.UUID
      },
      cameraId : {
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

    await queryInterface.dropTable('user_cameras');
  }
};
