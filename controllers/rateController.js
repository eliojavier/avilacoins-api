let RateRepository = require('../repositories/rateRepository');

module.exports = {
  findRatesByLocationId: function () {
    return RateRepository.findRatesByLocationId()
      .then(rates => {
        let result = {};
        result.rates = rates;
        return Promise.resolve(result);
      });
  }
};