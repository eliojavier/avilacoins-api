let jwt = require('jsonwebtoken');
let HTTPError = require('node-http-error');

module.exports = {
  getUser: function (req, res) {
    let token = '';
    if (req.headers && req.headers.authorization) {
      const parts = req.headers.authorization.split(' ');
      if (parts.length === 2) {
        const scheme = parts[0];
        const credentials = parts[1];

        if (/^Bearer$/i.test(scheme)) {
          token = credentials
        }
      }
      else {
        throw new HTTPError(401, 'Format is Authorization: Bearer [token]');
      }
    }
    else {
      throw new HTTPError(401, 'No Authorization header was found');
    }
    let user = jwt.decode(token);
    if (user.status != 'active') {
      throw new HTTPError(401, 'Unauthorized action');
    }
    return user;
  }
};