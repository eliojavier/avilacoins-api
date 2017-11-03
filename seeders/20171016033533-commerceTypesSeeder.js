'use strict';

module.exports = {
  up: function (queryInterface, Sequelize) {
    return queryInterface.bulkInsert('CommerceType',
      [
        {
          name: 'Comida'
        },
        {
          name: 'Juguetería'
        },
        {
          name: 'Ferretería'
        },
        {
          name: 'Clínica'
        },
        {
          name: 'Farmacia'
        },
        {
          name: 'Gasolinera'
        },
        {
          name: 'Servicios del hogar'
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
