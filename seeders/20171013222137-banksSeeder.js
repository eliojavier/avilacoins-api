'use strict';

module.exports = {
  up: function (queryInterface, Sequelize) {
    return queryInterface.bulkInsert('Bank',
      [
        {
          name: 'Banco de Venezuela',
          status: 'active'
        },
        {
          name: 'Venezolano de Crédito',
          status: 'active'
        },
        {
          name: 'Banco Mercantil',
          status: 'active'
        },
        {
          name: 'Banco Provincial',
          status: 'active'
        },
        {
          name: 'Bancaribe',
          status: 'active'
        },
        {
          name: 'Banco Exterior',
          status: 'active'
        },
        {
          name: 'Banco Occidental de Descuento',
          status: 'active'
        },
        {
          name: 'Banco Caroní',
          status: 'active'
        },
        {
          name: 'Banesco',
          status: 'active'
        },
        {
          name: 'Banco Sofitasa',
          status: 'active'
        },
        {
          name: 'Banco Plaza',
          status: 'active'
        },
        {
          name: 'Banco de la Gente Emprendedora',
          status: 'active'
        },
        {
          name: 'Banco del Pueblo Soberano',
          status: 'active'
        },
        {
          name: 'BFC Banco Fondo Común',
          status: 'active'
        },
        {
          name: '100% Banco',
          status: 'active'
        },
        {
          name: 'DelSur',
          status: 'active'
        },
        {
          name: 'Banco del Tesoro',
          status: 'active'
        },
        {
          name: 'Banco Agrícola de Venezuela',
          status: 'active'
        },
        {
          name: 'Bancrecer',
          status: 'active'
        },
        {
          name: 'Mi Banco',
          status: 'active'
        },
        {
          name: 'Banco Activo',
          status: 'active'
        },
        {
          name: 'Bancamiga',
          status: 'active'
        },
        {
          name: 'Banco Internacional de Desarrollo',
          status: 'active'
        },
        {
          name: 'Banplus',
          status: 'active'
        },
        {
          name: 'Banco Bicentenario',
          status: 'active'
        },
        {
          name: 'Banco Espirito Santo',
          status: 'active'
        },
        {
          name: 'Banco de la Fuerza Armada Nacional Bolivariana',
          status: 'active'
        },
        {
          name: 'Citibank',
          status: 'active'
        },
        {
          name: 'Banco Nacional de Crédito',
          status: 'active'
        },
        {
          name: 'Instituto Municipal de Crédito Popular',
          status: 'active'
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
