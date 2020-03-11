const fs = require('fs');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const connectDB = require('./database/connectDB');

const User = require('./models/userModel');
const Post = require('./models/postModel');

dotenv.config({ path: './config.env' });

// connect db
connectDB();

// read json file
const users = JSON.parse(
  fs.readFileSync(`${__dirname}/_sample_data/data/users.json`, 'utf-8')
);
const posts = JSON.parse(
  fs.readFileSync(`${__dirname}/_sample_data/data/posts.json`, 'utf-8')
);

// import data into DB

const importData = async () => {
  try {
    await User.create(users, { validateBeforeSave: false });
    await Post.create(posts);
    console.log('Data successfully loaded!');
  } catch (err) {
    console.log(err);
  }

  process.exit(1);
};

// DELETE ALL DATA FROM DB
const deleteData = async () => {
  try {
    await User.deleteMany();
    await Post.deleteMany();
    console.log('Data successfully deleted!');
  } catch (err) {
    console.log(err);
  }
  process.exit();
};

if (process.argv[2] === '--import') {
  importData();
} else if (process.argv[2] === '--delete') {
  deleteData();
}
