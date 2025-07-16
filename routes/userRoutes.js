const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

// Create a new user (helper route)
router.post('/', userController.createUser);

// Get user details (optional)
router.get('/:userId', userController.getUserDetails);

module.exports = router;
