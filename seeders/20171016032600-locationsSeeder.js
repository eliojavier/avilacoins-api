'use strict';

module.exports = {
  up: function (queryInterface, Sequelize) {
    return queryInterface.bulkInsert('Location',
      [
        {
          name: 'Venezuela',
          type: 'country'
        },
        {
          name: 'Colombia',
          type: 'country'
        },
        {
          name: 'Distrito Capital',
          type: 'state',
          fk_location: 1
        },
        {
          name: 'Miranda',
          type: 'state',
          fk_location: 1
        },
        {
          name: 'Caracas',
          type: 'city',
          fk_location: 3
        },
        {
          name: 'El Cafetal',
          type: 'zone',
          fk_location: 5
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
