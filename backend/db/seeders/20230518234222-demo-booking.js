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
    options.tableName = 'Bookings';
    return queryInterface.bulkInsert(options, [
      {
        spotId: 1,
        userId: 3,
        startDate: '2020-01-20',
        endDate: '2020-01-23'
      },
      {
          spotId: 2,
          userId: 2,
          startDate: '2021-08-08',
          endDate: '2021-08-09'
      },
      {
          spotId: 3,
          userId: 3,
          startDate: '2020-01-29',
          endDate: '2020-02-05'
      },
      {
          spotId: 4,
          userId: 4,
          startDate: '2022-12-11',
          endDate: '2022-12-12'
      },
      {
          spotId: 5,
          userId: 3,
          startDate: '2020-01-23',
          endDate: '2020-01-28'
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
    options.tableName = 'Bookings';
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(options, {
      startDate: { [Op.in]: ['2020-01-20', '2021-08-08', '2020-01-29', '2022-12-11', '2020-01-23'] }
    }, {});
  }
};
