let express = require('express');
let router = express.Router();
let TransactionController = require('../../controllers/transactionController');
let RoleMiddleware = require('../../middlewares/roleMiddleware');

router.get('/withdraws/status/:status', RoleMiddleware.validateAdminRole, function (req, res, next) {
  TransactionController.findWithdrawsByStatus(req.params.status)
    .then(response => res.json(response))
    .catch(err => next(err))
});

router.get('/withdraws/status/:status', RoleMiddleware.validateAdminRole, function (req, res, next) {
  TransactionController.findWithdrawsByStatus(req.params.status)
    .then(response => res.json(response))
    .catch(err => next(err))
});

router.put('/withdraws', RoleMiddleware.validateAdminRole, function (req, res, next) {
  TransactionController.approveWithdrawRequest(req.body)
    .then(response => res.json(response))
    .catch(err => next(err))
});

module.exports = router;