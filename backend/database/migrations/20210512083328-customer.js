'use strict';

module.exports = {
  up : async (queryInterface, Sequelize)=>{
    await queryInterface.createTable('customer', 
      {
        customerId: {
          type: Sequelize.UUID,
          allowNull: false,
          primaryKey: true,
        },
        customerName : {
            type : Sequelize.STRING,
            allowNull : false
        },
        groupId : {
            type: Sequelize.UUID,
            references: {
              model: 'groups',
              key: 'groupId',
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

    await queryInterface.dropTable('customer');
  
  }
  
}
