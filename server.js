const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config({ path: './config.env' });
const app = express();

const authRouter = require('./routes/authRouter');

// database
const connectDB = async () => {
  const database = process.env.DATABASE.replace(
    '<password>',
    process.env.DATABASE_PASSWORD
  );

  try {
    await mongoose.connect(database, {
      useNewUrlParser: true,
      useCreateIndex: true,
      useFindAndModify: false,
      useUnifiedTopology: true
    });
    console.log('Database connection successfully!');
  } catch (err) {
    console.log('Database connection failed...');
  }
};
connectDB();

// middlewares
// bodyparser for req.body
app.use(express.json());

// routes
app.use('/api/v1/auth', authRouter);

// server listener
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
