let db = require('../models');
let Sequelize = require('sequelize');

module.exports = {
  findAll: function () {
    return db.CommerceType.findAll({
      order: [
        ['name', 'ASC']
      ],
      include: [
        {
          model: db.User, as: 'users', attributes: ['id', 'username', 'name']
        }
      ]
    });
  },
  findAllAffiliates: function () {
    return db.User.findAll({
      where: {
        role: 'user',
        type: 'commerce'
      }
    })
  },
  findByCategoriesIdAndStatesId: function (categoriesId, statesId) {
    return db.sequelize.query("SELECT u.*, ct.name " +
      "FROM Location zona, Location ciudad, Location estado, User u, CommerceType ct " +
      "WHERE u.type = 'commerce' " +
      "AND u.status = 'active' " +
      "AND u.fk_location = zona.id " +
      "AND zona.fk_location = ciudad.id " +
      "AND zona.type = 'zone' " +
      "AND ciudad.type = 'city' " +
      "AND ciudad.fk_location = estado.id " +
      "AND estado.type = 'state' " +
      "AND estado.id IN (:statesId) " +
      "AND u.fk_commerce_type = ct.id " +
      "AND ct.id IN (:categoriesId)",
      {
        replacements: {
          statesId: statesId,
          categoriesId: categoriesId
        },
        type: Sequelize.QueryTypes.select
      });
  },
  findByStatesId: function (statesId) {
    return db.sequelize.query("SELECT u.* " +
      "FROM Location zona, Location ciudad, Location estado, User u " +
      "WHERE u.type = 'commerce' " +
      "AND u.status = 'active' " +
      "AND u.fk_location = zona.id " +
      "AND zona.fk_location = ciudad.id " +
      "AND zona.type = 'zone' " +
      "AND ciudad.type = 'city' " +
      "AND ciudad.fk_location = estado.id " +
      "AND estado.type = 'state' " +
      "AND estado.id IN (:statesId)",
      {
        replacements: {
          statesId: statesId,
        },
        type: Sequelize.QueryTypes.select
      });
  },
  findByCategoriesId: function (categoriesId) {
    return db.User.findAll({
      where: {
        status: 'active',
        fk_commerce_type: {$in: categoriesId}
      },
      include: [{model: db.CommerceType, as: 'commerceType', attributes: ['name']}]
    })
  },
  findById: function (id) {
    return db.User.findOne({
      where: {
        id: id
      },
      include: [
        {model: db.CommerceType, as: 'commerceType', attributes: ['name']},
        {model: db.Location, as: 'location'}
      ]
    })
  }
};