const fs = require('fs');

const AppError = require('../utils/appError');
const catchAsync = require('../utils/catchAsync');

const User = require('../models/userModel');

const cloudinaryController = require('./cloudinaryController');

exports.getMe = catchAsync(async (req, res, next) => {
  const user = await User.findById(req.user.id);

  res.status(200).json({
    status: 'success',
    user
  });
});

exports.uploadImage = catchAsync(async (req, res, next) => {
  const user = await User.findById(req.user.id);
  // console.log(user);

  if (!user) {
    return next(new AppError('Please log in to access this route', 401));
  }

  const uploader = async path =>
    await cloudinaryController.uploads(path, 'WebResources');

  const { path } = req.file;

  // console.log(path);
  // console.log(req.file);

  const url = await uploader(path);

  // console.log(url);

  await User.findByIdAndUpdate(
    req.user.id,
    { avatar: url.url },
    { new: true, runValidators: true }
  );

  // console.log(user);
  fs.unlinkSync(path);

  res.status(200).json({
    status: 'success',
    url
  });
});
