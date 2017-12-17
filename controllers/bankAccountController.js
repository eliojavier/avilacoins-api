let BankAccountRepository = require('../repositories/bankAccountRepository');

module.exports = {
  create: function (user, bankAccount) {
    return BankAccountRepository.create(user, bankAccount)
      .then(bankAccount => {
        return Promise.resolve(bankAccount)
      })
  },
  findBankAccountsByUserId: function (user) {
    return BankAccountRepository.findBankAccountsByUserId(user)
      .then(bankAccounts => {
        let result = {};
        result.bankAccounts = bankAccounts;
        return Promise.resolve(result);
      })
  },
  destroy: function (user, id) {
    return BankAccountRepository.destroy(user, id)
      .then(deletedRecords => {
        console.log(deletedRecords);
        if (deletedRecords >= 1) {
          let result = {};
          result.message = 'bank account deleted';
          return Promise.resolve(result);
        }
        else {
          throw new HTTPError(400, 'bank account not deleted');
        }
      })
  }
};