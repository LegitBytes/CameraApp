"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("user", {
      userId: {
        type: Sequelize.UUID,
        allowNull: false,
        primaryKey: true,
      },
      userEmail: {
        type: Sequelize.STRING,
        validate: {
          isEmail: true,
          notEmpty: true,
        },
      },
      groupId: {
        type: Sequelize.UUID,
        allowNull: false,
        references: {
          model: "groups",
          key: "groupId",
        },
      },
      integratorId: {
        type: Sequelize.UUID,
        allowNull: false,
        references: {
          model: "integrator",
          key: "integratorId",
        },
      },
      isDisabled: {
        type: Sequelize.BOOLEAN,
        default: false,
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
    await queryInterface.dropTable("user");
  },
};
