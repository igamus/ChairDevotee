'use strict';

/** @type {import('sequelize-cli').Migration} */

let options = {};
if (process.env.NODE_ENV === 'production') options.schema = process.env.SCHEMA;

module.exports = {
  up: async (queryInterface, Sequelize) => {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
    options.tableName = 'Spots';
    return queryInterface.bulkInsert(options, [
      {
        ownerId: 1,
        address: '14 Rue des Grisons',
        city: 'Quebec City',
        state: 'Quebec',
        country: 'Canada',
        lat: 46.810408295926344,
        lng: -71.20662862099589,
        name: 'Chez Moi',
        description: 'Apartment near the Chateau Bellevue',
        price: 339.99,
      },
      {
          ownerId: 2,
          address: '162 Nassau St',
          city: 'New York City',
          state: 'New York',
          country: 'USA',
          lat: 40.7061,
          lng: -73.9969,
          name: 'Brooklyn Bridge',
          description: 'I\'ll sell it to you',
          price: 7555,
      },
      {
          ownerId: 1,
          address: '60A Gardens Point Rd',
          city: 'Brisbane City QLD 4000',
          state: 'Queensland',
          country: 'Australia',
          lat: -27.478497386131252,
          lng: 153.0288397055843,
          name: 'QUT Basketball and Netball Courts',
          description: 'Ground near the water with amenities',
          price: 14.99,
      },
      {
          ownerId: 5,
          address: '401 E Main Cross St',
          city: 'Greenville',
          state: 'Kentucky',
          country: 'USA',
          lat: 37.20549586912357,
          lng: -87.16941266299543,
          name: 'Ole MeePops Basement',
          description: 'Don\'t worry about it.',
          price: 38.62,
      },
      {
          ownerId: 1,
          address: 'Kreuzgasse 102',
          city: 'Schruns',
          country: 'Austria',
          name: 'Shed',
          description: 'Perfect for tool storage',
          price: 12.99,
      },
    ], {});
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    options.tableName = 'Spots';
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(options, {
      name: { [Op.in]: ['Chez Moi', 'Brooklyn Bridge', 'QUT Basketball and Netball Courts', 'Ole MeePops Basement', 'Shed'] }
    }, {});
  }
};
