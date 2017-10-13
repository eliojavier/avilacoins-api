let HTTPError = require('node-http-error');
let CommerceTypeRepository = require('../repositories/commerceTypeRepository');

module.exports = {
  findAll: function () {
    return CommerceTypeRepository.findAll()
      .then(commerces => {
        let result = {};
        result.commerces = commerces;
        return Promise.resolve(result);
      })
  }
};