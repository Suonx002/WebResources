const express = require('express');

const app = express();

// middlewares

// bodyparser for req.body
app.use(express.json());

// routes

// server listener
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
