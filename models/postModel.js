const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Please provide a title']
  },
  summary: {
    type: String,
    required: [true, 'Please provide a summary'],
    min: [30, 'Must be at least 30 characters long']
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
      'javascript',
      'react',
      'angular',
      'vue',
      'node',
      'mongo'
    ],
    lowercase: true
  },
  link: {
    type: String,
    required: [true, 'Please provide a tutorial link']
  },
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
