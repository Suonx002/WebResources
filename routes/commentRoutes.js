const express = require('express');
const router = express.Router();

const commentController = require('../controllers/commentController');
const authController = require('../controllers/authController');

router
  .route('/:postId')
  .post(authController.protect, commentController.createComment)
  .get(commentController.getCommentsByPostId);

router
  .route('/:postId/:commentId')
  .patch(authController.protect, commentController.editComment)
  .delete(authController.protect, commentController.deleteComment);

module.exports = router;
