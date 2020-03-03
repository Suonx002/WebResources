const AppError = require('../utils/appError');

const User = require('../models/userModel');

// @desc      Sign up user
// @route     POST /api/v1/signup
// @access    Public
exports.signup = async (req, res, next) => {
  try {
    const { name, email, password, passwordConfirm } = req.body;
    const user = await User.create({ name, email, password, passwordConfirm });

    res.status(201).json({
      status: 'success',
      user
    });
  } catch (err) {
    return res.status(400).json({
      status: 'fail',
      message: err.message
    });
  }
};

// @desc      Login user
// @route     POST /api/v1/login
// @access    Public

exports.login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return next(new AppError('Please provide email and password', 400));
    }

    const user = await User.findOne({ email }).select('+password');

    if (!user) {
      return next(new AppError('There is no account with this email', 400));
    }

    if (!user || user.password !== password) {
      return next(new AppError('Invalid email or password'));
    }

    res.status(200).json({
      status: 'success',
      user
    });
  } catch (err) {
    return res.status(400).json({
      status: 'fail',
      message: err.message
    });
  }
};
