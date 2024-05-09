const express = require('express');
const router = express.Router();
const UsersController = require('../controllers/usersController');

router.post('/signup', UsersController.createUser);

router.post('/login', UsersController.loginUser);

router.get('/getUserById/:userId', UsersController.getUserById);

router.patch('/updateUser/:userId', UsersController.updateUser);

router.post('/updatePassword/:userId', UsersController.checkOldPassword);

router.delete('/deleteUser/:userId', UsersController.deleteUser);

module.exports = router;