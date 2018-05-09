let db = require('../models');
let randToken = require('rand-token');
let securityConfig = require('../config/security.json');

module.exports = {
  create: function (user) {
    if (user.type === 'user') {
      return db.User.create({
        name: user.name.trim(),
        last_name: user.lastName.trim(),
        email: user.email.trim(),
        username: user.username.trim(),
        phone: user.phone.trim(),
        birth_date: user.birthDate,
        doc_id: user.docId.trim(),
        gender: user.gender.trim(),
        type: user.type.trim(),
        address: user.address.trim(),
        profile_picture: user.profilePicture,
        status: 'email-validation',
        pin: user.pin,
        password: user.password,
        email_notification: false,
        sms_notification: false,
        fk_location: user.fkLocation,
        validation_token: randToken.generate(16),
        role: 'user'
      }).then(user => {
        db.Log.create({
          action: 'register',
          origin_id: user.id
        });
        return user;
      })
    }
    else if (user.type === 'commerce') {
      return db.User.create({
        name: user.name.trim(),
        lastName: user.lastName.trim(),
        email: user.email.trim(),
        username: user.username.trim(),
        phone: user.phone.trim(),
        birthDate: user.birthDate,
        rif: user.rif.trim(),
        type: user.type.trim(),
        address: user.address.trim(),
        profile_picture: user.profilePicture,
        status: 'email-validation',
        pin: user.pin,
        password: user.password,
        email_notification: false,
        sms_notification: false,
        fk_commerce_type: user.fkCommerceType,
        fk_location: user.fkLocation,
        validation_token: randToken.generate(16),
        role: 'user'
      }).then(user => {
        db.Log.create({
          action: 'register',
          origin_id: user.id
        });
        return user;
      })
    }
  },
  findAll: function () {
    return db.User.findAll({
      where: {
        role: 'user',
        type: 'user'
      }
    })
  },
  findActiveUserByEmail: function (email) {
    return db.User.findOne({
      where: {
        status: 'active',
        email: email,
        $or: [
          {
            role: 'user',
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
  findActiveUserByUsername: function (username) {
    return db.User.findOne({
      where: {
        username: username,
        status: 'active'
      }
    })
  },
  findByUsername: function (username) {
    return db.User.findOne({
      where: {
        username: username
      }
    })
  },
  findByEmail: function (email) {
    return db.User.findOne({
      where: {
        email: email
      }
    })
  },
  findByValidationToken: function (validationToken) {
    return db.User.findOne({
      where: {
        status: 'email-validation',
        validation_token: validationToken
      }
    })
  },
  findById: function (user) {
    return db.User.findOne({
      where: {
        status: 'active',
        id: user.id
      },
      include: [
        {model: db.CommerceType, as: 'commerceType', attributes: ['name']},
      ]
    })
  },
  findByPasswordToken: function (passwordToken) {
    return db.User.findOne({
      where: {
        password_token: passwordToken
      }
    })
  },
  findUserDetailsById: function (id) {
    return db.User.findOne({
      where: {
        id: id
      }
    })
  },
  updatePassword: function (user, password) {
    return db.User.update(
      {
        password: password
      },
      {
        where: {
          id: user.id
        }
      }
    )
  },
  restorePassword: function (userId, password) {
    return db.User.update(
      {
        password: password
      },
      {
        where: {
          id: userId
        }
      }
    )
  },
  restoreDefaultPassword: function (userId) {
    let defaultPassword = securityConfig.security.defaultPassword;
    return db.User.update(
      {
        password: defaultPassword
      },
      {
        where: {
          id: userId
        }
      }
    )
  },
  updatePin: function (user, pin) {
    return db.User.update(
      {
        pin: pin
      },
      {
        where: {
          id: user.id
        }
      }
    )
  },
  updateValidationToken: function (user) {
    return db.User.update(
      {
        status: 'active',
        validation_token: null
      },
      {
        where: {
          id: user.id
        }
      }
    )
  },
  updateEmailNotificationStatus(user, status) {
    return db.User.update(
      {
        email_notification: status
      },
      {
        where: {
          id: user.id
        }
      }
    )
  },
  updateStatus: function (user, status) {
    return db.User.update(
      {
        status: status
      },
      {
        where: {
          id: user.id
        }
      }
    )
  },
  updatePasswordToken: function (user, token) {
    return db.User.update(
      {
        password_token: token
      },
      {
        where: {
          id: user.id
        }
      }
    )
  },
  findByIdIncludingLocation(user) {
    return db.User.findOne({
      where: {
        status: 'active',
        id: user.id
      },
      include: [{model: db.Location, as: 'commerceType', attributes: ['name']}]
    })
  },
  updatePhone: function (user, phone) {
    return db.User.update(
      {
        phone: phone
      },
      {
        where: {
          id: user.id
        }

      })
  },
  findByUserId: function (id) {
    return db.User.findOne({
      where: {
        status: 'active',
        id: id
      }
    })
  },
};