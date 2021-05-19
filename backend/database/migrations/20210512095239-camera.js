'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    
    await queryInterface.createTable('cameras', {
      cameraId: {
        type : Sequelize.UUID,
        allowNull: false,
        primaryKey: true,
      },
      cameraAliases :{
          type : Sequelize.STRING
      },
      groupId :{
          type : Sequelize.UUID,
          allowNull: false,
          references : {
            model : 'groups',
            key : 'groupId'
          }
      },
      siteId :{
          type : Sequelize.UUID,
          allowNull: false,
          references : {
            model : 'sites',
            key : 'siteId'
          }
      },
      integratorId : {
          type : Sequelize.UUID,
          allowNull: false,
          references : {
            model : 'integrators',
            key : 'integratorId'
          }
      },
      emailId : {
        type : Sequelize.STRING,
        validate : {
            isEmail : true,
            notEmpty : true
        }
      },
      createdAt: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      updatedAt: {
        type: Sequelize.DATE,
        allowNull: false,
      }
    })
  },

  down: async (queryInterface, Sequelize) => {

    await queryInterface.dropTable('cameras');
  }
};
