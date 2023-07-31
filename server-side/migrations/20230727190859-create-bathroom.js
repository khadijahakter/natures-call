'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('bathrooms', {
      bathroomId: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      sourceid: { 
        type: Sequelize.STRING,
        allowNull:false
      },
      address: { 
        type: Sequelize.STRING,
        allowNull:true
      },
      lat: { 
        type: Sequelize.STRING,
        allowNull:true
      },
      lng: { 
        type: Sequelize.STRING,
        allowNull:true
      },
      name: { 
        type: Sequelize.STRING,
        allowNull:true
      },
      rating: {
        type: Sequelize.INTEGER
      },
      content: {
        type: Sequelize.STRING
      },
      photo: {
        allowNull: true,
        type: Sequelize.STRING
      },
      wheelchair: {
        allowNull: true,
        type: Sequelize.INTEGER
      },
      unisex: {
        allowNull: true,
        type: Sequelize.INTEGER
      },
      emergencyCord: {
        allowNull: true,
        type: Sequelize.INTEGER
      },
      emergencyButton: {
        allowNull: true,
        type: Sequelize.INTEGER
      },
      petFriendly: {
        allowNull: true,
        type: Sequelize.INTEGER
      },
      requiresKey: {
        allowNull: true,
        type: Sequelize.INTEGER
      },
      handDryer: {
        allowNull: true,
        type: Sequelize.INTEGER
      },
      feminineProducts: {
        allowNull: true,
        type: Sequelize.INTEGER
      },
      toiletCovers: {
        allowNull: true,
        type: Sequelize.INTEGER
      },
      bidet: {
        allowNull: true,
        type: Sequelize.INTEGER
      },
      singleStall: {
        allowNull: true,
        type: Sequelize.INTEGER
      },
      multipleStall: {
        allowNull: true,
        type: Sequelize.INTEGER
      },
      changingTable: {
        allowNull: true,
        type: Sequelize.INTEGER
      },
      trashCan: {
        allowNull: true,
        type: Sequelize.INTEGER
      },
      goodFlooring: {
        allowNull: true,
        type: Sequelize.INTEGER
      },
      airFreshener: {
        allowNull: true,
        type: Sequelize.INTEGER
      },
      automatic: {
        allowNull: true,
        type: Sequelize.INTEGER
      },
      coatHook: {
        allowNull: true,
        type: Sequelize.INTEGER
      },
      brailleSign: {
        allowNull: true,
        type: Sequelize.INTEGER
      },
      hotWater: {
        allowNull: true,
        type: Sequelize.INTEGER
      },
      firstAid: {
        allowNull: true,
        type: Sequelize.INTEGER
      },
      sharpsDisposal: {
        allowNull: true,
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
    await queryInterface.dropTable('bathrooms');
  }
};