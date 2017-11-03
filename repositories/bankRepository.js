let db = require('../models');

module.exports = {
  findAll: function() {
    return db.Bank.findAll({
      attributes: ['id', 'name'],
      where: {
        status: 'active',
      }
    })
  }
};