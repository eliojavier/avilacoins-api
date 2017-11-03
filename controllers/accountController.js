let AccountRepository = require('../repositories/accountRepository');
let HTTPError = require('node-http-error');

module.exports = {
  findByUserId: function (user) {
    return AccountRepository.findByUserId(user)
      .then(account => {
        if (!account) {
          throw new HTTPError(400, 'account not found');
        }
        let result = {};
        result.account = account;
        return Promise.resolve(result);
      })
  }
};