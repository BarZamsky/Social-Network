const express = require('express'),
    router = express.Router();

router.use('/auth', require('./auth'));
router.use('/profile', require('./profile'));
router.use('/avatar', require('./upload'));

module.exports = router;