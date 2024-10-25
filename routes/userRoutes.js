
const express = require('express');
const { createUser, getUser, updateUser } = require('../controllers/userController');
const basicAuth = require('../middleware/basicAuth');

const router = express.Router();

router.post('/user', createUser); // Create a new user
router.get('/user/me', basicAuth, getUser); // Get the current user info
router.put('/user/me', basicAuth, updateUser); // Update the current user info

module.exports = router;
