let AffiliateRepository = require('../repositories/affiliateRepository');
let HTTPError = require('node-http-error');

module.exports = {
  findAll: function () {
    return AffiliateRepository.findAll()
      .then(commerces => {
        let result = {};
        result.commerces = commerces;
        return Promise.resolve(result);
      })
  },
  findAllAffiliates: function () {
    return AffiliateRepository.findAllAffiliates()
      .then(affiliates => {
        let result = {};
        result.affiliates = affiliates;
        return Promise.resolve(result);
      })
  },
  findByCategoriesIdAndStatesId: function (categoriesId, statesId) {
    return AffiliateRepository.findByCategoriesIdAndStatesId(categoriesId, statesId)
      .then(users => {
        let result = {};
        result.users = users;
        return Promise.resolve(result);
      })
  },
  findByStatesId: function (statesId) {
    return AffiliateRepository.findByStatesId(statesId)
      .then(users => {
        let result = {};
        result.users = users;
        return Promise.resolve(result);
      })
  },
  findByCategoriesId: function (categoriesId) {
    return AffiliateRepository.findByCategoriesId(categoriesId)
      .then(users => {
        let result = {};
        result.users = users;
        return Promise.resolve(result);
      })
  }
};