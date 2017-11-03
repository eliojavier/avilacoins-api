let ReportRepository = require('../repositories/reportRepository');

module.exports = {
  NumberOfAffiliatesByType: function () {
    return ReportRepository.NumberOfAffiliatesByType()
      .then(response => {
        let result = {};
        result.data = response;
        return Promise.resolve(result);
      })
  },
  rankingOfUsersByCoinsTransfers: function () {
    return ReportRepository.rankingOfUsersByCoinsTransfers()
      .then(response => {
        let result = {};
        result.data = response;
        return Promise.resolve(result);
      })

  },
  rankingOfUserByTransfersQuantity: function () {
    return ReportRepository.rankingOfUserByTransfersQuantity()
      .then(response => {
        let result = {};
        result.data = response;
        return Promise.resolve(result);
      })
  },
  affiliatesByType: function () {
    return ReportRepository.affiliatesByType()
      .then(response => {
        let result = {};
        result.data = response;
        return Promise.resolve(result);
      })

  },
  numberOfAffiliatesByState: function () {
    return ReportRepository.numberOfAffiliatesByState()
      .then(response => {
        let result = {};
        result.data = response;
        return Promise.resolve(result);
      })
  },
  commercesByState: function () {
    return ReportRepository.commercesByState()
      .then(response => {
        let result = {};
        result.data = response;
        return Promise.resolve(result);
      })
  },
  numberOfTransactionsByType: function () {
    return ReportRepository.numberOfTransactionsByType()
      .then(response => {
        let result = {};
        result.data = response;
        return Promise.resolve(result);
      })
  }
};