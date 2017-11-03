let db = require('../models');
let Sequelize = require('sequelize');

module.exports = {
  createLoginRecord: function (user) {
    return db.Log.create({
      action: 'login',
      origin_id: user.id
    });
  },
  createTransferRecord: function (transfer) {
    return db.Log.create({
      action: 'transfer',
      origin_id: transfer.id
    });
  },
  createPurchaseRecord: function (purchase) {
    return db.Log.create({
      action: 'purchase',
      origin_id: purchase.id
    });
  },
  createWithdrawRequestRecord: function (withdraw) {
    return db.Log.create({
      action: 'withdraw',
      origin_id: withdraw.id
    });
  },
  createApprovedWithdrawRecord: function (withdraw) {
    return db.Log.create({
      action: 'withdraw',
      origin_id: withdraw.id
    });
  },
  findLoginLogs: function () {
    return db.sequelize.query("SELECT l.id as logId, u.name, u.last_name as lastName, " +
                              "u.username, u.id as userId, l.created_at " +
      "FROM User u, Log l " +
      "WHERE l.action = 'login' AND " +
      "u.id = l.origin_id",
      {type: Sequelize.QueryTypes.select});
  },
  findRegisterLogs: function () {
    return db.sequelize.query("SELECT l.id as logId, u.name, u.last_name as lastName, u.username, u.id as userId, l.created_at " +
      "FROM User u, Log l " +
      "WHERE l.action = 'register' AND " +
      "u.id = l.origin_id",
      {type: Sequelize.QueryTypes.select});
  },
  findTransfersLogs: function () {
    return db.sequelize.query("SELECT l.id as logId, " +
      "u.name as senderName, u.last_name as senderLastName, u.username as senderUsername, u.id as senderId, " +
      "t.id as transferId, t.amount, t.fk_sender as receptorId, " +
      "r.name as receptorName, r.last_name as receptorLastName, r.username as receptorUsername, r.id as receptorId, " +
      "l.created_at " +
      "FROM User u, User r, Transfer t, Log l " +
      "WHERE " +
      "l.action = 'transfer' " +
      "AND t.id = l.origin_id " +
      "AND t.fk_sender = u.id " +
      "AND r.id = t.fk_receptor",
      {type: Sequelize.QueryTypes.select});
  },
  findPurchasesLogs() {
    return db.sequelize.query("SELECT l.id as logId, u.name, u.last_name as lastName, u.username, u.id as userId, " +
      "t.id as transactionId, t.coins, l.created_at " +
      "FROM User u, Transaction t, Log l " +
      "WHERE l.action = 'purchase' " +
      "AND t.id = l.origin_id " +
      "AND t.fk_user = u.id",
      {type: Sequelize.QueryTypes.select});
  },
  findWithdrawsLogs() {
    return db.sequelize.query("SELECT l.id as logId, u.name, u.last_name as lastName, u.username, u.id as userId, " +
      "t.id as transactionId, t.coins, l.created_at " +
      "FROM User u, Transaction t, Log l " +
      "WHERE l.action = 'withdraw' " +
      "AND t.id = l.origin_id " +
      "AND t.fk_user = u.id",
      {type: Sequelize.QueryTypes.select});
  }
};

