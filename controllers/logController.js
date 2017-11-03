let LogRepository = require('../repositories/logRepository');

module.exports = {
  findLoginLogs: function () {
    return LogRepository.findLoginLogs()
      .then(logs => {
        let result = {};
        result.logs = logs;
        return Promise.resolve(result);
      })
  },
  findRegisterLogs: function () {
    return LogRepository.findRegisterLogs()
      .then(logs => {
        let result = {};
        result.logs = logs;
        return Promise.resolve(result);
      })
  },
  findTransfersLogs: function () {
    return LogRepository.findTransfersLogs()
      .then(logs => {
        let result = {};
        result.logs = logs;
        return Promise.resolve(result);
      })
  },
  findPurchasesLogs: function () {
    return LogRepository.findPurchasesLogs()
      .then(logs => {
        let result = {};
        result.logs = logs;
        return Promise.resolve(result);
      })
  },
  findWithdrawsLogs: function () {
    return LogRepository.findWithdrawsLogs()
      .then(logs => {
        let result = {};
        result.logs = logs;
        return Promise.resolve(result);
      })
  }
};

