'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable(
        {tableName: 'participant_adt', schema: 'sensorum'},
        {
          participant_adt_id: {
            type: Sequelize.INTEGER,
            allowNull: false,
            primaryKey: true,
          },
          sensor_timestamp: {
            type: Sequelize.DATE,
            allowNull: false,
          },
          patient_status_change: {
            // eslint-disable-next-line new-cap
            type: Sequelize.ENUM('admit', 'discharge', 'transfer'),
          },
          created_at: {
            type: Sequelize.DATE,
            allowNull: false,
          },
          updated_at: {
            type: Sequelize.DATE,
            allowNull: false,
          },
          participant_id: {
            type: Sequelize.INTEGER,
            allowNull: false,
            references: {
              model: 'participant',
              key: 'participant_id',
            },
            onUpdate: 'cascade',
            onDelete: 'set null',
          },
        });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable(
        {tableName: 'participant_adt', schema: 'sensorum'},
    );
  },
};
