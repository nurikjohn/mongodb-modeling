const morgan = require('morgan');
const express = require('express');
const globalErrorHandler = require('./controllers/error');
const AppError = require('./utils/appError');
const indexRouter = require('./routes');

const app = express();

// Middlewares
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

indexRouter(app);

app.use('/*', (req, res, next) => {
    next(new AppError(404, `Can't find ${req.originalUrl} on this server!`));
});

app.use(globalErrorHandler);

module.exports = app;
