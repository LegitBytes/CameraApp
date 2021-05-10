'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable(
        {tableName: 'condition', schema: 'sensorum'},
        {
          condition_id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            allowNull: false,
            autoIncrement: true,
          },
          condition_name: {
            type: Sequelize.TEXT,
            allowNull: false,
          },
        });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable(
        {tableName: 'condition', schema: 'sensorum'},
    );
  },
};
