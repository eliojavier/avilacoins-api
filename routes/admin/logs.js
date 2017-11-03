let express = require('express');
let router = express.Router();
let LogController = require('../../controllers/logController');
let RoleMiddleware = require('../../middlewares/roleMiddleware');

router.get('/login', RoleMiddleware.validateAdminRole, function (req, res, next) {
  LogController.findLoginLogs()
    .then(response => res.json(response))
    .catch(err => next(err))
});

router.get('/register', RoleMiddleware.validateAdminRole, function (req, res, next) {
  LogController.findRegisterLogs()
    .then(response => res.json(response))
    .catch(err => next(err))
});

router.get('/transfers', RoleMiddleware.validateAdminRole, function (req, res, next) {
  LogController.findTransfersLogs()
    .then(response => res.json(response))
    .catch(err => next(err))
});

router.get('/purchases', RoleMiddleware.validateAdminRole, function (req, res, next) {
  LogController.findPurchasesLogs()
    .then(response => res.json(response))
    .catch(err => next(err))
});

router.get('/withdraws', RoleMiddleware.validateAdminRole, function (req, res, next) {
  LogController.findWithdrawsLogs()
    .then(response => res.json(response))
    .catch(err => next(err))
});

module.exports = router;
