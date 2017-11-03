let db = require('../models');

module.exports = {
  create: function (user) {
    return db.Account.create({
      balance: 0,
      withheld: 0,
      fk_user: user.id
    })
  },
  hasEnoughBalance(user, amount) {
    return db.Account.findOne({
      where: {
        fk_user: user.id,
        balance: {$gte: amount}
      }
    })
  },
  deductFromBalance(account, amount) {
    return db.Account.update(
      {
        balance: account.balance - amount
      },
      {
        where: {
          id: account.id,
          balance: {$gte: amount}
        }
      })
  },
  deductAndWithheldFromBalance: function (account, withdraw) {
    return db.Account.update(
      {
        balance: +account.balance + -withdraw.coins,
        withheld: +account.withheld + +withdraw.coins
      },
      {
        where: {
          id: account.id,
          balance: {$gte: withdraw.coins}
        }
      })
  },
  addToBalance(account, amount) {
    return db.Account.update(
      {
        balance: (+account.balance + +amount)
      },
      {
        where: {
          id: account.id
        }
      })
  },
  findByUserId(user) {
    return db.Account.findOne({
      where: {
        fk_user :user.id
      }
    })
  }
};