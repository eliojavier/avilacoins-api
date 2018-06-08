let express = require('express');
let router = express.Router();
let UserController = require('../controllers/userController');
let validate = require('express-validation');
let userValidator = require('../middlewares/param_validations/user');
let RoleMiddleware = require('../middlewares/roleMiddleware');

router.post('/register', validate(userValidator.create), function (req, res, next) {
  UserController.create(req.body)
    .then(response => res.json(response))
    .catch(err => next(err))
});

router.post('/login', function (req, res, next) {
  UserController.login(req.body.email, req.body.password)
    .then(response => res.json(response))
    .catch(err => next(err))
});

router.get('/profile', RoleMiddleware.validateRegisteredUser, function (req, res, next) {
  UserController.findById(req.user)
    .then(response => res.json(response))
    .catch(err => next(err))
});

router.post('/profile/avatar', function (req, res, next) {
  UserController.uploadAvatar(req, res)
    .then(response => res.json(response))
    .catch(err => next(err))
});

router.get('/', RoleMiddleware.validateAdminRole, function (req, res, next) {
  UserController.findAll()
    .then(response => res.json(response))
    .catch(err => next(err))
});

router.get('/validate/username/:username', function (req, res, next) {
  UserController.validateUsername(req.params.username)
    .then(response => res.json(response))
    .catch(err => next(err))
});

router.get('/validate/email/:email', function (req, res, next) {
  UserController.validateEmail(req.params.email)
    .then(response => res.json(response))
    .catch(err => next(err))
});

router.post('/validate/password', RoleMiddleware.validateRegisteredUser, function (req, res, next) {
  UserController.validatePassword(req.user, req.body.password)
    .then(response => res.json(response))
    .catch(err => next(err))
});

router.post('/validate/pin', RoleMiddleware.validateRegisteredUser, function (req, res, next) {
  UserController.validatePin(req.user, req.body.pin)
    .then(response => res.json(response))
    .catch(err => next(err))
});

router.put('/password', RoleMiddleware.validateRegisteredUser, function (req, res, next) {
  UserController.updatePassword(req.user, req.body.password)
    .then(response => res.json(response))
    .catch(err => next(err))
});

router.put('/forgot-password/password', function (req, res, next) {
  UserController.updatePassword(req.body.userId, req.body.password)
    .then(response => res.json(response))
    .catch(err => next(err))
});

router.put('/pin', RoleMiddleware.validateRegisteredUser, function (req, res, next) {
  UserController.updatePin(req.user, req.body.pin)
    .then(response => res.json(response))
    .catch(err => next(err))
});

router.put('/phone', RoleMiddleware.validateRegisteredUser, function (req, res, next) {
  UserController.updatePhone(req.user, req.body.phone)
    .then(response => res.json(response))
    .catch(err => next(err))
});

router.post('/forgot-password', function (req, res, next) {
  UserController.forgotPassword(req.body.email)
    .then(response => res.json(response))
    .catch(err => next(err))
});

router.get('/email-verification/:token', function (req, res, next) {
  UserController.updateValidationToken(req.params.token)
    .then(response => res.json(response))
    .catch(err => next(err))
});

router.get('/validate/password-token/:token', function (req, res, next) {
  UserController.validatePasswordToken(req.params.token)
    .then(response => res.json(response))
    .catch(err => next(err))
});

module.exports = router;
