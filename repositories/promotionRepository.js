let db = require('../models');
let Sequelize = require('sequelize');

module.exports = {
  create: function (user, promotion) {
    let promo_code = Math.random().toString(36).substr(2, 8);
    return db.Promotion.create({
      name: promotion.name,
      description: promotion.description,
      start_date: promotion.startDate,
      end_date: promotion.endDate,
      min_age: promotion.minAge,
      max_age: promotion.maxAge,
      coupons_limit: promotion.couponsLimit,
      male: promotion.male,
      female: promotion.female,
      promo_code: promo_code,
      status: 'open',
      fk_user: user.id
    }).then(result => {
        if (result) {
          promotion.category.forEach(function (item) {
            return db.CommercePromotion.create({
              fk_promotion: result.id,
              fk_commerce_type: item
            })
          });
        }
      }
    );
  },
  findAll: function () {
    return db.sequelize.query("SELECT  p.id as id, p.name as name, u.username, " +
      "DATE_FORMAT(start_date, '%d/%m/%Y') as start_date, " +
      "DATE_FORMAT(end_date, '%d/%m/%Y') as end_date, " +
      "p.status as status, " +
      "promo_code " +
      "FROM Promotion p, User u " +
      "WHERE p.fk_user = u.id " +
      "ORDER BY status, p.created_at DESC, p.name ASC",
      {type: Sequelize.QueryTypes.select});
  },
  findUserPromotions: function (user) {
    return db.sequelize.query("SELECT  id, name, " +
      "DATE_FORMAT(start_date, '%d/%m/%Y') as start_date, " +
      "DATE_FORMAT(end_date, '%d/%m/%Y') as end_date, " +
      "status, " +
      "promo_code " +
      "FROM Promotion " +
      "WHERE fk_user = :user_id " +
      "ORDER BY status, created_at DESC, name ASC",
      {
        replacements: {user_id: user.id},
        type: Sequelize.QueryTypes.select
      });
  },
  validateName: function (user, name) {
    return db.Promotion.count({
      where: {
        name: name,
        fk_user: user.id
      }
    })
  },
  target: function (promotion) {
    return db.sequelize.query(" SELECT COUNT(sender.id) AS quantity " +
      "FROM User sender, User receptor, Transfer t, CommerceType ct " +
      "WHERE t.fk_sender = sender.id " +
      "AND sender.gender IN (:genders) " +
      "AND DATE_FORMAT(FROM_DAYS(TO_DAYS(NOW())-TO_DAYS(sender.birth_date)), '%Y')+0 BETWEEN :minAge AND :maxAge " +
      "AND t.fk_receptor = receptor.id " +
      "AND receptor.fk_commerce_type = ct.id " +
      "AND ct.id IN (:categoriesIds)",
      {
        replacements: {
          minAge: promotion.minAge,
          maxAge: promotion.maxAge,
          categoriesIds: promotion.categoriesIds,
          genders: promotion.genders
        },
        type: Sequelize.QueryTypes.select});
  },
  updateStatus: function (promotion, id) {
    return db.Promotion.update(
      {
        status: promotion.status
      },
      {
        where: {
          id: id
        }
      }
    )
  },
  findUserPromotionById: function (user, id) {
    return db.sequelize.query("SELECT p.id, " +
      "p.name, " +
      "p.description, " +
      "DATE_FORMAT(p.start_date, '%Y-%m-%d') as start_date, " +
      "DATE_FORMAT(p.end_date, '%Y-%m-%d') as end_date, " +
      "p.min_age, " +
      "p.max_age, " +
      "coupons_limit, " +
      "p.male, " +
      "p.female, " +
      "p.promo_code, " +
      "p.status " +
      "FROM Promotion p, User u " +
      "WHERE p.id = :id " +
      "AND p.fk_user = :user_id",
      {
        replacements: {id: id, user_id: user.id},
        type: Sequelize.QueryTypes.select
      });
  },
  findById: function (id) {
    return db.sequelize.query("SELECT p.id, " +
      "p.name, " +
      "p.description, " +
      "DATE_FORMAT(p.start_date, '%Y-%m-%d') as start_date, " +
      "DATE_FORMAT(p.end_date, '%Y-%m-%d') as end_date, " +
      "p.min_age, " +
      "p.max_age, " +
      "coupons_limit, " +
      "p.male, " +
      "p.female, " +
      "p.promo_code, " +
      "p.status " +
      "FROM Promotion p " +
      "WHERE p.id = :id",
      {
        replacements: {id: id},
        type: Sequelize.QueryTypes.select
      });
  },
  findPromotionsCategories: function (id) {
    return db.CommercePromotion.findAll({
      attributes: ['fk_commerce_type'],
      where: {
        fk_promotion: id,
      },
      include: [{model: db.CommerceType, as: 'commerceType', attributes: ['name']}]
    })
  },
  update: function(id, promotion, user) {
    return db.Promotion.update(
      {
        name: promotion.name,
        description: promotion.description,
        startDate: promotion.startDate,
        endDate: promotion.endDate,
        minAge: promotion.minAge,
        maxAge: promotion.maxAge,
        couponsLimit: promotion.couponsLimit,
        male: promotion.male,
        female: promotion.female,
      },
      {
        where: {
          id: id,
          fk_user: user.id
        }
      }
    ).then(r => {
      console.log(r);
      if (r) {
        return db.CommercePromotion.destroy({
          where: {
            fk_promotion: id
          }
        }).then(s => {
          promotion.category.forEach(function (item) {
            return db.CommercePromotion.create({
              fk_promotion: id,
              fk_commerce_type: item
            })
          });
        });
      }
    });
  },
};