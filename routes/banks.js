let express = require('express');
let router = express.Router();
let BankController = require('../controllers/bankController');

router.get('/', function (req, res, next) {
  BankController.findAll()
    .then(response => res.json(response))
    .catch(err => next(err))
});

module.exports = router;