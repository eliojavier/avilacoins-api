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
                if (payment.response == 'approved') {
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
                if (payment.response == 'disapproved') {
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
      .then (user => {
        if (user) {
          email.approvedWithdrawEmail(user);
          LogRepository.createApprovedWithdrawRecord(withdraw)
            .then (log => {

            });
          let result = {};
          result.success = true;
          return Promise.resolve(result);
        }
      })
  }
};