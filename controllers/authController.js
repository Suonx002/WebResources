const AppError = require('../utils/appError');
const catchAsync = require('../utils/catchAsync');

const User = require('../models/userModel');

// @desc      Sign up user
// @route     POST /api/v1/signup
// @access    Public
exports.signup = catchAsync(async (req, res, next) => {
  const { name, email, password, passwordConfirm } = req.body;
  const user = await User.create({ name, email, password, passwordConfirm });

  res.status(201).json({
    status: 'success',
    user
  });
});

// @desc      Login user
// @route     POST /api/v1/login
// @access    Public
exports.login = catchAsync(async (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return next(new AppError('Please provide email and password', 400));
  }

  const user = await User.findOne({ email }).select('+password');

  if (!user || !(await user.correctPassword(password, user.password))) {
    return next(new AppError('Invalid email or password'));
  }

  res.status(200).json({
    status: 'success',
    user
  });
});
