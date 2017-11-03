let express = require('express');
let router = express.Router();
let AdminController = require('../controllers/adminController');
let RoleMiddleware = require('../middlewares/roleMiddleware');

router.post('/login', function (req, res, next) {
  AdminController.login(req.body.email, req.body.password)
    .then(response => res.json(response))
    .catch(err => next(err))
});

router.post('/register', RoleMiddleware.validateSuperAdminRole, function (req, res, next) {
  AdminController.create(req.body)
    .then(response => res.json(response))
    .catch(err => next(err))
});

router.get('/', RoleMiddleware.validateSuperAdminRole ,function (req, res, next) {
  AdminController.findAll()
    .then(response => res.json(response))
    .catch(err => next(err))
});

router.put('/status', RoleMiddleware.validateSuperAdminRole, function (req, res, next) {
  AdminController.updateStatus(req.body.id, req.body.status)
    .then(response => res.json(response))
    .catch(err => next(err))
});

module.exports = router;