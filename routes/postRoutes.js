const express = require('express');
const router = express.Router();

const postController = require('../controllers/postController');
const authController = require('../controllers/authController');

router.get('/category/:categoryId', postController.getPostsByCategory);

router
  .route('/')
  .get(postController.getAllPosts)
  .post(authController.protect, postController.createPost);

router
  .route('/:postId')
  .get(postController.getPost)
  .patch(authController.protect, postController.editPost);

router.patch('/like/:postId', authController.protect, postController.like);

router.patch(
  '/dislike/:postId',
  authController.protect,
  postController.dislike
);

module.exports = router;
