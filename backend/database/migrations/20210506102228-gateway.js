/* eslint-disable new-cap */
'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable(
        {tableName: 'gateway', schema: 'sensorum'},
        {
          gateway_id: {
            type: Sequelize.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
          },
          mac_address: {
            type: Sequelize.STRING(17),
            allowNull: false,
          },
          aws_thing_name: {
            type: Sequelize.STRING,
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
    await queryInterface.dropTable({tableName: 'gateway', schema: 'sensorum'});
  },
};
