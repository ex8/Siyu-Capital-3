const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const mongoose = require('mongoose');

const indexRouter = require('./routes/index');
const newslettersRouter = require('./routes/newsletters');

const app = express();

// mongodb setup
mongoose.connect(`mongodb://127.0.0.1:27017/siyu3`)
    .then(() => console.log(`MongoDB connection successful`))
    .catch(err => console.error(err));

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/newsletters', newslettersRouter);

// catch 404 and forward to error handler
app.use((req, res, next) => {
    next(createError(404));
});

app.use((req, res, next) => {
    next(createError(500));
});

module.exports = app;
