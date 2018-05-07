let TransactionRepository = require('../repositories/transactionRepository');
let PaymentRepository = require('../repositories/paymentRepository');
let AccountRepository = require('../repositories/accountRepository');
let LogRepository = require('../repositories/logRepository');
let HTTPError = require('node-http-error');
let email = require('../email');

module.exports = {
  makePurchase: function (user, purchase) {
    return PaymentRepository.create(purchase)
      .then(payment => {
        if (!payment) {
          throw new HTTPError(500, 'payment not created');
        }
        return TransactionRepository.createPurchase(user, purchase, payment)
          .then(purchase => {
            if (!purchase) {
              throw new HTTPError(500, 'purchase not created');
            }
            return LogRepository.createPurchaseRecord(purchase)
              .then(log => {
                if (!log) {
                  throw new HTTPError(500, 'log not created');
                }
                if (payment.response === 'approved') {
                  return AccountRepository.findByUserId(user)
                    .then(account => {
                      return AccountRepository.addToBalance(account, purchase.coins)
                        .then(res => {
                          let result = {};
                          result.success = true;
                          return Promise.resolve(result);
                        });
                    })
                }
                if (payment.response === 'disapproved') {
                  throw new HTTPError(402, 'payment declined');
                }
              })
          })
      })
      .catch(error => {
        throw new HTTPError(500, "Error: " + error);
      });
  },
  makeWithdrawRequest: function (user, withdraw) {
    return TransactionRepository.createWithdrawRequest(user, withdraw)
      .then(withdrawRequest => {
        if (!withdrawRequest) {
          throw new HTTPError(500, 'withdraw request not created');
        }
        console.log("withdraw request id:");
        console.log(withdrawRequest.id);
        return LogRepository.createWithdrawRequestRecord(withdrawRequest)
          .then(log => {
            if (!log) {
              throw new HTTPError(500, 'log not created');
            }
            console.log("log id");
            console.log(log.id);
            return AccountRepository.findByUserId(user)
              .then(account => {
                console.log("account id");
                console.log(account.id);
                return AccountRepository.deductAndWithheldFromBalance(account, withdraw)
                  .then(response => {
                    let result = {};
                    result.success = true;
                    result.message = 'withdraw request created';
                    return Promise.resolve(result);
                  })
              })
          })
      });
  },
  findWithdrawsByStatus: function (status) {
    return TransactionRepository.findWithdrawsByStatus(status)
      .then(withdraws => {
        let result = {};
        result.withdraws = withdraws;
        return Promise.resolve(result);
      })
  },
  approveWithdrawRequest: function (withdraw) {
    return TransactionRepository.approveWithdrawRequest(withdraw)
      .then(user => {
        if (user) {
          email.approvedWithdrawEmail(user);
          LogRepository.createApprovedWithdrawRecord(withdraw)
            .then(log => {

            });
          let result = {};
          result.success = true;
          return Promise.resolve(result);
        }
      })
  },
  findUserWithdrawById: function (user, id) {
    return TransactionRepository.findUserWithdrawById(user, id)
      .then(withdraw => {
        let result = {};
        result.withdraw = withdraw;
        return Promise.resolve(result);
      })
  },
  findUserWithdraws: function (user, page) {
    return TransactionRepository.findUserWithdraws(user, page)
      .then(withdraws => {
        let result = {};
        result.withdraws = withdraws;
        return Promise.resolve(result);
      })
  },
  findUserWithdrawsByYear: function (user, year, page) {
    return TransactionRepository.findUserWithdrawsByYear(user, year, page)
      .then(withdraws => {
        let result = {};
        result.withdraws = withdraws;
        return Promise.resolve(result);
      });
  },
  findUserWithdrawsByMonth: function (user, month, page) {
    return TransactionRepository.findUserWithdrawsByMonth(user, month, page)
      .then(withdraws => {
        let result = {};
        result.withdraws = withdraws;
        return Promise.resolve(result);
      });
  },
  findUserWithdrawsByLastThreeMonths: function (user, page) {
    return TransactionRepository.findUserWithdrawsByLastThreeMonths(user, page)
      .then(withdraws => {
        let result = {};
        result.withdraws = withdraws;
        return Promise.resolve(result);
      });
  },
  findUserWithdrawsByDateRange: function (user, range, page) {
    return TransactionRepository.findUserWithdrawsByDateRange(user, range, page)
      .then(withdraws => {
        let result = {};
        result.withdraws = withdraws;
        return Promise.resolve(result);
      })
  },
  findUserPurchases: function (user, page) {
    return TransactionRepository.findUserPurchases(user, page)
      .then(purchases => {
        let result = {};
        result.purchases = purchases;
        return Promise.resolve(result);
      })
  },
  findUserPurchaseById: function (user, id) {
    return TransactionRepository.findUserPurchaseById(user,id)
      .then(purchase => {
        let result = {};
        result.purchase = purchase;
        return Promise.resolve(result);
      })
  },
  findUserPurchasesByYear: function (user, year, page) {
    return TransactionRepository.findUserPurchasesByYear(user, year, page)
      .then(purchases => {
        let result = {};
        result.purchases = purchases;
        return Promise.resolve(result);
      })
  },
  findUserPurchasesByMonth: function (user, month, page) {
    return TransactionRepository.findUserPurchasesByMonth(user, month, page)
      .then(purchases => {
        let result = {};
        result.purchases = purchases;
        return Promise.resolve(result);
      })
  },
  findUserPurchasesByLastThreeMonths: function (user, page) {
    return TransactionRepository.findUserPurchasesByLastThreeMonths(user, page)
      .then(purchases => {
        let result = {};
        result.purchases = purchases;
        return Promise.resolve(result);
      })
  },
  findUserPurchasesByDateRange: function (user, range, page) {
    return TransactionRepository.findUserPurchasesByDateRange(user, range, page)
      .then(purchases => {
        let result = {};
        result.purchases = purchases;
        return Promise.resolve(result);
      })
  }
};