/* eslint-disable new-cap */
/* eslint-disable max-len */
'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable(
        {tableName: 'device', schema: 'sensorum'},
        {
          device_id: {
            type: Sequelize.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
          },
          participant_id: {
            type: Sequelize.INTEGER,
            references: {
              model: 'participant',
              key: 'participant_id',
            },
            onDelete: 'set null',
            onUpdate: 'cascade',
          },
          metric_type: {
            type: Sequelize.ENUM( 'one', 'two'),
            allowNull: false,
          },
          mac_address: {
            type: Sequelize.STRING(17),
            allowNull: false,
          },
          firmware_id: Sequelize.STRING,
          device_type: {
            type: Sequelize.ENUM('cough_sensor', 'bed_sensor', 'door_sensor', 'chair_sensor', 'toliet_flush_sensor', 'fridge_sensor', 'proximitiy_sensor'),
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
    await queryInterface.addIndex({tableName: 'device', schema: 'sensorum'}, {
      fields: ['mac_address'],
      name: 'device_mac_address',
    });
    await queryInterface.addIndex({tableName: 'device', schema: 'sensorum'}, {
      name: 'device_participant_id',
      fields: ['participant_id'],
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable({tableName: 'device', schema: 'sensorum'});
  },
};
