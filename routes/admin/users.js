let express = require('express');
let router = express.Router();
let UserController = require('../../controllers/userController');
let RoleMiddleware = require('../../middlewares/roleMiddleware');

router.get('/', RoleMiddleware.validateAdminRole, function (req, res, next) {
  UserController.findAll()
    .then(response => res.json(response))
    .catch(err => next(err))
});

router.get('/:id', RoleMiddleware.validateAdminRole, function (req, res, next) {
  UserController.findUserDetailsById(req.params.id)
    .then(response => res.json(response))
    .catch(err => next(err))
});

router.post('/password/restore', RoleMiddleware.validateSuperAdminRole, function (req, res, next) {
  UserController.restoreDefaultPassword(req.body.id)
    .then(response => res.json(response))
    .catch(err => next(err))
});

router.get('/manual-validation/:id', function (req, res, next) {
  UserController.manualAccountCreation(req.params.id)
    .then(response => res.json(response))
    .catch(err => next(err))
});

router.get('/count/all-users', RoleMiddleware.validateAdminRole, function (req, res, next) {
  UserController.countAllUsers()
    .then(response => res.json(response))
    .catch(err => next(err))
});

router.get('/count/all-commerces', RoleMiddleware.validateAdminRole, function (req, res, next) {
  UserController.countAllCommerces()
    .then(response => res.json(response))
    .catch(err => next(err))
});

module.exports = router;
