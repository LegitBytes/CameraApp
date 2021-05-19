"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("groups", {
      groupId: {
        type: Sequelize.UUID,
        allowNull: false,
        primaryKey: true,
      },
      groupName: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      isDisabled: {
        type: Sequelize.BOOLEAN,
        defaultValue: false,
      },
      integratorId: {
        type: Sequelize.UUID,
        references: {
          model: "integrators",
          key: "integratorId",
        },
      },
      createdAt: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      updatedAt: {
        type: Sequelize.DATE,
        allowNull: false,
      },
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable("groups");
  },
};
