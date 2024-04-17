const express = require('express');
const router = express.Router();
const UsersController = require('../controllers/usersController');

router.post('/signup', UsersController.createUser);

module.exports = router;