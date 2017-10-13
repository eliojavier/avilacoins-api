let db = require('../models');

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
  }
};