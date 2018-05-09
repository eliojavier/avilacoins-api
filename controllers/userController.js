let UserRepository = require('../repositories/userRepository');
let AccountRepository = require('../repositories/accountRepository');
let LogRepository = require('../repositories/logRepository');
let HTTPError = require('node-http-error');
let jwt = require('jsonwebtoken');
let randToken = require('rand-token');
let Email = require('../email');
let config = require('../config/security.json');
let formidable = require('formidable');
let path = require('path');
let fs = require('fs');
const log4js = require('log4js');
log4js.configure({
  appenders: { log: { type: 'file', filename: 'avilacoins.log' } },
  categories: { default: { appenders: ['log'], level: 'error' } }
});
const logger = log4js.getLogger('log');

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
          // Email.welcomeEmail(userCreated);
          Email.welcomeEmail(userCreated);
          UserRepository.updateEmailNotificationStatus(userCreated, true)
        }
        return Promise.resolve(userCreated)
      })
      .catch(error => {
        return new HTTPError(400, error);
      })
  },
  login: function (email, password) {
    return UserRepository.findActiveUserByEmail(email)
      .then(user => {
        if (!user) {
          throw new HTTPError(400, 'User not found');
        }
        else if (!user.validPassword(password)) {
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
  findById: function (user) {
    return UserRepository.findById(user)
      .then(user => {
        let result = {};
        result.user = user;
        return Promise.resolve(result);
      });
  },
  findUserDetailsById: function (id) {
    return UserRepository.findUserDetailsById(id)
      .then(user => {
        let result = {};
        result.user = user;
        return Promise.resolve(result);
      });
  },
  findAll: function () {
    return UserRepository.findAll()
      .then(users => {
        let result = {};
        result.users = users;
        return Promise.resolve(result);
      })
  },
  updatePassword: function (user, password) {
    return UserRepository.updatePassword(user, password)
      .then(response => {
        let result = {};
        result.success = true;
        result.message = 'password updated';
        return Promise.resolve(result);
      })
  },
  updatePin: function (user, pin) {
    return UserRepository.updatePin(user, pin)
      .then(response => {
        let result = {};
        result.success = true;
        result.message = 'pin updated';
        return Promise.resolve(result);
      })
  },
  validatePassword: function (user, password) {
    return UserRepository.findById(user)
      .then(user => {
        if (!user) {
          throw new HTTPError(401, 'unauthorized action');
        }
        let result = {};
        if (!user.validPassword(password)) {
          result.success = false;
          result.message = 'invalid password';
          result.userId = user.id;
          return Promise.resolve(result);
        }
        result.success = true;
        result.message = 'valid password';
        result.userId = user.id;
        return Promise.resolve(result);
      });
  },
  validatePin: function (user, pin) {
    return UserRepository.findById(user)
      .then(user => {
        if (!user) {
          throw new HTTPError(401, 'unauthorized action');
        }
        let result = {};
        if (!user.validPin(pin)) {
          result.success = false;
          result.message = 'invalid pin';
          result.userId = user.id;
          return Promise.resolve(result);
        }
        result.success = true;
        result.message = 'valid pin';
        result.userId = user.id;
        return Promise.resolve(result);
      });
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
  },
  restoreDefaultPassword(userId) {
    return UserRepository.restoreDefaultPassword(userId)
      .then(response => {
        let result = {};
        if (response [0]) {
          result.success = true;
          result.message = 'password restored';
          return Promise.resolve(result);
        }
        result.success = false;
        result.message = 'password not restored';
        return Promise.resolve(result);
      })
  },
  forgotPassword: function (email) {
    return UserRepository.findByEmail(email)
      .then(user => {
        if (!user) {
          throw new HTTPError(400, 'Invalid email');
        }
        let token = randToken.generate(16);
        return UserRepository.updatePasswordToken(user, token)
          .then(response => {
            let result = {};
            if (response[0]) {
              Email.forgotPasswordEmail(user, token);
              result.success = true;
              result.message = 'email sent';
              return Promise.resolve(result);
            }
            result.success = false;
            result.message = 'email not sent';
            return Promise.resolve(result);
          })
      })
  },
  validatePasswordToken: function (passwordToken) {
    return UserRepository.findByPasswordToken(passwordToken)
      .then(user => {
        if (!user) {
          throw new HTTPError(400, 'Invalid token');
        }
        return UserRepository.updatePasswordToken(user, null)
          .then(response => {
            if (response[0]) {
              let result = {};
              result.userId = user.id;
              return Promise.resolve(result);
            }
            throw new HTTPError(500, 'user password token not updated');
          })
      })
  },
  uploadAvatar: function (req, res) {
    logger.info('Upload avatar');
    let result = {};
    let form = new formidable.IncomingForm();
    form.parse(req, function (err, fields, files) {
      if (files != null) {
        if (files.avatar) {
          let old_path = files.avatar.path;
          let file_size = files.avatar.size;
          let file_ext = files.avatar.name.split('.').pop();
          let index = old_path.lastIndexOf('/') + 1;
          let file_name = old_path.substr(index);
          let new_path = path.join(process.env.PWD, '/uploads/', file_name + '.' + file_ext);
          console.log(old_path);
          console.log(file_size);
          console.log(file_ext);
          console.log(index);
          console.log(file_name);
          console.log(new_path);

          fs.readFile(old_path, function(err, data) {
            fs.writeFile(new_path, data, function(err) {
              fs.unlink(old_path, function(err) {
                if (err) {
                  res.status(500);
                  res.json({'success': false});
                } else {
                  result.success = true;
                  result.message = 'done';
                  return Promise.resolve(result);
                }
              });
            });
          });
        }
        else {
          result.success = false;
          result.message = 'no avatar input';
          return Promise.resolve(result);
        }
      }
      else {
        result.success = false;
        result.message = 'no files';
        return Promise.resolve(result);
      }
    });
  },
  updatePhone: function (user, phone) {
    return UserRepository.updatePhone(user, phone)
      .then(response => {
        let result = {};
        result.success = true;
        result.message = 'phone updated';
        return Promise.resolve(result);
      });
  },
  manualAccountCreation: function (id) {
    return this.findById(id)
      .then(user => {
        if (user != null) {
          return AccountRepository.create(user)
            .then(account => {
              if (!account) {
                UserRepository.updateStatus(user, 'locked');
                throw new HTTPError(400, 'account not created');
              }
              let result = {};
              result.sucess = true;
              result.message = 'account created';
              return Promise.resolve(result);
            });
        }
      })
  }
};