let jwt = require('jsonwebtoken');

module.exports = {
  isAdmin: function (req, res, next) {

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
      res.status(401);
      res.send('Format is Authorization: Bearer [token]');
    }
  }
  else {
    res.status(401);
    res.send('No Authorization header was found');
  }
  const user = jwt.decode(token);

  if (!user || (user.role != 'admin' && user.role != 'superadmin')) {
    // next(new APIError('Unauthorized action', httpStatus.UNAUTHORIZED))
    res.status(401);
    res.send('Unauthorized action');
  }

  req.user = user;
  next();
}
};