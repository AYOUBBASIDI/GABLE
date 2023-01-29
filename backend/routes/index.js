//set routes here
const router = require('express').Router();
const auth = require('./auth');
const register = require('./auth/register');
const refresh = require('./refresh');
const logout = require('./logout');

router.use('/auth', auth);
router.use('/register', register);
router.use('/refresh', refresh);
router.use('/logout', logout);

module.exports = router;
