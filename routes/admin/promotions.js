let express = require('express');
let router = express.Router();
let PromotionController = require('../../controllers/promotionController');
let RoleMiddleware = require('../../middlewares/roleMiddleware');

router.get('/', RoleMiddleware.validateAdminRole, function (req, res, next) {
  PromotionController.findAll()
    .then(response => res.json(response))
    .catch(err => next(err))
});

router.get('/:id', RoleMiddleware.validateAdminRole, function (req, res, next) {
  PromotionController.findById(req.params.id)
    .then(response => res.json(response))
    .catch(err => next(err))
});

module.exports = router;