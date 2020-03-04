const express = require('express');

const router = express.Router();

const authController = require('../controllers/authController');

router.post('/signup', authController.signup);
router.post('/login', authController.login);

// protected
router.use(authController.protect);

router.patch('/updatePassword', authController.updatePassword);

module.exports = router;
