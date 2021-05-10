'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable(
        {tableName: 'participant_review', schema: 'sensorum'},
        {
          participant_review_id: {
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
          reviewer_id: {
            type: Sequelize.INTEGER,
            references: {
              model: 'reviewer',
              key: 'reviewer_id',
            },
            onDelete: 'set null',
            onUpdate: 'cascade',
          },
          reviewer_result: {
            // eslint-disable-next-line new-cap
            type: Sequelize.ENUM('no_action', 'escalate', 'other'),
            allowNull: false,
          },
          review_rationale_payload: {
            type: Sequelize.JSON,
          },
          review_note: {
            type: Sequelize.TEXT,
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
        {tableName: 'participant_review', schema: 'sensorum'},
    );
  },
};
