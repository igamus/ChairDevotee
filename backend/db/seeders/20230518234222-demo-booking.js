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
        startDate: new Date('2020-01-20'),
        endDate: new Date('2020-01-23')
      },
      {
          spotId: 2,
          userId: 2,
          startDate: new Date('2021-08-08'),
          endDate: new Date('2021-08-09')
      },
      {
          spotId: 3,
          userId: 3,
          startDate: new Date('2020-01-29'),
          endDate: new Date('2020-02-05')
      },
      {
          spotId: 4,
          userId: 4,
          startDate: new Date('2022-12-11'),
          endDate: new Date('2022-12-12')
      },
      {
          spotId: 5,
          userId: 3,
          startDate: new Date('2020-01-23'),
          endDate: new Date('2020-01-28')
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
      startDate: { [Op.in]: [new Date('2020-01-20'), new Date('2021-08-08'), new Date('2020-01-29'), new Date('2022-12-11'), new Date('2020-01-23')] }
    }, {});
  }
};
