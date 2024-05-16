const router = require('express').Router();
const { auth_controller  } = require('../controller');

router.post('/signup', auth_controller.signup);
// router.post('/login',   authController.login);

module.exports = router;