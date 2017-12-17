let express = require('express');
let router = express.Router();
let BankAccountController = require('../controllers/bankAccountController');
let RoleMiddleware = require('../middlewares/roleMiddleware');

router.post('/register', RoleMiddleware.validateUserRole, function (req, res, next) {
  BankAccountController.create(req.user, req.body)
    .then(response => res.json(response))
    .catch(err => next(err))
});

router.get('/', RoleMiddleware.validateUserRole, function (req, res, next) {
  BankAccountController.findBankAccountsByUserId(req.user)
    .then(response => res.json(response))
    .catch(err => next(err))
});

router.delete('/:id', RoleMiddleware.validateUserRole, function (req, res, next) {
  BankAccountController.destroy(req.user, req.params.id)
    .then(response => res.json(response))
    .catch(err => next(err))
});

module.exports = router;
