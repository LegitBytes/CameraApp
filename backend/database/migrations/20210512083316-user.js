'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    
    await queryInterface.createTable('users', 
      {
        userId: {
          type: Sequelize.UUID,
          allowNull: false,
          primaryKey: true,
        },
        groupId :{
            type : Sequelize.UUID,
            allowNull: false,
            references : {
              model : 'groups',
              key : 'groupId'
            }
        },
        integratorId : {
          type : Sequelize.UUID,
          references : {
            model : 'integrators',
            key : 'integratorId'
          }
        },
        name : {
          type : Sequelize.STRING
        },
        secondName : {
          type : Sequelize.STRING,
          allowNull : true
        },
        email : {
          type : Sequelize.STRING
        },
        isDisabled :{
          type : Sequelize.BOOLEAN
        },
        createdAt: {
          type: Sequelize.DATE,
          allowNull: false,
        },
        updatedAt: {
          type: Sequelize.DATE,
          allowNull: false,
        },
      }
    );
  },

  down: async (queryInterface, Sequelize) => {
    
    await queryInterface.dropTable('users');
     
  }
};
