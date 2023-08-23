const express = require('express');
const languagesRouter = require('./routes/languages');
const usersRouter = require('./routes/users');
const coursesRouter = require('./routes/courses');
const lessonsRouter = require('./routes/lessons');
const authRouter = require('./routes/auth');
const { errorHandler } = require('./middlewares/errorHandler');
const app = express();

app.use('/auth', authRouter);

app.use('/api/language', languagesRouter);

app.use('/api/user', usersRouter);

app.use('/api/course', coursesRouter);

app.use('/api/lesson', lessonsRouter);

app.all('*', (req, res, next) => {
  res.status(404).json({
    status: 'error',
    message: `Can't find ${req.originalUrl} endpoint`
  })
});

app.use(errorHandler);

module.exports = app;
