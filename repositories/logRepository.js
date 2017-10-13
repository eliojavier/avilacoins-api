let db = require('../models');

module.exports = {
  createLoginRecord: function (user) {
    return  db.Log.create({
      action: 'login',
      origin_id: user.id
    });
  }
};