let TransferRepository = require('../repositories/transferRepository');
let UserRepository = require('../repositories/userRepository');
let AccountRepository = require('../repositories/accountRepository');
let LogRepository = require('../repositories/logRepository');
let HTTPError = require('node-http-error');

module.exports = {
  makeTransfer: function (user, transfer) {
    return UserRepository.findActiveUserByUsername(transfer.username)
      .then(receptor => {
        if (!receptor) {
          throw new HTTPError(400, 'user not found');
        }
        return AccountRepository.hasEnoughBalance(user, transfer.amount)
          .then(account => {
            if (!account) {
              throw new HTTPError(400, 'not enough balance');
            }
            return AccountRepository.findByUserId(receptor)
              .then(receptorAccount => {
                if (!receptorAccount) {
                  throw new HTTPError(400, 'receptor account not found');
                }
                return AccountRepository.deductFromBalance(account, transfer.amount)
                  .then(result => {
                    return AccountRepository.addToBalance(receptorAccount, transfer.amount)
                      .then(result => {
                        return TransferRepository.create(user, transfer, receptor)
                          .then(transfer => {
                            return LogRepository.createTransferRecord(transfer)
                              .then(log => {
                                let result = {};
                                result.success = true;
                                result.id = transfer.id;
                                return Promise.resolve(result);
                              })
                          })
                      })
                  })

              })
          })
      })
  },
  findByUserId: function (user, page) {
    return TransferRepository.findByUserId(user, page)
      .then(transfers => {
        let result = {};
        result.transfers = transfers;
        return Promise.resolve(result);
      })
  },
  findByUserIdAndYear: function (user, year, page) {
    return TransferRepository.findByUserIdAndYear(user, year, page)
      .then(transfers => {
        let result = {};
        result.transfers = transfers;
        return Promise.resolve(result);
      })
  },
  findByUserIdAndMonth: function (user, month, page) {
    return TransferRepository.findByUserIdAndMonth(user, month, page)
      .then(transfers => {
        let result = {};
        result.transfers = transfers;
        return Promise.resolve(result);
      })
  },
  findByUserIdAndLastThreeMonths: function (user, page) {
    return TransferRepository.findByUserIdAndLastThreeMonths(user, page)
      .then(transfers => {
        let result = {};
        result.transfers = transfers;
        return Promise.resolve(result);
      })
  }
};