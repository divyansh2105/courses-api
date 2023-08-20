const express = require('express');
require('dotenv').config();
const {databaseConnector} = require('./providers/databaseConnector');
const languagesRouter = require('./routes/languages');
const usersRouter = require('./routes/users');
const coursesRouter = require('./routes/courses');
const app = express();

app.listen(3000, () => {
  try {
    console.log('Server listening on port 3000!');
    databaseConnector.connect({
      host: process.env.DB_HOST,
      user: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      port: process.env.DB_PORT,
      database: process.env.DB_DBNAME
    });
  } catch (err) {
    console.log(err.message);
  } 
});

app.use('/api/language', languagesRouter);

app.use('/api/user', usersRouter);

app.use('/api/course', coursesRouter);
