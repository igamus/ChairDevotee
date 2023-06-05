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
        reviewId: 2,
        url: 'https://images.pexels.com/photos/908588/pexels-photo-908588.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
      },
      {
          reviewId: 1,
          url: 'https://images.unsplash.com/photo-1511190404154-700f574540f2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=387&q=80'
      },
      {
          reviewId: 1,
          url: 'https://images.pexels.com/photos/2812525/pexels-photo-2812525.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
      },
      {
          reviewId: 5,
          url: 'https://plus.unsplash.com/premium_photo-1675008643129-5cf840239c67?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=388&q=80'
      },
      {
          reviewId: 4,
          url: 'https://images.unsplash.com/photo-1605134789226-f095e700944d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=387&q=80'
      },
      {
        reviewId: 6,
        url: 'https://images.unsplash.com/photo-1533230408708-8f9f91d1235a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=794&q=80'
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
        'https://images.pexels.com/photos/908588/pexels-photo-908588.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
        'https://images.unsplash.com/photo-1511190404154-700f574540f2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=387&q=80',
        'https://images.pexels.com/photos/2812525/pexels-photo-2812525.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
        'https://plus.unsplash.com/premium_photo-1675008643129-5cf840239c67?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=388&q=80',
        'https://images.unsplash.com/photo-1605134789226-f095e700944d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=387&q=80',
        'https://images.unsplash.com/photo-1533230408708-8f9f91d1235a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=794&q=80'
      ] }
    }, {});
  }
};
