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
    options.tableName = 'Reviews';
    return queryInterface.bulkInsert(options, [
      {
        spotId: 4,
        userId: 4,
        review: 'Nice peeps but I Felt mad unsafe here. 5 stars tho bc I aint about to mess w ur livelihood',
        stars: 5,
      },
      {
          spotId: 2,
          userId: 2,
          review: 'What a beautiful place to be! FIVE STARS! ALL OF MY MONEY!',
          stars: 5,
      },
      {
          spotId: 1,
          userId: 3,
          review: 'This apartment on the water costs similar to the hotel, yet its amenities are far less. It is a terrific location and kind vendor, yet I would expect more for my money. Still, it is a fine place to enjoy Quebec!',
          stars: 4
      },
      {
          spotId: 5,
          userId: 3,
          review: 'This shed lives in a lovely little town on the water. You get a flavor of the local citizenry and environs. Truly marvelous.',
          stars: 5
      },
      {
          spotId: 5,
          userId: 5,
          review: 'flowers near the shed, happiness near my head',
          stars: 5
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
    options.tableName = 'Reviews';
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(options, {
      stars: { [Op.in]: [4,5] }
    }, {});
  }
};
