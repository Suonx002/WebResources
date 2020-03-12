const AppError = require('../utils/appError');
const catchAsync = require('../utils/catchAsync');

const Post = require('../models/postModel');

exports.createPost = catchAsync(async (req, res, next) => {
  if (!req.tags) {
    return next(new AppError('Please provide a tag'), 400);
  }

  const post = await Post.create(req.body);

  res.status(200).json({
    status: 'success',
    post
  });
});

exports.getPostsByCategory = catchAsync(async (req, res, next) => {
  const posts = await Post.find({ category: req.params.categoryId });

  if (!posts) {
    return next(new AppError('There are no posts with this search', 400));
  }

  res.status(200).json({
    status: 'success',
    posts
  });
});

exports.getPost = catchAsync(async (req, res, next) => {
  const post = await Post.findById(req.params.postId).populate({
    path: 'user',
    select: 'role _id name email'
  });

  if (!post) {
    return next(new AppError('No post found with this ID.', 400));
  }

  res.status(200).json({
    status: 'success',
    post
  });
});

exports.getAllPosts = catchAsync(async (req, res, next) => {
  const posts = await Post.find();

  if (!posts) {
    return next(new AppError('There are no posts created...', 400));
  }

  res.status(200).json({
    status: 'success',
    posts
  });
});
