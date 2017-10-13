let db = require('../models');

module.exports = {
  findAll: function () {
    return db.CommerceType.findAll({
      order: [
        ['name', 'ASC']
      ],
    })
  }
};