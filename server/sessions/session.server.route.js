const router = require('express').Router();
const session = require('./session.server');

// Get Details from given Youtube Stream ID
router.post('/broadcast', session.broadcast);
router.get('/search/:userId/:keyword', session.search);

module.exports = router;