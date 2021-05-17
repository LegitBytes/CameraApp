'use strict';

module.exports = {
  up : async (queryInterface, Sequelize)=>{
    await queryInterface.createTable('location', 
      {
        locationId: {
          type: Sequelize.UUID,
          allowNull: false,
          primaryKey: true,
        },
        locationAlias : {
            type : Sequelize.STRING,
            allowNull : false
        },
        organisationId : {
            type: Sequelize.UUID,
            references: {
              model: 'organisation',
              key: 'organisationId',
            },
        },
        integratorId : {
            type : Sequelize.UUID,
            references : {
              model : 'integrator',
              key : 'integratorId'
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
      }
    )
  },

  down : async(queryInterface, Sequelize)=>{

    await queryInterface.dropTable('location');
  
  }
  
}
