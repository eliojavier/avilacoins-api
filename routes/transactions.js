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



module.exports = router;