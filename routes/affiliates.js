let express = require('express');
let router = express.Router();
let AffiliateController = require('../controllers/affiliateController');
let RoleMiddleware = require('../middlewares/roleMiddleware');

router.get('/', function (req, res, next) {
  AffiliateController.findAll()
    .then(response => res.json(response))
    .catch(err => next(err))
});


router.get('/:id', RoleMiddleware.validateRegisteredUser, function (req, res, next) {
  AffiliateController.findById(req.params.id)
    .then(response => res.json(response))
    .catch(err => next(err))
});

router.post('/search-by-categories-and-states', RoleMiddleware.validateUserRole, function (req, res, next) {
  AffiliateController.findByCategoriesIdAndStatesId(req.body.categoriesId, req.body.statesId)
    .then(response => res.json(response))
    .catch(err => next(err))
});

router.post('/search-by-states', RoleMiddleware.validateUserRole, function (req, res, next) {
  AffiliateController.findByStatesId(req.body.statesId)
    .then(response => res.json(response))
    .catch(err => next(err))
});

router.post('/search-by-categories', RoleMiddleware.validateUserRole, function (req, res, next) {
  AffiliateController.findByCategoriesId(req.body.categoriesId)
    .then(response => res.json(response))
    .catch(err => next(err))
});

// router.get('/', function (req, res, next) {
//   AffiliateController.findAll()
//     .then(response => res.json(response))
//     .catch(err => next(err))
// });

module.exports = router;
