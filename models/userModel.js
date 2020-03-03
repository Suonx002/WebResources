const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please provide your name!'],
    min: 3,
    max: 40
  },
  email: {
    type: String,
    required: [true, 'Please provide your email'],
    unique: true,
    lowercase: true,
    validate: [validator.isEmail, 'Please provide a valid email']
  },

  password: {
    type: String,
    required: [true, 'Please provide a password'],
    select: false
  },
  passwordConfirm: {
    type: String,
    required: [true, 'Please confirm your password'],
    validate: {
      // only work on the .Create & Save
      validator: function(currentElement) {
        return currentElement === this.password;
      },
      message: 'Password does not match'
    }
  },
  role: {
    type: String,
    enum: ['user', 'mod', 'admin'],
    default: 'user'
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

// mongoose middlewares
// "pre" only works on create and save
userSchema.pre('save', async function(next) {
  // only run this if the password is actually modified
  if (!this.isModified) return next();

  //hash password
  this.password = await bcrypt.hash(this.password, 12);

  this.passwordConfirm = undefined;

  next();
});

// instance methods (available on all user documents)
userSchema.methods.correctPassword = async function(
  candiatePassword,
  databasePassword
) {
  // check whether user password matched with database password
  return await bcrypt.compare(candiatePassword, databasePassword);
};

const User = mongoose.model('User', userSchema);
module.exports = User;
