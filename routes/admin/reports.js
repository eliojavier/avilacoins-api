let express = require('express');
let router = express.Router();
let ReportController = require('../../controllers/reportController');
let RoleMiddleware = require('../../middlewares/roleMiddleware');

router.get('/number-of-affiliates-by-type', RoleMiddleware.validateAdminRole, function (req, res, next) {
  ReportController.NumberOfAffiliatesByType()
    .then(response => res.json(response))
    .catch(err => next(err))
});

router.get('/ranking-of-users-by-coins-transfers', RoleMiddleware.validateAdminRole, function (req, res, next) {
  ReportController.rankingOfUsersByCoinsTransfers()
    .then(response => res.json(response))
    .catch(err => next(err))
});

router.get('/ranking-of-users-by-transfers-quantity', RoleMiddleware.validateAdminRole, function (req, res, next) {
  ReportController.rankingOfUserByTransfersQuantity()
    .then(response => res.json(response))
    .catch(err => next(err))
});

router.get('/affiliates-by-type', RoleMiddleware.validateAdminRole, function (req, res, next) {
  ReportController.affiliatesByType()
    .then(response => res.json(response))
    .catch(err => next(err))
});

router.get('/number-of-affiliates-by-state', RoleMiddleware.validateAdminRole, function (req, res, next) {
  ReportController.numberOfAffiliatesByState()
    .then(response => res.json(response))
    .catch(err => next(err))
});

router.get('/affiliates-by-state', RoleMiddleware.validateAdminRole, function (req, res, next) {
  ReportController.commercesByState()
    .then(response => res.json(response))
    .catch(err => next(err))
});

// router.get('/number-of-transactions-by-type', RoleMiddleware.validateAdminRole, function (req, res, next) {
//   ReportController.commercesByState()
//     .then(response => res.json(response))
//     .catch(err => next(err))
// });

router.get('/number-of-transactions-by-type', RoleMiddleware.validateAdminRole, function (req, res, next) {
  ReportController.numberOfTransactionsByType()
    .then(response => res.json(response))
    .catch(err => next(err))
});

module.exports = router;