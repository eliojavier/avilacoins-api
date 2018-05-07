let express = require('express');
let router = express.Router();
let ContactController = require('../controllers/contactController');
let RoleMiddleware = require('../middlewares/roleMiddleware');

router.get('/', RoleMiddleware.validateUserRole, function (req, res, next) {
  ContactController.findContactsByOwnerId(req.user)
    .then(response => res.json(response))
    .catch(err => next(err))
});

router.get('/:username', RoleMiddleware.validateUserRole, function (req, res, next) {
  ContactController.findContactByUsername(req.user, req.params.username)
    .then(response => res.json(response))
    .catch(err => next(err))
});

router.post('/', RoleMiddleware.validateUserRole, function (req, res, next) {
  ContactController.create(req.user, req.body)
    .then(response => res.json(response))
    .catch(err => next(err))
});

router.delete('/:id', RoleMiddleware.validateUserRole, function (req, res, next) {
  ContactController.delete(req.params.id, req.user)
    .then(response => res.json(response))
    .catch(err => next(err))
});

module.exports = router;