let db = require('../models');

module.exports = {
  create: function (payment) {
    let lastFourDigits = '**' + payment.card_number.slice(-4);
    let fakeResponse = Math.floor((Math.random() * 10) + 1) > 3;
    let response = 'approved';

    return db.Payment.create({
      brand: payment.card_type,
      cardholder: payment.cardholder,
      expiration_date: payment.expiration_date,
      digits: lastFourDigits,
      response: response
    })
      .then(paymentCreated => {
        let result = {};
        result.transactionId = paymentCreated.id;
        result.response = response;
        return result;
      });
  }
};