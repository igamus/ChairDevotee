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
      {
        ownerId: 3,
        address: '67 Bridge St',
        city: 'London',
        country: 'England',
        name: 'Big Ben',
        description: 'Spend an evening of whimsey on the grounds of this landmark tower',
        price: 1299.99,
      },
      {
        ownerId: 6,
        address: '64 Alvord Ln',
        city: 'Stamford',
        state: 'Connecticut',
        country: 'USA',
        name: '3 bedrooms + 2.5 bathrooms',
        description: 'Our home is your home!',
        price: 89.99,
      },
      {
        ownerId: 1,
        address: '1300 Walt Whitman Rd NY 11747',
        city: 'Melville',
        state: 'New York',
        country: 'USA',
        name: 'Studio Mid-Rise',
        description: 'Perfect for tool storage',
        price: 45.00,
      },
      {
        ownerId: 3,
        address: '558 Hillgreen Dr',
        city: 'Beverley Hills',
        state: 'California',
        country: 'USA',
        name: 'LA Villa',
        description: 'Live like Weezer in Beverley Hills',
        price: 512.99,
      },
      {
        ownerId: 3,
        address: 'Otopark 379 A',
        city: 'Izmir',
        country: 'Turkey',
        name: 'Seaside flat',
        description: 'By ocean, very pretty',
        price: 78.68,
      },
      {
        ownerId: 4,
        address: '525 S Forest Ave',
        city: 'Tempe',
        state: 'Arizona',
        country: 'USA',
        name: 'tempe apt',
        description: 'in walking distanc eof Mill ave!',
        price: 75.99,
      },
      {
        ownerId: 1,
        address: '418 Seventh Ave',
        city: 'Pittsburgh',
        state: 'Pennsylvania',
        country: 'USA',
        name: '2br+1bth',
        description: 'Stay a while and enjoy downtown Pittsburgh!',
        price: 50.00,
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
      name: { [Op.in]: [
        'Chez Moi',
        'Brooklyn Bridge',
        'QUT Basketball and Netball Courts',
        'Ole MeePops Basement',
        'Shed',
        'Big Ben',
        '3 bedrooms + 2.5 bathrooms',
        'Studio Mid-Rise',
        'LA Villa',
        'Seaside flat',
        'tempe apt',
        '2br+1bth'
      ] }
    }, {});
  }
};
