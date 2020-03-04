const mongoose = require('mongoose');

module.exports = async () => {
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
