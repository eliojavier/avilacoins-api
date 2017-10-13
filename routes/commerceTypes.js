let express = require('express');
let router = express.Router();
let CommerceTypeController = require('../controllers/commerceTypeController');

router.get('/', function (req, res, next) {
  CommerceTypeController.findAll()
    .then(response => res.json(response))
    .catch(err => next(err))
});

module.exports = router;