const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');

// POST - register user baru
router.post('/register', authController.register);

// POST - login user (aktifkan nanti setelah fungsi login dibuat di authController.js)
router.post('/login', authController.login);

module.exports = router;