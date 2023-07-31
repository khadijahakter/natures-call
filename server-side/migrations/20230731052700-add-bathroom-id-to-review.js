'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.addColumn("reviews", "BathroomId", {
      type: Sequelize.INTEGER,
      references: {
        model: "bathrooms", 
        key: "id", 
      },
      onUpdate: "CASCADE", 
      onDelete: "SET NULL", 
    });
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.removeColumn("reviews", "UserId");
  }
};
