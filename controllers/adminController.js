let AdminRepository = require('../repositories/adminRepository');
let LogRepository = require('../repositories/logRepository');
let UserController = require('./userController');
let HTTPError = require('node-http-error');

module.exports = {
  login: function (email, password) {
    return AdminRepository.findActiveUserByEmail(email)
      .then(user => {
        if (!user || !user.validPassword(password)) {
          throw new HTTPError(400, 'Invalid email or password');
        }
        return LogRepository.createLoginRecord(user)
          .then(log => {
            if (!log) {
              throw new HTTPError(400, 'log not created');
            }
            const token = UserController.createToken(user);
            let result = {};
            result.token = token;
            result.role = user.role;
            return Promise.resolve(result);
          });
      })
  },
  findAll: function () {
    return AdminRepository.findAll()
      .then(users => {
        let result = {};
        result.users = users;
        return Promise.resolve(result);
      })
  },
  updateStatus: function (id, status) {
    return AdminRepository.updateStatus(id, status)
      .then(response => {
        if (response[0] == 1) {
          let result = {};
          result.success = true;
          result.message = 'user status updated';
          return Promise.resolve(result);
        }
        let result = {};
        result.success = false;
        result.message = 'user status not updated';
        return Promise.resolve(result);
      })
  },
  create: function (user) {
    return AdminRepository.create(user)
      .then(adminCreated => {
        let result = {};
        result.success = true;
        result.message = 'admin created';
        return Promise.resolve(result);
      })
  }
};
