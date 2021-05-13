'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    
    await queryInterface.createTable('customer', 
      {
        customerId: {
          type: Sequelize.INTEGER,
          allowNull: false,
          primaryKey: true,
        },

        organisationId :{
            type : Sequelize.UUID,
            allowNull: false,
            references : {
              model : 'organisation',
              key : 'organisationId'
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
      }
    );
  },

  down: async (queryInterface, Sequelize) => {
    
    await queryInterface.dropTable('customer');
     
  }
};
