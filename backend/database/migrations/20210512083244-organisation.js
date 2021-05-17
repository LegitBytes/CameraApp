'use strict';

module.exports =  {
 
  up : async(queryInterface, Sequelize)=>{

    await queryInterface.createTable('organisation',
      {
        organisationId: {
          type: Sequelize.UUID,
          allowNull: false,
          primaryKey: true,
        },
        organisationAlias: {
          type: Sequelize.STRING,
          allowNull: false
        },
        integratorId : {
          type : Sequelize.STRING,
          reference :{
            model : 'integrator',
            key : 'integratorId'
          }
        },
        smtpUserName: {
          type: Sequelize.STRING,
          unique: true,
        },
        smtpPassword: {
          type: Sequelize.STRING,
        },
        createdAt: {
          type: Sequelize.DATE,
          allowNull: false,
        },
        updatedAt: {
          type: Sequelize.DATE,
          allowNull: false,
        },
  })},

  down : async(queryInterface, Sequelize)=>{

    await queryInterface.dropTable('organisation');
  
  }
  
}