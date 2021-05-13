'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
     
    await queryInterface.createTable('integrator',{
      integratorId: {
        type: Sequelize.UUID,
        allowNull: false,
        primaryKey: true,
        defaultValue : Sequelize.UUIDV4,
      },

      email : {
          type : Sequelize.STRING,
          validate :{
              isEmail : true
          }
      },
      phone : {
          type : Sequelize.INTEGER,        
          validate : {
              len : [10, 10]
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
    });

  },

  down: async (queryInterface, Sequelize) => {
  
    await queryInterface.dropTable('integrator');
  
  }
};
