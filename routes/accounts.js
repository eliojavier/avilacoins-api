let express = require('express');
let router = express.Router();
let AccountController = require('../controllers/accountController');
let RoleMiddleware = require('../middlewares/roleMiddleware');

router.get('/', RoleMiddleware.validateUserRole, function (req, res, next) {
  AccountController.findByUserId(req.user)
    .then(response => res.json(response))
    .catch(err => next(err))
});

module.exports = router;