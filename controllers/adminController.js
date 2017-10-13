let AdminRepository = require('../repositories/adminRepository');
let LogRepository = require('../repositories/logRepository');
let UserController = require('./userController');
let HTTPError = require('node-http-error');

module.exports = {
  login: function (email, password) {
    return AdminRepository.findActiveStatusByEmail(email)
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
            return Promise.resolve(result);
          });
      })
  },
};
