const express = require('express');
const router = express.Router();
const authService = require('../service/authService');

// Register a new user
router.post('/register', authService.register);

// Login
router.post('/login', authService.login);

module.exports = router;
