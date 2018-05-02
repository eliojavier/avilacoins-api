let db = require('../models');
let Sequelize = require('sequelize');

module.exports = {
  findAllCountries: function () {
    return db.Location.findAll({
      where: {
        type: 'country',
      }
    })
  },
  findAllStatesByCountryId: function (country_id) {
    return db.Location.findAll({
      where: {
        type: 'state',
        fk_location: country_id
      }
    })
  },
  findAllCitiesByStateId: function (state_id) {
    return db.Location.findAll({
      where: {
        type: 'city',
        fk_location: state_id
      }
    })
  },
  findAllZonesByCityId: function (city_id) {
    return db.Location.findAll({
      where: {
        type: 'zone',
        fk_location: city_id
      }
    })
  },
  findByUserId: function (userId) {
    return db.sequelize.query("SELECT zona.name as zone, ciudad.name as city, estado.name as state, u.address as address " +
      "FROM Location zona, Location ciudad, Location estado, User u " +
      "WHERE u.type = 'commerce' " +
      "AND u.status = 'active' " +
      "AND u.fk_location = zona.id " +
      "AND zona.fk_location = ciudad.id " +
      "AND zona.type = 'zone' " +
      "AND ciudad.type = 'city' " +
      "AND ciudad.fk_location = estado.id " +
      "AND estado.type = 'state' " +
      "AND u.id = :userId",
      {
        replacements: {
          userId: userId
        },
        type: Sequelize.QueryTypes.select
      });
  }
};