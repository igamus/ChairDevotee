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
        spotId: 1,
        userId: 4,
        review: 'This chair is very comfortable and so ergonomic! I want one for home!',
        stars: 5,
      },
      {
        spotId: 1,
        userId: 8,
        review: 'They have Fortnite!!!!!',
        stars: 5,
      },
      {
        spotId: 2,
        userId: 7,
        review: 'Weird chair. Inside though. Very few bandits',
        stars: 4,
      },
      {
        spotId: 3,
        userId: 6,
        review: 'I feel like royalty!',
        stars: 5,
      },
      {
        spotId: 3,
        userId: 2,
        review: 'Call me Queen B!!',
        stars: 5,
      },
      {
        spotId: 3,
        userId: 3,
        review: 'Highly uncomfortable chair, but prospective sit-izens will find themselves saying, "No pain, no glory." A majestic experience.',
        stars: 5,
      },
      {
        spotId: 4,
        userId: 3,
        review: 'Extremely comfortable chairs with middle-to-upper end ergonomics. This chair is in an excellent location for participating in QUT meetings--close enough to the action but distant enough to avoid being called on when one would rather remain aloof.',
        stars: 5,
      },
      {
        spotId: 5,
        userId: 4,
        review: 'What an awesome time!',
        stars: 5,
      },
      {
        spotId: 5,
        userId: 3,
        review: 'Reasonable comfort in an unbeatable location. The chair style is elegant, timeless, and sit-izens will love the experience of genuine Parisian cuisine.',
        stars: 5,
      },
      {
        spotId: 6,
        userId: 4,
        review: 'I love this chair!',
        stars: 5,
      },
      {
        spotId: 6,
        userId: 2,
        review: 'This was a great place to sit, but the sun was in my eyes (it was sunset, but still)',
        stars: 4,
      },
      {
        spotId: 7,
        userId: 4,
        review: 'hated it, man',
        stars: 1,
      },
      {
        spotId: 7,
        userId: 7,
        review: 'Outside. Exposed to bandits.',
        stars: 1,
      },
      {
        spotId: 7,
        userId: 8,
        review: 'This was not fit for a king.',
        stars: 1,
      },
      {
        spotId: 7,
        userId: 2,
        review: 'Yeah, the other chairs looked good, but this was just...',
        stars: 1,
      },
      {
        spotId: 8,
        userId: 7,
        review: 'Very sturdy chair',
        stars: 5,
      },
      {
        spotId: 8,
        userId: 4,
        review: 'Beautiful view, I just felt one with nature or farms or whatever',
        stars: 5,
      },
      {
        spotId: 8,
        userId: 1,
        review: 'niiiiiiice',
        stars: 5,
      },
      {
        spotId: 9,
        userId: 4,
        review: 'there was someone in the chair',
        stars: 2,
      },
      {
        spotId: 9,
        userId: 8,
        review: 'The young man was gone.',
        stars: 1,
      },
      {
        spotId: 10,
        userId: 4,
        review: 'Good vibes but you have to buy something for the wifi',
        stars: 4,
      },
      {
        spotId: 11,
        userId: 4,
        review: 'guys it\'s so serene here',
        stars: 5,
      },
      {
        spotId: 12,
        userId: 2,
        review: 'This is a comfortable chair, but the man kept whispering disturbing things to me.',
        stars: 2,
      },
      {
        spotId: 12,
        userId: 4,
        review: 'That guy told me secrets no mortal should know and I am now elevated above most other mortal beings.',
        stars: 5,
      },
      {
        spotId: 13,
        userId: 4,
        review: 'They were chill about moving the chair, which was nice, but then people have trouble finding the chair when they come in, which is not nice.',
        stars: 4,
      },
      {
        spotId: 13,
        userId: 2,
        review: 'Nice, unique little chair, but an awkward sitting experience.',
        stars: 3,
      },
      {
        spotId: 13,
        userId: 6,
        review: 'Nice. I sat here.',
        stars: 5,
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
      stars: { [Op.in]: [1,2,3,4,5] }
    }, {});
  }
};
