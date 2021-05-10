'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */
    await queryInterface.createTable(
        {tableName: 'participant', schema: 'sensorum'},
        {
          participant_id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true,
          },
          mrn: {
            // eslint-disable-next-line new-cap
            type: Sequelize.STRING(100),
            allowNull: false,
          },
          first_name: {
            type: Sequelize.TEXT,
            allowNull: false,
          },
          middle_name: {
            type: Sequelize.TEXT,
            allowNull: true,
            defaultValue: null,
          },
          last_name: {
            type: Sequelize.TEXT,
            allowNull: false,
          },
          date_of_birth: {
            type: Sequelize.DATE,
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
    /**
     * Add reverting commands here.
     *
     * Example:
     */
    await queryInterface.dropTable(
        {tableName: 'participant', schema: 'sensorum'},
    );
  },
};
