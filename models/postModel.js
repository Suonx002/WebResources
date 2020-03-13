const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Please provide a title']
  },
  summary: {
    type: String,
    required: [true, 'Please provide a summary'],
    min: [120, 'Must be at least 120 characters long']
  },
  tags: [
    {
      type: String,
      enum: ['free', 'beginner', 'paid', 'video', 'book'],
      required: [true, 'Please provide a tag'],
      default: 'free'
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
    required: [true, 'Please provide a tutorial link']
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
