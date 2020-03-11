const express = require('express');
const router = express.Router();

const postController = require('../controllers/postController');
const authController = require('../controllers/authController');

router.get('/category/:categoryId', postController.getPostsByCategory);

router
  .route('/')
  .get(postController.getAllPosts)
  .post(authController.protect, postController.createPost);

router.route('/:postId').get(authController.protect, postController.getPost);

module.exports = router;
