const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config({ path: './config.env' });
const app = express();

const authRouter = require('./routes/authRouter');

const globalErrorHandler = require('./controllers/errorController');

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

// catach errors (all verbs: get post put patch ,etc.)
app.all('*', (req, res, next) => {
  new new AppError(`Can't find ${req.originalUrl} on this server!`, 400)();
});

// Global express handling erros middleware (error controller)
app.use(globalErrorHandler);

// server listener
const PORT = process.env.PORT || 5000;
const server = app.listen(PORT, () => {
  console.log(`App running on port ${PORT}...`);
});

// Uncaught exception error
process.on('uncaughtException', err => {
  console.log('UNCAUGHT EXCEPTION!!!! Shutting down....');
  console.log(err.name, err.message);
  // 1 uncaught, 0 success
  process.exit(1);
});

// UnhandledRejection error
process.on('unhandledRejection', err => {
  console.log(err.name, err.message);
  console.log('UNHANDLER REJECTION!!!! Shutting down....');
  server.close(() => {
    // 1 uncaught, 0 success
    process.exit(1);
  });
});

// dyno heroku sig term signal
process.on('SIGTERM', () => {
  console.log('DIGTERM RECEIVED. Shutting down gracefully');

  server.close(() => {
    console.log('Process terminated');
  });
});
