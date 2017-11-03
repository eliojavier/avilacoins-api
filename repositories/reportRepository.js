let db = require('../models');
let Sequelize = require('sequelize');

module.exports = {
  NumberOfAffiliatesByType: function() {
    return db.sequelize.query("SELECT ct.name, COUNT(u.fk_commerce_type) AS quantity " +
      "FROM CommerceType ct LEFT JOIN User u " +
      "ON ct.id = u.fk_commerce_type " +
      "AND u.status = 'active'" +
      "GROUP BY ct.name, u.fk_commerce_type " +
      "ORDER BY quantity DESC, ct.name",
      {type: Sequelize.QueryTypes.select});
  },
  rankingOfUsersByCoinsTransfers: function() {
    return db.sequelize.query("SELECT CONCAT(u.name, ' ',  u.last_name) AS name, u.username, SUM(t.amount) AS amount " +
      "FROM User u, Transfer t " +
      "WHERE t.fk_sender = u.id " +
      "AND u.status = 'active'" +
      "GROUP BY u.username " +
      "ORDER BY amount DESC, u.username",
      {type: Sequelize.QueryTypes.select});
  },
  rankingOfUserByTransfersQuantity: function() {
    return db.sequelize.query("SELECT CONCAT(u.name, ' ',  u.last_name) AS name, u.username, COUNT(t.fk_sender) AS quantity " +
      "FROM User u, Transfer t " +
      "WHERE t.fk_sender = u.id " +
      "AND u.status = 'active'" +
      "GROUP BY u.username, t.fk_sender " +
      "ORDER BY quantity DESC, u.username",
      {type: Sequelize.QueryTypes.select});
  },
  affiliatesByType: function() {
    return db.sequelize.query("SELECT ct.name AS commerceType, u.name AS name,  u.username " +
      "FROM CommerceType ct, User u " +
      "WHERE u.fk_commerce_type = ct.id " +
      "AND u.status = 'active'" +
      "GROUP BY ct.name, u.name, u.username " +
      "ORDER BY ct.name, u.username",
      {type: Sequelize.QueryTypes.select});
  },
  numberOfAffiliatesByState: function() {
    return db.sequelize.query("SELECT estado.name, COUNT(u.fk_location) AS quantity " +
      "FROM Location zona, Location ciudad, Location estado, User u " +
      "WHERE u.type = 'commerce' " +
      "AND u.fk_location = zona.id " +
      "AND zona.fk_location = ciudad.id " +
      "AND zona.type = 'zone' " +
      "AND ciudad.type = 'city' " +
      "AND ciudad.fk_location = estado.id " +
      "AND estado.type = 'state' " +
      "GROUP BY estado. id, estado.name, u.fk_location " +
      "UNION " +
      "SELECT estado.name, 0 AS quantity " +
      "FROM Location estado " +
      "WHERE estado.type = 'state' " +
      "AND estado.id NOT IN (" +
      "SELECT estado.id " +
      "FROM Location zona, Location ciudad, Location estado, User u " +
      "WHERE " +
      "u.type = 'commerce' " +
      "AND u.fk_location = zona.id " +
      "AND zona.fk_location = ciudad.id " +
      "AND zona.type = 'zone' " +
      "AND ciudad.type = 'city' " +
      "AND ciudad.fk_location = estado.id)",
      {type: Sequelize.QueryTypes.select});
  },
  commercesByState: function() {
    return db.sequelize.query("SELECT estado.name as state, u.name, u.username " +
      "FROM Location estado, Location ciudad, Location zona, User u " +
      "WHERE u.fk_location = zona.id " +
      "AND zona.type = 'zone' " +
      "AND zona.fk_location = ciudad.id " +
      "AND ciudad.type = 'city' " +
      "AND ciudad.fk_location = estado.id " +
      "AND u.type = 'commerce' " +
      "AND estado.type = 'state'",
      {type: Sequelize.QueryTypes.select});
  },
  numberOfTransactionsByType: function() {
    return db.sequelize.query("SELECT COUNT(t.id) AS quantity " +
      "FROM Transaction t " +
      "WHERE t.type = 'purchase' " +
      "AND t.status = 'approved' " +
      "UNION ALL " +
      "SELECT COUNT(t.id) AS quantity " +
      "FROM Transaction t " +
      "WHERE t.type = 'withdraw' " +
      "AND t.status = 'approved' " +
      "UNION ALL " +
      "SELECT COUNT(t.id) AS quantity " +
      "FROM Transfer t",
      {type: Sequelize.QueryTypes.select});
  }
};