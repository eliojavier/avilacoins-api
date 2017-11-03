let db = require('../models');
let Sequelize = require('sequelize');

module.exports = {
  createPurchase: function (user, transaction, payment) {
    return db.Transaction.create({
      coins: transaction.coins,
      subtotal: parseFloat(parseFloat(transaction.subtotal).toFixed(2)),
      tax: parseFloat(parseFloat(transaction.tax).toFixed(2)),
      total: parseFloat(parseFloat(transaction.total).toFixed(2)),
      type: 'purchase',
      status: payment.response,
      fk_payment: payment.transactionId,
      fk_user: user.id
    });
  },
  createWithdrawRequest: function (user, transaction) {
    return db.Transaction.create({
      coins: transaction.coins,
      subtotal: transaction.subtotal,
      commission: transaction.commission,
      total: transaction.total,
      type: 'withdraw',
      status: 'pending',
      fk_bankAccount: transaction.fkBankAccount,
      fk_user: user.id
    })
  },
  findWithdrawsByStatus: function (status) {
    return db.Transaction.findAll({
      order: [
        ['created_at', 'ASC']
      ],
      where: {
        status: status,
        type: 'withdraw'
      },
      include: [{model: db.User, as: 'user', attributes: ['name', 'last_name', 'username']},
        {model: db.BankAccount, as: 'bankAccount', attributes: ['account_number']}]
    });
  },
  approveWithdrawRequest: function (transaction) {
    return db.sequelize.query("UPDATE Account a, Transaction t, User u " +
      "SET a.withheld = a.withheld - :coins, " +
      "t.status = 'approved' " +
      "WHERE t.id = :id " +
      "AND :fk_user = u.id " +
      "AND u.id = a.fk_user ",
      {
        replacements: {
          coins: transaction.coins,
          fk_user: transaction.fk_user,
          id: transaction.id
        },
        type: Sequelize.QueryTypes.select
      })
      .then (response => {
        return db.User.findOne({
          where: {
            id: transaction.fk_user
          },
        })
      })
  }
};