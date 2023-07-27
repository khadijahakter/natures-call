'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Bathrooms', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      location: {
        type: Sequelize.STRING
      },
      rating: {
        type: Sequelize.INTEGER
      },
      profileId: {
        type: Sequelize.INTEGER
      },
      bathroomId: {
        type: Sequelize.INTEGER
      },
      content: {
        type: Sequelize.STRING
      },
      photo: {
        type: Sequelize.STRING
      },
      wheelchair: {
        type: Sequelize.INTEGER
      },
      unisex: {
        type: Sequelize.INTEGER
      },
      emergencyCord: {
        type: Sequelize.INTEGER
      },
      emergencyButton: {
        type: Sequelize.INTEGER
      },
      petFriendly: {
        type: Sequelize.INTEGER
      },
      requiresKey: {
        type: Sequelize.INTEGER
      },
      handDryer: {
        type: Sequelize.INTEGER
      },
      feminineProducts: {
        type: Sequelize.INTEGER
      },
      toiletCovers: {
        type: Sequelize.INTEGER
      },
      bidet: {
        type: Sequelize.INTEGER
      },
      singleStall: {
        type: Sequelize.INTEGER
      },
      multipleStall: {
        type: Sequelize.INTEGER
      },
      changingTable: {
        type: Sequelize.INTEGER
      },
      trashCan: {
        type: Sequelize.INTEGER
      },
      goodFlooring: {
        type: Sequelize.INTEGER
      },
      airFreshener: {
        type: Sequelize.INTEGER
      },
      automatic: {
        type: Sequelize.INTEGER
      },
      coatHook: {
        type: Sequelize.INTEGER
      },
      brailleSign: {
        type: Sequelize.INTEGER
      },
      hotWater: {
        type: Sequelize.INTEGER
      },
      firstAid: {
        type: Sequelize.INTEGER
      },
      sharpsDisposal: {
        type: Sequelize.INTEGER
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Bathrooms');
  }
};