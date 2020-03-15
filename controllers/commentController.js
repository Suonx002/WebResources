const AppError = require('../utils/appError');
const catchAsync = require('../utils/catchAsync');

const Comment = require('../models/commentModel');
const Post = require('../models/postModel');
const User = require('../models/userModel');

exports.createComment = catchAsync(async (req, res, next) => {
  const user = await User.findById(req.user.id);
  const post = await Post.findById(req.params.postId);

  if (!post) {
    return next(new AppError('There is no post with this ID', 400));
  }

  if (!user) {
    return next(new AppError('Please log in to post this comment', 400));
  }

  let comment = await Comment.create({
    comment: req.body.comment,
    user: user.id,
    post: post.id
  });

  comment = await comment
    .populate({
      path: 'user',
      select: 'name avatar'
    })
    .populate({
      path: 'post',
      select: 'title summary'
    })
    .execPopulate();

  // add comment id to post
  post.comments.push(comment.id);
  await post.save();

  res.status(201).json({
    status: 'success',
    comment
  });
});

exports.getCommentsByPostId = catchAsync(async (req, res, next) => {
  const comments = await Comment.find({ post: req.params.postId });
  // .populate({
  //   path: 'user',
  //   select: 'name avatar'
  // })
  // .populate({
  //   path: 'post',
  //   select: 'title summary'
  // });

  if (!comments) {
    return next(new AppError('No comments for this post ID', 400));
  }

  res.status(200).json({
    status: 'success',
    comments
  });
});

exports.editComment = catchAsync(async (req, res, next) => {
  let comment = await Comment.findById(req.params.commentId);
  const post = await Post.findById(req.params.postId);

  if (!comment || !post) {
    return next(new AppError('There are no post or comment with this ID', 400));
  }

  // console.log(req.user.id === comment.user.toString());

  if (req.user.id !== comment.user.id) {
    return next(new AppError('You are not allow to edit this comment', 401));
  }

  comment = await Comment.findByIdAndUpdate(
    req.params.commentId,
    { comment: req.body.comment },
    {
      new: true,
      runValidators: true
    }
  );

  res.status(200).json({
    status: 'success',
    comment
  });
});

exports.deleteComment = catchAsync(async (req, res, next) => {
  const post = await Post.findById(req.params.postId);
  const comment = await Comment.findById(req.params.commentId);

  if (!comment || !post) {
    return next(new AppError('There are no post or comment with this ID', 400));
  }

  if (req.user.id !== comment.user.id) {
    return next(new AppError('You are not allow to delete this comment', 401));
  }

  const removeIndex = post.comments.findIndex(
    commentID => commentID.toString() === req.params.commentId
  );

  console.log(removeIndex);

  post.comments.splice(removeIndex, 1);
  // console.log(post);
  await post.save();

  await Comment.findByIdAndDelete(req.params.commentId);

  res.status(200).json({
    status: 'success',
    data: 'Comment successfully deleted'
  });
});
