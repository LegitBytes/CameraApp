'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable(
        {tableName: 'cough_file', schema: 'sensorum'},
        {
          cough_file_id: {
            type: Sequelize.UUID,
            allowNull: false,
            primaryKey: true,
          },
          sensor_event_uid: {
            type: Sequelize.UUID,
            allowNull: false,
            references: {
              model: 'sensor_event',
              key: 'sensor_event_uid',
            },
            onDelete: 'cascade',
            onUpdate: 'cascade',
          },
          file_location: {
            type: Sequelize.TEXT,
            allowNull: false,
          },
          created_at: {
            type: Sequelize.DATE,
            allowNull: false,
          },
          updated_at: {
            type: Sequelize.DATE,
            allowNull: false,
          },

        });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable(
        {tableName: 'cough_file', schema: 'sensorum'},
    );
  },
};
