'use strict';
let faker = require('faker');

module.exports = {
  up: function (queryInterface, Sequelize) {
    return queryInterface.bulkInsert('Account',
      [
        {
          balance: faker.random.number({min: 0, max: 5000000}),
          withheld: 0,
          fk_user: 1
        },
        {
          balance: faker.random.number({min: 0, max: 5000000}),
          withheld: 0,
          fk_user: 2
        },
        {
          balance: faker.random.number({min: 0, max: 5000000}),
          withheld: 0,
          fk_user: 3
        },
        {
          balance: faker.random.number({min: 0, max: 5000000}),
          withheld: 0,
          fk_user: 4
        },
        {
          balance: faker.random.number({min: 0, max: 5000000}),
          withheld: 0,
          fk_user: 5
        },
        {
          balance: faker.random.number({min: 0, max: 5000000}),
          withheld: 0,
          fk_user: 6
        },
        {
          balance: faker.random.number({min: 0, max: 5000000}),
          withheld: 0,
          fk_user: 7
        },
        {
          balance: faker.random.number({min: 0, max: 5000000}),
          withheld: 0,
          fk_user: 8
        },
        {
          balance: faker.random.number({min: 0, max: 5000000}),
          withheld: 0,
          fk_user: 9
        },
        {
          balance: faker.random.number({min: 0, max: 5000000}),
          withheld: 0,
          fk_user: 10
        },
        {
          balance: faker.random.number({min: 0, max: 5000000}),
          withheld: 0,
          fk_user: 11
        },
        {
          balance: faker.random.number({min: 0, max: 5000000}),
          withheld: 0,
          fk_user: 12
        },
        {
          balance: faker.random.number({min: 0, max: 5000000}),
          withheld: 0,
          fk_user: 13
        },
        {
          balance: faker.random.number({min: 0, max: 5000000}),
          withheld: 0,
          fk_user: 14
        },
        {
          balance: faker.random.number({min: 0, max: 5000000}),
          withheld: 0,
          fk_user: 15
        },
        {
          balance: faker.random.number({min: 0, max: 5000000}),
          withheld: 0,
          fk_user: 16
        },
        {
          balance: faker.random.number({min: 0, max: 5000000}),
          withheld: 0,
          fk_user: 17
        },
        {
          balance: faker.random.number({min: 0, max: 5000000}),
          withheld: 0,
          fk_user: 18
        },
        {
          balance: faker.random.number({min: 0, max: 5000000}),
          withheld: 0,
          fk_user: 19
        },
        {
          balance: faker.random.number({min: 0, max: 5000000}),
          withheld: 0,
          fk_user: 20
        },
      ])
  },

  down: function (queryInterface, Sequelize) {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkDelete('Person', null, {});
    */
  }
};
