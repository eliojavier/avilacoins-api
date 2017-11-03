let express = require('express');
let router = express.Router();
let contactController = require('../controllers/contactController');
let RoleMiddleware = require('../middlewares/roleMiddleware');

router.get('/users', RoleMiddleware.validateUserRole, function (req, res, next) {
  contactController.findContactsByOwnerId(req.user)
    .then(response => res.json(response))
    .catch(err => next(err))
});

module.exports = router;