const express = require('express');

const router = express.Router();

const authController = require('../controllers/authController');
const userController = require('../controllers/userController');
const multerController = require('../controllers/multerController');

router.post('/register', authController.register);
router.post('/login', authController.login);

// protected
router.use(authController.protect);

router.get('/me', userController.getMe);

router.patch(
  '/uploadImage',
  multerController.single('avatar'),
  userController.resizeUserPhoto,
  userController.uploadImage
);

router.patch('/updatePassword', authController.updatePassword);

module.exports = router;
