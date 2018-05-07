let express = require('express');
let router = express.Router();
let TransferController = require('../controllers/transferController');
let RoleMiddleware = require('../middlewares/roleMiddleware');

router.post('/', RoleMiddleware.validateUserRole, function (req, res, next) {
  TransferController.makeTransfer(req.user, req.body)
    .then(response => res.json(response))
    .catch(err => next(err))
});

router.get('/page/:page', RoleMiddleware.validateUserRole, function (req, res, next) {
  TransferController.findByUserId(req.user, req.params.page)
    .then(response => res.json(response))
    .catch(err => next(err))
});

router.get('/year/:year/page/:page', RoleMiddleware.validateUserRole, function (req, res, next) {
  TransferController.findByUserIdAndYear(req.user, req.params.year, req.params.page)
    .then(response => res.json(response))
    .catch(err => next(err))
});

router.get('/month/:month/page/:page', RoleMiddleware.validateUserRole, function (req, res, next) {
  TransferController.findByUserIdAndMonth(req.user, req.params.month, req.params.page)
    .then(response => res.json(response))
    .catch(err => next(err))
});

router.get('/:id', RoleMiddleware.validateUserRole, function (req, res, next) {
  TransferController.findById(req.params.id)
    .then(response => res.json(response))
    .catch(err => next(err))
});

router.get('/last-three-months/page/:page', RoleMiddleware.validateUserRole, function (req, res, next) {
  TransferController.findByUserIdAndLastThreeMonths(req.user, req.params.page)
    .then(response => res.json(response))
    .catch(err => next(err))
});

module.exports = router;
