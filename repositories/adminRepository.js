let db = require('../models');

module.exports = {
  findActiveUserByEmail: function (email) {
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
  },
  findAll: function () {
    return db.User.findAll({
      where: {
        role: 'admin'
      }
    })
  },
  updateStatus(id, status) {
    return db.User.update(
      {
        status: status
      },
      {
        where: {
          id: id
        }
      }
    )
  },
  create: function (user) {
    return db.User.create({
      name: user.name.trim(),
      last_name: user.lastName.trim(),
      email: user.email.trim(),
      username: user.username.trim(),
      phone: user.phone.trim(),
      doc_id: user.docId.trim(),
      type: 'user',
      status: 'active',
      pin: '0000',
      password: user.password,
      email_notification: false,
      sms_notification: false,
      role: 'admin',
      fk_location: 1
    })
  }
};