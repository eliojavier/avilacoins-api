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
      .then(response => {
        return db.User.findOne({
          where: {
            id: transaction.fk_user
          },
        })
      })
  },
  findUserWithdrawById: function (user, id) {
    return db.Transaction.findOne({
      where: {
        id: id,
        type: 'withdraw',
        fk_user: user.id
      },
      include: [{model: db.BankAccount, as: 'bankAccount', attributes: ['account_number']}]
    })
  },
  findUserWithdraws: function (user, page) {
    let limit = 15;
    let offset = limit * (page - 1);
    return db.Transaction.findAll({
      limit: limit,
      offset: offset,
      where: {
        type: 'withdraw',
        fk_user: user.id
      },
      order: [
        ['created_at', 'DESC']
      ],
      include: [{model: db.BankAccount, as: 'bankAccount', attributes: ['account_number']}]
    })
  },
  findUserWithdrawsByYear: function (user, year, page) {
    let limit = 15;
    let offset = limit * (page - 1);
    return db.Transaction.findAll({
      limit: limit,
      offset: offset,
      order: [
        ['updated_at', 'DESC']
      ],
      where: {
        $and: [
          Sequelize.where(Sequelize.fn('YEAR', Sequelize.col('Transaction.created_at')), year),
          {
            type: 'withdraw',
            fk_user: user.id
          },
        ]
      },
      include: [{model: db.BankAccount, as: 'bankAccount', attributes: ['account_number']}]
    });
  },
  findUserWithdrawsByMonth: function (user, month, page) {
    let limit = 15;
    let offset = limit * (page - 1);
    return db.Transaction.findAll({
      limit: limit,
      offset: offset,
      order: [
        ['updated_at', 'DESC']
      ],
      where: {
        $and: [
          Sequelize.where(Sequelize.fn('MONTH', Sequelize.col('Transaction.created_at')), month),
          Sequelize.where(Sequelize.fn(
            'YEAR', Sequelize.col('Transaction.created_at')),
            Sequelize.fn('YEAR', Sequelize.fn('CURDATE'))
          ),
          {
            type: 'withdraw',
            fk_user: user.id
          },
        ]
      },
      include: [{model: db.BankAccount, as: 'bankAccount', attributes: ['account_number']}]
    });
  },
  findUserWithdrawsByLastThreeMonths(user, page) {
    let limit = 15;
    let offset = limit * (page - 1);
    return db.Transaction.findAll({
      limit: limit,
      offset: offset,
      order: [
        ['updated_at', 'DESC']
      ],
      where: {
        type: 'withdraw',
        fk_user: user.id,
        created_at: {
          $between: [Sequelize.fn('DATE_SUB',
            Sequelize.literal('NOW()'),
            Sequelize.literal('INTERVAL 90 DAY')), Sequelize.fn('NOW')]
        }
      },
      include: [{model: db.BankAccount, as: 'bankAccount', attributes: ['account_number']}]
    });
  },
  findUserWithdrawsByDateRange(user, range, page) {
    let limit = 15;
    let offset = limit * (page - 1);
    return db.Transaction.findAll({
      limit: limit,
      offset: offset,
      order: [
        ['updated_at', 'DESC']
      ],
      where: {
        type: 'withdraw',
        fk_user: user.id,
        created_at: {
          $between: [range.from, range.to]
        }
      },
      include: [{model: db.BankAccount, as: 'bankAccount', attributes: ['account_number']}]
    });
  },
  findUserPurchases: function (user, page) {
    let limit = 15;
    let offset = limit * (page - 1);
    return db.Transaction.findAll({
      limit: limit,
      offset: offset,
      where: {
        type: 'purchase',
        fk_user: user.id
      },
      order: [
        ['created_at', 'DESC']
      ],
    })
  },
  findUserPurchaseById: function (user, id) {
    return db.Transaction.findOne({
      where: {
        id: id,
        type: 'purchase',
        fk_user: user.id
      },
      include: [{model: db.Payment, as: 'payment'}]
    })
  },
  findUserPurchasesByYear: function (user, year, page) {
    let limit = 15;
    let offset = limit * (page - 1);
    return db.Transaction.findAll({
      limit: limit,
      offset: offset,
      order: [
        ['updated_at', 'DESC']
      ],
      where: {
        $and: [
          Sequelize.where(Sequelize.fn('YEAR', Sequelize.col('Transaction.created_at')), year),
          {
            type: 'purchase',
            fk_user: user.id
          },
        ]
      }
    });
  },
  findUserPurchasesByMonth: function (user, month, page) {
    let limit = 15;
    let offset = limit * (page - 1);
    return db.Transaction.findAll({
      limit: limit,
      offset: offset,
      order: [
        ['updated_at', 'DESC']
      ],
      where: {
        $and: [
          Sequelize.where(Sequelize.fn('MONTH', Sequelize.col('Transaction.created_at')), month),
          Sequelize.where(Sequelize.fn(
            'YEAR', Sequelize.col('Transaction.created_at')),
            Sequelize.fn('YEAR', Sequelize.fn('CURDATE'))
          ),
          {
            type: 'purchase',
            fk_user: user.id
          },
        ]
      },
    });
  },
  findUserPurchasesByLastThreeMonths: function (user, page) {
    let limit = 15;
    let offset = limit * (page - 1);
    return db.Transaction.findAll({
      limit: limit,
      offset: offset,
      order: [
        ['updated_at', 'DESC']
      ],
      where: {
        type: 'purchase',
        fk_user: user.id,
        created_at: {
          $between: [Sequelize.fn('DATE_SUB',
            Sequelize.literal('NOW()'),
            Sequelize.literal('INTERVAL 90 DAY')), Sequelize.fn('NOW')]
        }
      }
    });
  },
  findUserPurchasesByDateRange: function(user, range, page) {
    let limit = 15;
    let offset = limit * (page - 1);
    return db.Transaction.findAll({
      limit: limit,
      offset: offset,
      order: [
        ['updated_at', 'DESC']
      ],
      where: {
        type: 'purchase',
        fk_user: user.id,
        created_at: {
          $between: [range.from, range.to]
        }
      },
      include: [{model: db.Payment, as: 'payment'}]
    });
  },
};