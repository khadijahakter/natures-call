'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.addColumn("bathrooms", "UserId", {
      type: Sequelize.INTEGER,
      references: {
        model: "users", // you can use the table name here not model
        key: "UserId", // primary key
      },
      onUpdate: "CASCADE", //
      onDelete: "SET NULL", //
    });
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.removeColumn("bathrooms", "UserId");
  }
};
