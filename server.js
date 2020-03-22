const express = require('express');
const path = require('path');
const dotenv = require('dotenv');
const morgan = require('morgan');
const rateLimit = require('express-rate-limit');
const helmet = require('helmet');
const mongoSanitize = require('express-mongo-sanitize');
const xss = require('xss-clean');
const hpp = require('hpp');
const cors = require('cors');
const compression = require('compression');

dotenv.config({ path: './config.env' });
const app = express();
const connectDB = require('./database/connectDB');

const globalErrorHandler = require('./controllers/errorController');
const AppError = require('./utils/appError');

const userRouter = require('./routes/userRoutes');
const postRouter = require('./routes/postRoutes');
const commentRouter = require('./routes/commentRoutes');

// database
connectDB();

// middlewares
// bodyparser for req.body
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// development logging
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

// implement CORS, set Access-COntrol-Allow-Origin to everywhere
app.use(cors());
app.options('*', cors());
// http methods response for preflight phase
// app.options('*', cors());

// Set security HTTP headers
app.use(helmet());

// Limit requests from same API
const limiter = rateLimit({
  max: 250,
  windowMs: 60 * 60 * 1000,
  message: 'Too many requests from this IP, please try again in an hour!'
});
app.use('/api', limiter);

// Data sanitization against NoSQL query injection
app.use(mongoSanitize());

// Data sanitization against XSS
app.use(xss());

// Prevent parameter pollution
app.use(hpp());

app.use(compression());

// routes
app.use('/api/v1/users', userRouter);
app.use('/api/v1/posts', postRouter);
app.use('/api/v1/comments', commentRouter);

// Serve static assets in production
if (process.env.NODE_ENV === 'production') {
  // Set static folder for react
  app.use(express.static(path.join(__dirname, 'client/build')));

  app.get('*', (req, res) =>
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'))
  );
}

// catach errors (all verbs: get post put patch ,etc.)
app.all('*', (req, res, next) => {
  next(new AppError(`Can't find ${req.originalUrl} on this server!`, 400));
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
