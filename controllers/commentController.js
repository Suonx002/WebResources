const AppError = require('../utils/appError');
const catchAsync = require('../utils/catchAsync');

const Comment = require('../models/commentModel');
const Post = require('../models/postModel');
const User = require('../models/userModel');

exports.createComment = catchAsync(async (req, res, next) => {
  const user = await User.findById(req.user.id);
  const post = await Post.findById(req.params.postId);

  if (!user || !post) {
    return next(new AppError('You are not allow to post comment', 401));
  }

  const comment = await Comment.create({
    text: req.body.text,
    user: user.id,
    post: post.id
  });

  res.status(201).json({
    status: 'success',
    comment
  });
});

exports.getCommentsByPostId = catchAsync(async (req, res, next) => {
  const comments = await Comment.find({ post: req.params.postId });

  if (!comments) {
    return next(new AppError('No comments for this post ID', 400));
  }

  res.status(200).json({
    status: 'success',
    comments
  });
});
