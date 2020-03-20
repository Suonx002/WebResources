const AppError = require('../utils/appError');
const catchAsync = require('../utils/catchAsync');

const Post = require('../models/postModel');
const Comment = require('../models/commentModel');

// @desc      Create Post
// @route     POST /api/v1/posts
// @access    Private

exports.createPost = catchAsync(async (req, res, next) => {
  req.body.user = req.user.id;
  const post = await Post.create(req.body);

  res.status(200).json({
    status: 'success',
    post
  });
});

// @desc      Get Posts By Category
// @route     GET /api/v1/posts/category/:categoryId
// @access    Public

exports.getPostsByCategory = catchAsync(async (req, res, next) => {
  const posts = await Post.find({ category: req.params.categoryId }).sort(
    req.query.sort
  );

  if (!posts) {
    return next(new AppError('There are no posts with this search', 400));
  }

  res.status(200).json({
    status: 'success',
    posts
  });
});

// @desc      Get All Post
// @route     GET /api/v1/posts
// @access    Public

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

// @desc      Get Post By ID
// @route     GET /api/v1/posts/:postId
// @access    Public

exports.getPost = catchAsync(async (req, res, next) => {
  const post = await Post.findById(req.params.postId).populate({
    path: 'user',
    select: 'role _id name email avatar'
  });

  if (!post) {
    return next(new AppError('No post found with this ID.', 400));
  }

  res.status(200).json({
    status: 'success',
    post
  });
});

// @desc      Update Post
// @route     PATCH /api/v1/posts/:postId
// @access    Private

exports.editPost = catchAsync(async (req, res, next) => {
  const { title, summary, tags, category, link } = req.body;

  let post = await Post.findById(req.params.postId);

  // const post = await Post.findByIdAndUpdate(req.params.postId, req.body);

  if (!post) {
    return next(new AppError('No post found with this ID.', 404));
  }

  // console.log(req.user);
  // console.log(post);

  // console.log(post.user !== req.user._id);

  if (post.user.toString() !== req.user._id.toString()) {
    return next(new AppError('You are not allow to edit this post', 401));
  }

  // const postFields = {};

  // if (title) postFields.title = title;
  // if (summary) postFields.summary = summary;
  // if (tags) postFields.tags = tags;
  // if (category) postFields.category = category;
  // if (link) postFields.link = link;

  post = await Post.findByIdAndUpdate(req.params.postId, req.body, {
    new: true,
    runValidators: true
  });

  res.status(200).json({
    status: 'success',
    post
  });
});

// @desc      Delete Post By ID
// @route     DELETE /api/v1/posts/:postId
// @access    Private

exports.deletePost = catchAsync(async (req, res, next) => {
  let post = await Post.findById(req.params.postId);

  if (!post) {
    return next(new AppError('No post found with this ID.', 404));
  }

  if (post.user.toString() !== req.user._id.toString()) {
    return next(new AppError('You are not allow to delete this post', 401));
  }

  if (post.comments.length > 0) {
    await Promise.all(
      post.comments.map(async comment => {
        await Comment.findByIdAndDelete(comment);
      })
    );
  }

  await Post.findByIdAndDelete(req.params.postId);

  res.status(200).json({
    status: 'success',
    post: 'Post successfully deleted'
  });
});

// @desc      Post Like
// @route     PATCH /api/v1/posts/like/:postId
// @access    Private

exports.like = catchAsync(async (req, res, next) => {
  const post = await Post.findOne({ _id: req.params.postId });

  // check if the post has already been liked
  if (post.likes.filter(like => like.toString() === req.user.id).length > 0) {
    return next(new AppError('Post already liked by you'));
  }

  post.likes.unshift(req.user.id);
  await post.save();

  res.status(200).json({
    status: 'success',
    data: 'Successfully like this post!'
  });
});

// @desc      Post Dislike
// @route     PATCH /api/v1/posts/dislike/:postId
// @access    Private

exports.dislike = catchAsync(async (req, res, next) => {
  const post = await Post.findOne({ _id: req.params.postId });

  // Check if the post has already been liked
  if (post.likes.filter(like => like.toString() === req.user.id).length === 0) {
    return next(new AppError('Post has not yet been liked by you'), 400);
  }

  // get remove index
  const removeIndex = post.likes.indexOf(req.user.id);
  // console.log(removeIndex);

  post.likes.splice(removeIndex, 1);

  await post.save();

  res.status(200).json({
    status: 'success',
    data: 'Post has been unliked'
  });
});
