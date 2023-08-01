'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    // Seed data for bathrooms table

     // Seed data for users table
     await queryInterface.bulkInsert('users', [
      {
        name: 'John Doe',
        email: 'john@example.com',
        password: 'hashed_password_here',
        photo: 'https://example.com/user.jpg',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Jane Smith',
        email: 'jane@example.com',
        password: 'hashed_password_here',
        photo: 'https://example.com/jane.jpg',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      // Add more user entries here if needed
    ]);

    await queryInterface.bulkInsert('bathrooms', [
      {
        sourceid: 'bathroom1',
        address: '123 Main St',
        lat: '40.123456',
        lng: '-74.654321',
        name: 'Main Street Bathroom',
        rating: 4,
        UserId: 1, // Foreign key reference to the user
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        sourceid: 'bathroom2',
        address: '456 Elm St',
        lat: '40.987654',
        lng: '-74.123456',
        name: 'Elm Street Restroom',
        rating: 3,
        UserId: 2, // Foreign key reference to the user
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      // Add more bathroom entries here if needed
    ]);

    // Seed data for reviews table
    await queryInterface.bulkInsert('reviews', [
      {
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
        UserId: 2, // Foreign key reference to the user
        bathroomId: 2, // Foreign key reference to the bathroom
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        content: 'Clean and well-maintained restroom.',
        photo: 'https://example.com/bathroom2.jpg',
        wheelchair: 1,
        unisex: 0,
        emergencyCord: 1,
        emergencyButton: 0,
        petFriendly: 0,
        requiresKey: 1,
        handDryer: 0,
        feminineProducts: 1,
        toiletCovers: 1,
        bidet: 1,
        singleStall: 0,
        multipleStall: 1,
        changingTable: 0,
        trashCan: 1,
        goodFlooring: 1,
        airFreshener: 0,
        automatic: 1,
        coatHook: 1,
        brailleSign: 0,
        hotWater: 1,
        firstAid: 0,
        sharpsDisposal: 1,
        UserId: 1, // Foreign key reference to the user
        bathroomId: 2, // Foreign key reference to the bathroom
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      // Add more review entries here if needed
    ]);

   
  },

  async down(queryInterface, Sequelize) {
    // Delete data from all three tables
    await queryInterface.bulkDelete('bathrooms', null, {});
    await queryInterface.bulkDelete('reviews', null, {});
    await queryInterface.bulkDelete('users', null, {});
  }
};
