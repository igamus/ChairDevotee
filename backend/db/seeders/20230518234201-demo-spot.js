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
        ownerId: 3,
        address: '14 Rue des Grisons',
        city: 'Quebec City',
        state: 'Quebec',
        country: 'Canada',
        lat: 46.810408295926344,
        lng: -71.20662862099589,
        name: 'Gaming Chair',
        description: 'Comfortable chair to game in. Located at a screen! Swivels. Head and arm rests. Access to Steam, Discord.',
        price: 39.99,
      },
      {
        ownerId: 6,
        address: '176 Long Beach Rd',
        city: 'Island Park',
        state: 'New York',
        country: 'USA',
        lat: 40.6022,
        lng: -73.6560,
        name: 'Library Round Reading Chair',
        description: 'Reading chair located in the Island Park Public Library. Pick up your favorite story and take a cozy seat!',
        price: 3.99,
      },
      {
        ownerId: 8,
        address: 'London SW1A 1AA',
        city: 'London',
        state: 'England',
        country: 'United Kingdom',
        lat: 51.5019,
        lng: -0.1415,
        name: 'The Royal Throne',
        description: 'Come sit upon the throne of majesty and wield the power of royalty.',
        price: 5999.99,
      },
      {
        ownerId: 3,
        address: '60A Gardens Point Rd',
        city: 'Brisbane City QLD 4000',
        state: 'Queensland',
        country: 'Australia',
        lat: -27.478497386131252,
        lng: 153.0288397055843,
        name: 'QUT Conference Room Chair by the Window',
        description: 'Third chair from the window in a conference room. Swivels. Comfortable. Slight rocking ability.',
        price: 14.99,
      },
      {
        ownerId: 6,
        address: '24 Rue Monge',
        city: 'Paris',
        state: 'Île-de-France',
        country: 'France',
        lat: 48.8470,
        lng: 2.3512,
        name: 'Cafe Outdoor Seating, Table 3, Chair 1',
        description: 'Seating outside of the Strada Cafe on the street level. Watch the people go by as you enjoy a coffee and croissant',
        price: 17.99
      },
      {
        ownerId: 6,
        address: '24 Rue Monge',
        city: 'Paris',
        state: 'Île-de-France',
        country: 'France',
        lat: 48.8470,
        lng: 2.3512,
        name: 'Cafe Outdoor Seating, Table 3, Chair 2',
        description: 'Seating outside of the Strada Cafe on the street level. Watch the people go by as you enjoy a coffee and croissant',
        price: 17.99
      },
      {
        ownerId: 6,
        address: '24 Rue Monge',
        city: 'Paris',
        state: 'Île-de-France',
        country: 'France',
        lat: 48.8470,
        lng: 2.3512,
        name: 'Cafe Outdoor Seating, Table 3, Chair 3',
        description: 'Seating outside of the Strada Cafe on the street level. Watch the people go by as you enjoy a coffee and croissant',
        price: 17.99
      },
      {
        ownerId: 5,
        address: 'Jabučki Rit',
        city: 'Padinska Skela',
        country: 'Serbia',
        lat: 44.9150,
        lng: 20.5426,
        name: 'chair in a wheat field',
        description: 'southwest of jabučki rit a chair in a field between the wheat plants where thoughts flow',
        price: 2.99
      },
      {
        ownerId: 7,
        address: 'Otopark 379 A',
        city: 'Izmir',
        country: 'Turkey',
        lat: 38.4067,
        lng: 27.1022,
        name: 'Chair with water view',
        description: 'Solid chair with a view of the water. My son is probably there. He is very lazy. Please convince him to get a job.',
        price: 9.99,
      },
      {
        ownerId: 6,
        address: '5015 Hinkleville Rd',
        city: 'Paducah',
        state: 'Kentucky',
        country: 'USA',
        lat: 37.1134,
        lng: -88.6787,
        name: 'Metal coffeehouse seat',
        description: 'A seat in the back corner of a local Starbucks. Wifi, coffee, and food are available.',
        price: 21.99,
      },
      {
        ownerId: 2,
        address: '1 Water St',
        city: 'Brooklyn',
        state: 'New York',
        country: 'USA',
        lat: 40.70339840612662,
        lng: -73.99520550264502,
        name: 'Brooklyn Bridge Chair',
        description: 'A chair you can sit in across from your sweetie as you take in the historic site.',
        price: 12.00
      },
      {
        ownerId: 1,
        address: 'Kreuzgasse 102',
        city: 'Schruns',
        state: 'Vorarlberg',
        country: 'Austria',
        name: 'Barber Stool',
        description: 'Barber chair with cushion. Lever to adjust height.',
        price: 7.30,
      },
      {
        ownerId: 3,
        address: '1205 SW Cardinell Dr, Apt 2B',
        city: 'Portland',
        state: 'Oregon',
        country: 'USA',
        lat: 45.5112,
        lng: -122.6897,
        name: 'Cozy low chair',
        description: 'Low chair made of wood and wicker. Located in the living room of an apartment of bookworms.',
        price: 4.50,
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
        'Gaming Chair',
        'Library Round Reading Chair',
        'The Royal Throne',
        'QUT Conference Room Chair by the Window',
        'Cafe Outdoor Seating, Table 3, Chair 1',
        'Cafe Outdoor Seating, Table 3, Chair 2',
        'Cafe Outdoor Seating, Table 3, Chair 3',
        'chair in a wheat field',
        'Chair with water view',
        'Metal coffeehouse seat',
        'Brooklyn Bridge Chair',
        'Barber Stool',
        'Cozy low chair'
      ] }
    }, {});
  }
};
