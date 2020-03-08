const express = require('express');
const router = express.Router();
const usersControl = require('../controls/users');

router.post('/signin', usersControl.signin);
router.post('/signup', usersControl.signup);
router.get('/getmessages/:userEmail', usersControl.getmessages);

module.exports = router;