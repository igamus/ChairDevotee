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
    options.tableName = 'ReviewImages';
    return queryInterface.bulkInsert(options, [
      {
        reviewId: 19,
        url: 'https://images.pexels.com/photos/16407237/pexels-photo-16407237/free-photo-of-young-man-sprawled-on-a-chair.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
      },
      {
        reviewId: 20,
        url: 'https://images.pexels.com/photos/16391246/pexels-photo-16391246/free-photo-of-chair-near-window.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
      },
      {
        reviewId: 27,
        url: 'https://images.pexels.com/photos/16433502/pexels-photo-16433502/free-photo-of-plant-near-shelves.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
      }
    ], {});
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    options.tableName = 'ReviewImages';
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(options, {
      url: { [Op.in]: [
        'https://images.pexels.com/photos/16407237/pexels-photo-16407237/free-photo-of-young-man-sprawled-on-a-chair.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
        'https://images.pexels.com/photos/16391246/pexels-photo-16391246/free-photo-of-chair-near-window.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
        'https://images.pexels.com/photos/16433502/pexels-photo-16433502/free-photo-of-plant-near-shelves.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
      ] }
    }, {});
  }
};
