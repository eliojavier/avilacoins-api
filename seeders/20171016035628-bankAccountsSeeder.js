'use strict';
let faker = require('faker');

module.exports = {
  up: function (queryInterface, Sequelize) {
    let bankCodes = ["0102", "0104", "0105", "0108", "0114", "0115", "0116", "0128", "0134", "0137",
                    "0138", "0146", "0149"];
    return queryInterface.bulkInsert('BankAccount',
      [
        {
          account_number: faker.random.arrayElement(bankCodes) + faker.random.number({min:10000000, max: 99999999}) + faker.random.number({min:10000000, max: 99999999}),
          account_holder: 'Elio Acosta',
          email: "eliojavier86@gmail.com",
          status: "active",
          created_at: "2017-09-11 04:36:31",
          updated_at: "2017-09-11 04:36:31",
          fk_bank: 1,
          fk_user: faker.random.number({min: 1, max: 20})
        },
        {
          account_number: faker.random.arrayElement(bankCodes) + faker.random.number({min:10000000, max: 99999999}) + faker.random.number({min:10000000, max: 99999999}),
          account_holder: 'Elio Acosta',
          email: "eliojavier86@gmail.com",
          status: "active",
          created_at: "2017-09-11 04:36:31",
          updated_at: "2017-09-11 04:36:31",
          fk_bank: 1,
          fk_user: faker.random.number({min: 1, max: 20})
        },
        {
          account_number: faker.random.arrayElement(bankCodes) + faker.random.number({min:10000000, max: 99999999}) + faker.random.number({min:10000000, max: 99999999}),
          account_holder: 'Elio Acosta',
          email: "eliojavier86@gmail.com",
          status: "active",
          created_at: "2017-09-11 04:36:31",
          updated_at: "2017-09-11 04:36:31",
          fk_bank: 1,
          fk_user: faker.random.number({min: 1, max: 20})
        },
        {
          account_number: faker.random.arrayElement(bankCodes) + faker.random.number({min:10000000, max: 99999999}) + faker.random.number({min:10000000, max: 99999999}),
          account_holder: 'Elio Acosta',
          email: "eliojavier86@gmail.com",
          status: "active",
          created_at: "2017-09-11 04:36:31",
          updated_at: "2017-09-11 04:36:31",
          fk_bank: 1,
          fk_user: faker.random.number({min: 1, max: 20})
        },
        {
          account_number: faker.random.arrayElement(bankCodes) + faker.random.number({min:10000000, max: 99999999}) + faker.random.number({min:10000000, max: 99999999}),
          account_holder: 'Elio Acosta',
          email: "eliojavier86@gmail.com",
          status: "active",
          created_at: "2017-09-11 04:36:31",
          updated_at: "2017-09-11 04:36:31",
          fk_bank: 1,
          fk_user: faker.random.number({min: 1, max: 20})
        },
        {
          account_number: faker.random.arrayElement(bankCodes) + faker.random.number({min:10000000, max: 99999999}) + faker.random.number({min:10000000, max: 99999999}),
          account_holder: 'Elio Acosta',
          email: "eliojavier86@gmail.com",
          status: "active",
          created_at: "2017-09-11 04:36:31",
          updated_at: "2017-09-11 04:36:31",
          fk_bank: 1,
          fk_user: faker.random.number({min: 1, max: 20})
        },
        {
          account_number: faker.random.arrayElement(bankCodes) + faker.random.number({min:10000000, max: 99999999}) + faker.random.number({min:10000000, max: 99999999}),
          account_holder: 'Elio Acosta',
          email: "eliojavier86@gmail.com",
          status: "active",
          created_at: "2017-09-11 04:36:31",
          updated_at: "2017-09-11 04:36:31",
          fk_bank: 1,
          fk_user: faker.random.number({min: 1, max: 20})
        },
        {
          account_number: faker.random.arrayElement(bankCodes) + faker.random.number({min:10000000, max: 99999999}) + faker.random.number({min:10000000, max: 99999999}),
          account_holder: 'Elio Acosta',
          email: "eliojavier86@gmail.com",
          status: "active",
          created_at: "2017-09-11 04:36:31",
          updated_at: "2017-09-11 04:36:31",
          fk_bank: 1,
          fk_user: faker.random.number({min: 1, max: 20})
        },
        {
          account_number: faker.random.arrayElement(bankCodes) + faker.random.number({min:10000000, max: 99999999}) + faker.random.number({min:10000000, max: 99999999}),
          account_holder: 'Elio Acosta',
          email: "eliojavier86@gmail.com",
          status: "active",
          created_at: "2017-09-11 04:36:31",
          updated_at: "2017-09-11 04:36:31",
          fk_bank: 1,
          fk_user: faker.random.number({min: 1, max: 20})
        }
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
