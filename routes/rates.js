let express = require('express');
let router = express.Router();
let RateController = require('../controllers/rateController');
let RoleMiddleware = require('../middlewares/roleMiddleware');

router.get('/', RoleMiddleware.validateUserRole, function (req, res, next) {
  RateController.findRatesByLocationId()
    .then(response => res.json(response))
    .catch(err => next(err))
});

module.exports = router;