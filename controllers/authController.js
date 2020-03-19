const jwt = require('jsonwebtoken');
const crypto = require('crypto');
const { promisify } = require('util');

const AppError = require('../utils/appError');
const catchAsync = require('../utils/catchAsync');

const User = require('../models/userModel');

const signToken = id => {
  const payload = { id };

  const token = jwt.sign(payload, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN
  });

  return token;
};

const createSendToken = (user, statusCode, req, res) => {
  // create token
  const token = signToken(user._id);

  // hide password from response
  user.password = undefined;

  res.status(statusCode).json({
    status: 'success',
    token,
    data: {
      user
    }
  });
};

// @desc      Register user
// @route     POST /api/v1/users/register
// @access    Public
exports.register = catchAsync(async (req, res, next) => {
  const { name, email, password, passwordConfirm } = req.body;
  const newUser = await User.create({ name, email, password, passwordConfirm });

  createSendToken(newUser, 201, req, res);
});

// @desc      Login user
// @route     POST /api/v1/users/login
// @access    Public
exports.login = catchAsync(async (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return next(new AppError('Please provide email and password', 400));
  }

  const user = await User.findOne({ email }).select('+password');

  if (!user || !(await user.correctPassword(password, user.password))) {
    return next(new AppError('Invalid email or password', 401));
  }

  createSendToken(user, 200, req, res);
});

// @desc      Update user
// @route     PATCH /api/v1/users/updatePassword
// @access    Private

exports.updatePassword = catchAsync(async (req, res, next) => {
  const { currentPassword, password, passwordConfirm } = req.body;

  // find user with decoded id from req.user (protected route)
  const user = await User.findById(req.user.id).select('+password');
  // console.log(user);

  if (!(await user.correctPassword(currentPassword, user.password))) {
    return next(
      new AppError('Your current password is wrong. Please try again', 401)
    );
  }

  // update password
  user.password = password;
  user.passwordConfirm = passwordConfirm;
  await user.save();

  // log in user and send token
  createSendToken(user, 200, req, res);
});

// @desc      Protected Middleware
// @route     middleware
// @access    middleware

exports.protect = catchAsync(async (req, res, next) => {
  let token;

  // getting the token and check if it's there
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    token = req.headers.authorization.split(' ')[1];
  }

  if (!token) {
    return next(
      new AppError(
        'You are not logged in to access this. Please log in to get access!',
        401
      )
    );
  }

  const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET);

  // console.log(decoded);

  // check if user still exists
  const currentUser = await User.findById(decoded.id);

  if (!currentUser) {
    return next(
      new AppError('The user belonging to this token is no longer exist', 401)
    );
  }

  req.user = currentUser;

  next();
});

// authorize for certain roles only
exports.authorize = (...roles) => {
  return (req, res, next) => {
    // roles is an array with spread operator: ['admin', 'user', etc]
    if (!roles.includes(req.user.role)) {
      return next(
        new AppError('You do not have permission to perform this action', 403)
      );
    }
    next();
  };
};
