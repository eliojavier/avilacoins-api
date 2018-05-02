let db = require('../models');

module.exports = {
  findAll: function () {
    return db.CommerceType.findAll({
      order: [
        ['name', 'ASC']
      ],
    })
  },
  findById: function (id) {
    return db.CommerceType.findOne({
      where: {
        id: id
      },
      include: [{model: db.Promotion, as: 'commercePromotions'}]
    })
  }
};