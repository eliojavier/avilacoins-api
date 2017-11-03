let express = require('express');
let router = express.Router();
let PromotionController = require('../controllers/promotionController');
let RoleMiddleware = require('../middlewares/roleMiddleware');

router.post('/', RoleMiddleware.validateCommerceType, function (req, res, next) {
  PromotionController.create(req.user, req.body)
    .then(response => res.json(response))
    .catch(err => next(err))
});

router.get('/', RoleMiddleware.validateCommerceType, function (req, res, next) {
  PromotionController.findUserPromotions(req.user)
    .then(response => res.json(response))
    .catch(err => next(err))
});

router.get('/:id', RoleMiddleware.validateCommerceType, function (req, res, next) {
  PromotionController.findUserPromotionById(req.user, req.params.id)
    .then(response => res.json(response))
    .catch(err => next(err))
});

router.put('/:id', RoleMiddleware.validateCommerceType, function (req, res, next) {
  PromotionController.update(req.params.id, req.body, req.user)
    .then(response => res.json(response))
    .catch(err => next(err))
});

router.get('/validate/name/:name', RoleMiddleware.validateCommerceType, function (req, res, next) {
  PromotionController.validateName(req.user, req.params.name)
    .then(response => res.json(response))
    .catch(err => next(err))
});

router.post('/target', RoleMiddleware.validateCommerceType, function (req, res, next) {
  PromotionController.target(req.body)
    .then(response => res.json(response))
    .catch(err => next(err))
});

router.put('/status/:id', RoleMiddleware.validateCommerceOrAdminType, function (req, res, next) {
  PromotionController.updateStatus(req.body, req.params.id)
    .then(response => res.json(response))
    .catch(err => next(err))
});

module.exports = router;