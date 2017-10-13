let HTTPError = require('node-http-error');
let LocationRepository = require('../repositories/locationRepository');

module.exports = {
  findAllCountries: function () {
    return LocationRepository.findAllCountries()
      .then(countries => {
        let result = {};
        result.countries = countries;
        return Promise.resolve(result);
      })
  },
  findAllStatesByCountryId: function (country_id) {
    return LocationRepository.findAllStatesByCountryId(country_id)
      .then(states => {
        let result = {};
        result.states = states;
        return Promise.resolve(result);
      })
  },
  findAllCitiesByStateId: function (state_id) {
    return LocationRepository.findAllCitiesByStateId(state_id)
      .then(cities => {
        let result = {};
        result.cities = cities;
        return Promise.resolve(result);
      })
  },
  findAllZonesByCityId: function (city_id) {
    return LocationRepository.findAllZonesByCityId(city_id)
      .then(zones => {
        let result = {};
        result.zones = zones;
        return Promise.resolve(result);
      })
  }
};