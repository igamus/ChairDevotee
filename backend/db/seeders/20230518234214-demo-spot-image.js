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
    options.tableName = 'SpotImages';
    return queryInterface.bulkInsert(options, [
      {
        spotId: 2,
        url: 'https://images.pexels.com/photos/236451/pexels-photo-236451.jpeg',
        preview: true
      },
      {
          spotId: 5,
          url: 'https://images.pexels.com/photos/1436135/pexels-photo-1436135.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
          preview: true
      },
      {
          spotId: 1,
          url: 'https://images.pexels.com/photos/813692/pexels-photo-813692.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
          preview: true
      },
      {
          spotId: 4,
          url: 'https://images.unsplash.com/photo-1603792907191-89e55f70099a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80',
          preview: false
      },
      {
          spotId: 2,
          url: 'https://images.pexels.com/photos/1387170/pexels-photo-1387170.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
          preview: true
      },
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    options.tableName = 'SpotImages';
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(options, {
      url: { [Op.in]: [
        'https://images.pexels.com/photos/236451/pexels-photo-236451.jpeg',
        'https://images.pexels.com/photos/1436135/pexels-photo-1436135.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
        'https://images.pexels.com/photos/813692/pexels-photo-813692.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
        'https://images.unsplash.com/photo-1603792907191-89e55f70099a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80',
        'https://images.pexels.com/photos/1387170/pexels-photo-1387170.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    ] }
    }, {});
  }
};