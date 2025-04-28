const express = require('express');
const router = express.Router();
const auth = require('../controllers/authController');
const isAuth = require('../middleware/isAuthenticated'); 

router.get('/login', auth.loginForm);

router.post('/login', auth.login);

router.get('/logout', auth.logout);

module.exports = router;
