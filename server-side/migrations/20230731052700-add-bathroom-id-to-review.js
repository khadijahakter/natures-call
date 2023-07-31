'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.addColumn("reviews", "bathroomId", {
      type: Sequelize.INTEGER,
      references: {
        model: "bathrooms", 
        key: "bathroomId", 
      },
      onUpdate: "CASCADE", 
      onDelete: "SET NULL", 
    });
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.removeColumn("reviews", "bathroomId");
  }
};
