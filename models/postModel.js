const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Please provide a title'],
    trim: true
  },
  summary: {
    type: String,
    required: [true, 'Please provide a summary'],
    minlength: [120, 'Please provide at least 120 characters'],
    trim: true
  },
  tags: [
    {
      type: String,
      enum: ['free', 'beginner', 'paid', 'video', 'book'],
      required: [true, 'Please provide a tag']
    }
  ],
  category: {
    type: String,
    required: [true, 'Please select a category'],
    enum: [
      'html',
      'css',
      'sass',
      'bootstrap',
      'materialui',
      'javascript',
      'react',
      'angular',
      'vue',
      'graphql',
      'typescript',
      'redux',
      'nodejs',
      'mongodb',
      'postgreesql',
      'php',
      'swift',
      'android',
      'java',
      'git',
      'c++',
      'flutter',
      'python',
      'ruby'
    ],
    lowercase: true
  },
  link: {
    type: String,
    required: [true, 'Please provide a tutorial link'],
    trim: true
  },
  likes: [
    {
      type: mongoose.Schema.ObjectId,
      ref: 'User'
    }
  ],
  user: {
    type: mongoose.Schema.ObjectId,
    ref: 'User',
    required: [true, 'Post must belong to a user']
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

const Post = mongoose.model('Post', postSchema);
module.exports = Post;
