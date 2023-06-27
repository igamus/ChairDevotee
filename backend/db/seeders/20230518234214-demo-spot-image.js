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
        spotId: 1,
        url: 'https://images.unsplash.com/photo-1628358011851-c85d8fa59557?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1088&q=80',
        preview: true
      },
      {
        spotId: 2,
        url: 'https://images.pexels.com/photos/447592/pexels-photo-447592.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
        preview: true
      },
      {
        spotId: 3,
        url: 'https://images.unsplash.com/photo-1546992998-0b5699ecdea3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1176&q=80',
        preview: true
      },
      {
        spotId: 3,
        url: 'https://images.unsplash.com/photo-1637333245118-6e1c5e29ebfc?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=670&q=80',
        preview: false
      },
      {
        spotId: 3,
        url: 'https://images.unsplash.com/photo-1546992998-0b5699ecdea3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1176&q=80',
        preview: false
      },
      {
        spotId: 4,
        url: 'https://images.unsplash.com/photo-1571055931484-22dce9d6c510?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80',
        preview: true
      },
      {
        spotId: 5,
        url: 'https://images.pexels.com/photos/17205679/pexels-photo-17205679/free-photo-of-chairs-and-table-on-pavement.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
        preview: true
      },
      {
        spotId: 6,
        url: 'https://images.pexels.com/photos/17205679/pexels-photo-17205679/free-photo-of-chairs-and-table-on-pavement.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
        preview: true
      },
      {
        spotId: 7,
        url: 'https://images.pexels.com/photos/17205679/pexels-photo-17205679/free-photo-of-chairs-and-table-on-pavement.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
        preview: true
      },
      {
        spotId: 8,
        url: 'https://images.pexels.com/photos/2128342/pexels-photo-2128342.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
        preview: true
      },
      {
        spotId: 9,
        url: 'https://images.pexels.com/photos/16407234/pexels-photo-16407234/free-photo-of-man-wearing-glasses-sprawled-on-a-chair.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
        preview: true
      },
      {
        spotId: 10,
        url: 'https://images.pexels.com/photos/5716713/pexels-photo-5716713.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
        preview: true
      },
      {
        spotId: 11,
        url: 'https://images.pexels.com/photos/17168372/pexels-photo-17168372/free-photo-of-two-chairs-on-waterfront-against-brooklyn-bridge.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
        preview: true
      },
      {
        spotId: 12,
        url: 'https://images.pexels.com/photos/605208/pexels-photo-605208.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
        preview: true
      },
      {
        spotId: 13,
        url: 'https://images.pexels.com/photos/16433562/pexels-photo-16433562/free-photo-of-chair-and-plant-on-table-in-room.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
        preview: true,
      },
      {
        spotId: 13,
        url: 'https://images.pexels.com/photos/16433587/pexels-photo-16433587/free-photo-of-a-bookcase-and-a-wooden-chair-in-an-interior-in-a-modern-classic-style.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
        preview: false
      }
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
        'https://images.unsplash.com/photo-1628358011851-c85d8fa59557?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1088&q=80',
        'https://images.pexels.com/photos/447592/pexels-photo-447592.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
        'https://images.unsplash.com/photo-1546992998-0b5699ecdea3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1176&q=80',
        'https://images.unsplash.com/photo-1637333245118-6e1c5e29ebfc?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=670&q=80',
        'https://images.unsplash.com/photo-1546992998-0b5699ecdea3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1176&q=80',
        'https://images.unsplash.com/photo-1571055931484-22dce9d6c510?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80',
        'https://images.pexels.com/photos/17205679/pexels-photo-17205679/free-photo-of-chairs-and-table-on-pavement.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
        'https://images.pexels.com/photos/2128342/pexels-photo-2128342.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
        'https://images.pexels.com/photos/16407234/pexels-photo-16407234/free-photo-of-man-wearing-glasses-sprawled-on-a-chair.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
        'https://images.pexels.com/photos/5716713/pexels-photo-5716713.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
        'https://images.pexels.com/photos/17168372/pexels-photo-17168372/free-photo-of-two-chairs-on-waterfront-against-brooklyn-bridge.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
        'https://images.pexels.com/photos/605208/pexels-photo-605208.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
        'https://images.pexels.com/photos/16433562/pexels-photo-16433562/free-photo-of-chair-and-plant-on-table-in-room.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
        'https://images.pexels.com/photos/16433587/pexels-photo-16433587/free-photo-of-a-bookcase-and-a-wooden-chair-in-an-interior-in-a-modern-classic-style.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
    ] }
    }, {});
  }
};
