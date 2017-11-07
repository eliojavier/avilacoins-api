let express = require('express');
let router = express.Router();
let TransactionController = require('../controllers/transactionController');
let RoleMiddleware = require('../middlewares/roleMiddleware');

router.post('/purchases', RoleMiddleware.validateUserRole, function (req, res, next) {
  TransactionController.makePurchase(req.user, req.body)
    .then(response => res.json(response))
    .catch(err => next(err))
});

router.post('/withdraws', RoleMiddleware.validateUserRole, function (req, res, next) {
  TransactionController.makeWithdrawRequest(req.user, req.body)
    .then(response => res.json(response))
    .catch(err => next(err))
});

router.get('/withdraws/:id', RoleMiddleware.validateUserRole, function (req, res, next) {
  TransactionController.findUserWithdrawById(req.user, req.params.id)
    .then(response => res.json(response))
    .catch(err => next(err))
});

router.get('/withdraws/page/:page', RoleMiddleware.validateUserRole, function (req, res, next) {
  TransactionController.findUserWithdraws(req.user, req.params.page)
    .then(response => res.json(response))
    .catch(err => next(err))
});

router.get('/withdraws/year/:year/page/:page', RoleMiddleware.validateUserRole, function (req, res, next) {
  TransactionController.findUserWithdrawsByYear(req.user, req.params.year, req.params.page)
    .then(response => res.json(response))
    .catch(err => next(err))
});

router.get('/withdraws/month/:month/page/:page', RoleMiddleware.validateUserRole, function (req, res, next) {
  TransactionController.findUserWithdrawsByMonth(req.user, req.params.month, req.params.page)
    .then(response => res.json(response))
    .catch(err => next(err))
});

router.get('/withdraws/last-three-months/page/:page', RoleMiddleware.validateUserRole, function (req, res, next) {
  TransactionController.findUserWithdrawsByLastThreeMonths(req.user, req.params.page)
    .then(response => res.json(response))
    .catch(err => next(err))
});

router.post('/withdraws/range-date/page/:page', RoleMiddleware.validateUserRole, function (req, res, next) {
  TransactionController.findUserWithdrawsByDateRange(req.user, req.body, req.params.page)
    .then(response => res.json(response))
    .catch(err => next(err))
});

router.get('/purchases/:id', RoleMiddleware.validateUserRole, function (req, res, next) {
  TransactionController.findUserPurchaseById(req.user, req.params.id)
    .then(response => res.json(response))
    .catch(err => next(err))
});

router.get('/purchases/page/:page', RoleMiddleware.validateUserRole, function (req, res, next) {
  TransactionController.findUserPurchases(req.user, req.params.page)
    .then(response => res.json(response))
    .catch(err => next(err))
});

router.get('/purchases/year/:year/page/:page', RoleMiddleware.validateUserRole, function (req, res, next) {
  TransactionController.findUserPurchasesByYear(req.user, req.params.year, req.params.page)
    .then(response => res.json(response))
    .catch(err => next(err))
});

router.get('/purchases/month/:month/page/:page', RoleMiddleware.validateUserRole, function (req, res, next) {
  TransactionController.findUserPurchasesByMonth(req.user, req.params.month, req.params.page)
    .then(response => res.json(response))
    .catch(err => next(err))
});

router.get('/purchases/last-three-months/page/:page', RoleMiddleware.validateUserRole, function (req, res, next) {
  TransactionController.findUserPurchasesByLastThreeMonths(req.user, req.params.page)
    .then(response => res.json(response))
    .catch(err => next(err))
});

router.post('/purchases/range-date/page/:page', RoleMiddleware.validateUserRole, function (req, res, next) {
  TransactionController.findUserPurchasesByDateRange(req.user, req.body, req.params.page)
    .then(response => res.json(response))
    .catch(err => next(err))
});













module.exports = router;