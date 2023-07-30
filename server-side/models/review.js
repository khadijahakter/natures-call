'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    // Seed data for bathrooms table
    await queryInterface.bulkInsert('bathrooms', [
      {
        sourceid: 'bathroom1',
        address: '123 Main St',
        lat: '40.123456',
        lng: '-74.654321',
        name: 'Main Street Bathroom',
        rating: 4,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      // Add more bathroom entries here if needed
    ]);

    // Seed data for reviews table
    await queryInterface.bulkInsert('reviews', [
      {
        profileId: 1,
        bathroomId: 1,
        ReviewId: 1,
        content: 'This is a great bathroom!',
        photo: 'https://example.com/bathroom.jpg',
        wheelchair: 1,
        unisex: 1,
        emergencyCord: 0,
        emergencyButton: 1,
        petFriendly: 1,
        requiresKey: 0,
        handDryer: 1,
        feminineProducts: 1,
        toiletCovers: 1,
        bidet: 0,
        singleStall: 1,
        multipleStall: 0,
        changingTable: 1,
        trashCan: 1,
        goodFlooring: 1,
        airFreshener: 1,
        automatic: 1,
        coatHook: 1,
        brailleSign: 0,
        hotWater: 1,
        firstAid: 1,
        sharpsDisposal: 0,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      // Add more review entries here if needed
    ]);
  },

  async down(queryInterface, Sequelize) {
    // Delete data from both tables
    await queryInterface.bulkDelete('bathrooms', null, {});
    await queryInterface.bulkDelete('reviews', null, {});
  }
};
