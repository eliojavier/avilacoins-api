let UserRepository = require('../repositories/userRepository');
let AccountRepository = require('../repositories/accountRepository');
let LogRepository = require('../repositories/logRepository');
let HTTPError = require('node-http-error');
let jwt = require('jsonwebtoken');
let email = require('../email');
let config = require('../config/security.json');

module.exports = {
  createToken: function (user) {
    return jwt.sign(user.toJSON(), config.security.token.secret)
  },
  create: function (user) {
    if (user.docId == null && user.rif == null) {
      throw new HTTPError(400, 'Se requiere cédula o RIF');
    }
    if (user.docId == null && user.type == 'user') {
      throw new HTTPError(400, 'Se requiere cédula');
    }
    if (user.rif == null && user.type == 'commerce') {
      throw new HTTPError(400, 'Se requiere RIF');
    }

    return UserRepository.create(user)
      .then(userCreated => {
        if (!userCreated) {
          throw new HTTPError(400, 'Datos inválidos');
        }
        if (userCreated.status === 'email-validation') {
          email.welcomeEmail(userCreated);
          UserRepository.updateEmailNotificationStatus(userCreated, true)
        }
        return Promise.resolve(userCreated)
      })
      .catch(error => {
        return new HTTPError(400, error);
      })
  },
  login: function (email, password) {
    return UserRepository.findActiveStatusByEmail(email)
      .then(user => {
        if (!user || !user.validPassword(password)) {
          throw new HTTPError(400, 'Invalid email or password');
        }
        return LogRepository.createLoginRecord(user)
          .then(log => {
            if (!log) {
              throw new HTTPError(400, 'log not created');
            }
            const token = this.createToken(user);
            let result = {};
            result.token = token;
            return Promise.resolve(result);
          });
      })
  },
  validateUsername: function (username) {
    return UserRepository.findByUsername(username)
      .then(user => {
        let result = {};
        if (!user) {
          result.valid = true;
          return Promise.resolve(result);
        }
        result.valid = false;
        return Promise.resolve(result);
      })
  },
  validateEmail: function (email) {
    return UserRepository.findByEmail(email)
      .then(user => {
        let result = {};
        if (!user) {
          result.valid = true;
          return Promise.resolve(result);
        }
        result.valid = false;
        return Promise.resolve(result);
      })
  },
  updateValidationToken: function (validationToken) {
    return UserRepository.findByValidationToken(validationToken)
      .then(user => {
        if (!user) {
          throw new HTTPError(400, 'user not found');
        }
        UserRepository.updateValidationToken(user)
          .then(response => {
            if (!response[0]) {
              throw new HTTPError(400, 'validation token not updated');
            }
            AccountRepository.create(user)
              .then(account => {
                if (!account) {
                  UserRepository.updateStatus(user, 'locked');
                  throw new HTTPError(400, 'account not created');
                }
                let result = {};
                result.sucess = true;
                result.message = 'account created';
                return Promise.resolve(result);
              })
          })
      });

    // return UserRepository.updateValidationToken(validationToken)
    //   .then(response => {
    //     if (!response[0]) {
    //       throw new HTTPError(400, 'user not found');
    //     }
    //
    //
    //
    //   })
  }
};