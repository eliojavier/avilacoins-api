let express = require('express');
let router = express.Router();
let AffiliateController = require('../../controllers/affiliateController');
let RoleMiddleware = require('../../middlewares/roleMiddleware');

router.get('/', RoleMiddleware.validateAdminRole, function (req, res, next) {
  AffiliateController.findAllAffiliates()
    .then(response => res.json(response))
    .catch(err => next(err))
});

module.exports = router;