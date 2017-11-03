let CommerceTypeRepository = require('../repositories/commerceTypeRepository');

module.exports = {
  findAll: function () {
    return CommerceTypeRepository.findAll()
      .then(commerceTypes => {
        let result = {};
        result.commerceTypes = commerceTypes;
        return Promise.resolve(result);
      })
  }
};