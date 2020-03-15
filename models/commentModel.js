const mongoose = require('mongoose');

const commentSchema = new mongoose.Schema({
  comment: {
    type: String,
    required: [true, 'Please provide a comment'],
    minlength: [20, 'Comment must be at least 20 characters ']
  },
  user: {
    type: mongoose.Schema.ObjectId,
    ref: 'User',
    required: [true, 'Comment must belong to a user']
  },
  post: {
    type: mongoose.Schema.ObjectId,
    ref: 'Post',
    required: [true, 'Comment must belong to a post']
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

// comment middlewares
// commentSchema.pre('save', function(next) {

//   next();
// });

commentSchema.pre(/^find/, function(next) {
  this.populate({
    path: 'user',
    select: 'name avatar'
  });

  this.populate({
    path: 'post',
    select: 'title summary'
  });

  next();
});

module.exports = mongoose.model('Comment', commentSchema);
