const fs = require('fs');
const sharp = require('sharp');

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

exports.resizeUserPhoto = catchAsync(async (req, res, next) => {
  if (!req.file) return next();

  req.file.filename = `user-${req.user.id}-${Date.now()}.jpeg`;

  await sharp(req.file.buffer)
    .resize(250, 250)
    .toFormat('jpeg')
    .jpeg({ quality: 90 })
    .toFile(`uploads/images/${req.file.filename}`);

  req.file.path = `uploads/images/${req.file.filename}`;

  next();
});

// exports.uploadImage = catchAsync(async (req, res, next) => {
//   const user = await User.findById(req.user.id);
//   // console.log(user);

//   if (!user) {
//     return next(new AppError('Please log in to access this route', 401));
//   }

//   const uploader = async path =>
//     await cloudinaryController.uploads(path, 'WebResources');

//   console.log(req.file);
//   const { path } = req.file;

//   // console.log(path);
//   // console.log(req.file);

//   const url = await uploader(path);

//   // console.log(url);

//   await User.findByIdAndUpdate(
//     req.user.id,
//     { avatar: url.url },
//     { new: true, runValidators: true }
//   );

//   // console.log(user);
//   // fs.unlinkSync(path);

//   res.status(200).json({
//     status: 'success',
//     url
//   });
// });

exports.uploadImage = async (req, res, next) => {
  try {
    const user = await User.findById(req.user.id);
    // console.log(user);

    if (!user) {
      return next(new AppError('Please log in to access this route', 401));
    }

    const uploader = async path =>
      await cloudinaryController.uploads(path, 'WebResources');

    console.log(req.file);
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
    // fs.unlinkSync(path);

    res.status(200).json({
      status: 'success',
      url
    });
  } catch (err) {
    console.log(err);
    console.error(err);
    res.status(400).json({
      status: 'fail',
      message: err
    });
  }
};
