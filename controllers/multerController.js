const multer = require('multer');
const AppError = require('../utils/appError');

// storage engine
// const multerStorage = multer.diskStorage({
//   destination: (req, file, cb) => {
//     cb(null, './uploads/images');
//   },
//   filename: (req, file, cb) => {
//     const ext = file.mimetype.split('/')[1];
//     cb(null, `${file.originalname}-${Date.now()}.${ext}`);
//   }
// });

//store memory
const multerStorage = multer.memoryStorage();

const multerFilter = (req, file, cb) => {
  if (file.mimetype.startsWith('image')) {
    cb(null, true);
  } else {
    cb(new AppError('Please upload image files only', 400), false);
  }
};

const upload = multer({
  storage: multerStorage,
  fileFilter: multerFilter,
  limits: { fileSize: 2000000 }
});

module.exports = upload;
