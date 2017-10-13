let express = require('express');
let router = express.Router();
let LocationController = require('../controllers/locationController');

router.get('/countries', function (req, res, next) {
  LocationController.findAllCountries()
    .then(response => res.json(response))
    .catch(err => next(err))
});

router.get('/countries/:country_id/states', function (req, res, next) {
  LocationController.findAllStatesByCountryId(req.params.country_id)
    .then(response => res.json(response))
    .catch(err => next(err))
});

router.get('/states/:state_id/cities', function (req, res, next) {
  LocationController.findAllCitiesByStateId(req.params.state_id)
    .then(response => res.json(response))
    .catch(err => next(err))
});

router.get('/cities/:city_id/zones', function (req, res, next) {
  LocationController.findAllZonesByCityId(req.params.city_id)
    .then(response => res.json(response))
    .catch(err => next(err))
});

module.exports = router;