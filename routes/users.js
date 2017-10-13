let express = require('express');
let router = express.Router();
let isAdmin = require('../middlewares/is_admin');
let UserController = require('../controllers/userController');
let validate = require('express-validation');
let userValidator = require('../middlewares/param_validations/user');

// app.use(isAdmin);

/* GET users listing. */
// router.get('/', isAdmin.isAdmin, function(req, res, next) {
//   res.send('respond with a resouffrsgces');
// });

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

router.get('/email-verification/:token', function (req, res, next) {
  UserController.updateValidationToken(req.params.token)
    .then(response => res.json(response))
    .catch(err => next(err))
});

module.exports = router;
