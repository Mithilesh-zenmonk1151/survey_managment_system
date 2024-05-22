const { Router } = require('express');
const { googleAuth, googleAuthCallback, googleAuthRedirect } = require('../controller/auth.controller');

const router = Router();

router.get('/auth/google', googleAuth);
router.get('/auth/google/callback', googleAuthCallback, googleAuthRedirect);

module.exports = router;
