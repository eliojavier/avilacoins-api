let db = require('../models');

module.exports = {
  findActiveStatusByEmail: function (email) {
    return db.User.findOne({
      where: {
        status: 'active',
        email: email,
        $or: [
          {
            role: 'admin',
            type: 'user'
          },
          {
            role: 'superadmin',
            type: 'user'
          },
          {
            role: 'user',
            type: 'commerce'
          },
        ]
      }
    })
  }
};