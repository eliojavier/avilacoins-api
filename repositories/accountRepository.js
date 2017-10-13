let db = require('../models');

module.exports = {
  create: function (user) {
    return db.Account.create({
      balance: 0,
      withheld: 0,
      fk_user: user.id
    })
  }
};