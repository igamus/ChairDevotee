'use strict';
/** @type {import('sequelize-cli').Migration} */
const bcrypt = require("bcryptjs");
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
    options.tableName = 'Users';
    return queryInterface.bulkInsert(options, [
      {
        email: 'aanderson@gmail.com',
        firstName: 'Alvin',
        lastName: 'Anderson',
        username: 'Alverino',
        hashedPassword: bcrypt.hashSync('password1')
      },
      {
        email: 'bbernard@gmail.com',
        firstName: 'Brooke Lynn',
        lastName: 'Bridgette',
        username: 'brooklynbridgette',
        hashedPassword: bcrypt.hashSync('password2')
      },
      {
        email: 'ccolins@gmail.com',
        firstName: 'Clinton',
        lastName: 'Colins',
        username: 'CoolChairz',
        hashedPassword: bcrypt.hashSync('password3')
      },
      {
        username: 'ddriver',
        firstName: 'Dylan',
        lastName: 'Delroy',
        email: 'ddelroy@gmail.com',
        hashedPassword: bcrypt.hashSync('password4')
      },
      {
        username: 'el_poeta',
        firstName: 'Edwin',
        lastName: 'Cummings',
        email: 'ee@gmail.com',
        hashedPassword: bcrypt.hashSync('password5')
      },
      {
        username: 'demo_user',
        firstName: 'Demo',
        lastName: 'User',
        email: 'foo@bar.baz',
        hashedPassword: bcrypt.hashSync('password6')
      },
      {
        username: 'George Gerola',
        firstName: 'George',
        lastName: 'Gerola',
        email: 'georgegerola@gmail.com',
        hashedPassword: bcrypt.hashSync('password7')
      },
      {
        username: 'kinghenry8',
        firstName: 'Henry',
        lastName: 'Hanover',
        email: 'henry@tudor.co.uk',
        hashedPassword: bcrypt.hashSync('password8')
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
    options.tableName = 'Users';
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(options, {
      username: { [Op.in]: ['Alverino', 'brooklynbridgette', 'CoolChairz', 'ddriver', 'el_poeta', 'demo_user', 'George Gerola', 'kinghenry8'] }
    }, {});
  }
};
