let getUserFromToken = require('./getUserFromToken');

module.exports = {
  validateAdminRole: function (req, res, next) {
    let user = getUserFromToken.getUser(req, res);
    if (!user || (user.role != 'admin' && user.role != 'superadmin')) {
      res.status(401);
      res.send('Unauthorized action');
    }
    req.user = user;
    next();
  },
  validateSuperAdminRole: function (req, res, next) {
    let user = getUserFromToken.getUser(req, res);
    if (!user || user.role != 'superadmin') {
      res.status(401);
      res.send('Unauthorized action');
    }
    req.user = user;
    next();
  },
  validateUserRole: function (req, res, next) {
    const user = getUserFromToken.getUser(req, res);
    if (!user || user.role != 'user') {
      res.status(401);
      res.send('Unauthorized action');
    }
    req.user = user;
    next();
  },
  validateCommerceType: function (req, res, next) {
    const user = getUserFromToken.getUser(req, res);
    if (!user || user.type != 'commerce') {
      res.status(401);
      res.send('Unauthorized action');
    }
    req.user = user;
    next();
  },
  validateCommerceOrAdminType: function (req, res, next) {
    const user = getUserFromToken.getUser(req, res);
    if (!user || (user.type != 'commerce' && user.role != 'admin' && user.role != 'superadmin')) {
      res.status(401);
      res.send('Unauthorized action');
    }
    req.user = user;
    next();
  },
  validateRegisteredUser: function (req, res, next) {
    let user = getUserFromToken.getUser(req, res);
    if (!user) {
      res.status(401);
      res.send('Unauthorized action');
    }
    req.user = user;
    next();
  },
};