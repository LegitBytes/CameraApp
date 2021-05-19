'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('sites', 
      {
        siteId: {
          type: Sequelize.UUID,
          allowNull: false,
          primaryKey: true,
        },
        customerId: {
            type: Sequelize.UUID,
            references: {
              model: 'customers',
              key: 'customerId',
            },
        },
        siteName : {
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
            references: {
              model: 'integrators',
              key: 'integratorId',
            },
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
    );
  },

  down: async (queryInterface, Sequelize) => {

    await queryInterface.dropTable('sites');
  }
};
