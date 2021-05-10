'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createSchema('sensorum');
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropSchema('sensorum');
  },
};
