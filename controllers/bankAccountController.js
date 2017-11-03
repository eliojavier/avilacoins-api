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
  destroy: function (bankAccount) {
    return BankAccountRepository.destroy(bankAccount)
      .then(response => {
        console.log(response);
        // if (deletedRecord === 1) {
        //   let result = {};
        //   result.message = 'Registro eliminado';
        //   return result
        // }
        // else {
        //   return Promise.reject(new BadRequestException(err))
        // }
      })
  }
};