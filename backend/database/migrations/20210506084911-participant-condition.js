'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable(
        {tableName: 'participant_condition', schema: 'sensorum'},
        {
          participant_id: {
            type: Sequelize.INTEGER,
            allowNull: false,
            primaryKey: true,
            references: {
              model: 'participant',
              key: 'participant_id',
            },
            onUpdate: 'cascade',
            onDelete: 'cascade',
          },
          condition_id: {
            type: Sequelize.INTEGER,
            allowNull: false,
            primaryKey: true,
            references: {
              model: 'condition',
              key: 'condition_id',
            },
            onUpdate: 'cascade',
            onDelete: 'cascade',
          },
        });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable(
        {tableName: 'participant_condition', schema: 'sensorum'},
    );
  },
};
