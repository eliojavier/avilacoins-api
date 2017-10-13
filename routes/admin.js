let express = require('express');
let router = express.Router();
let AdminController = require('../controllers/adminController');

router.post('/login', function (req, res, next) {
  AdminController.login(req.body.email, req.body.password)
    .then(response => res.json(response))
    .catch(err => next(err))
});

module.exports = router;