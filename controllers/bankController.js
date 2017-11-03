let bankRepository = require('../repositories/bankRepository');
let HTTPError = require('node-http-error');

module.exports = {
  findAll: function () {
    return bankRepository.findAll()
      .then(banks => {
        let result = {};
        result.banks = banks;
        return Promise.resolve(result);
      })
  }
};