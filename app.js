var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');


var indexRouter = require('./routes/index');
var offersRouter = require('./routes/offers');
var usersRouter = require('./routes/users');

var app = express();
var db = mongoose.connect("mongodb://s:" +
    "Mfantazia1" +
    "@zofer-claster-shard-00-00-h4iha.mongodb.net:27017,zofer-claster-shard-00-01-h4iha.mongodb.net:27017,zofer-claster-shard-00-02-h4iha.mongodb.net:27017/test?ssl=true&replicaSet=zofer-claster-shard-0&authSource=admin");
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(function (req, res, next) {
    console.log('mtav gone mi tex');
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', '*');

    if (req.method === 'OPTIONS') {
        res.header('Access-Control-Allow-Methods', 'POST, GET, DELETE, UPDATE');
        return res.status(200).json({});
    }
    next();
});

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/offers', offersRouter);
app.use('/uploads', express.static('uploads'));
// catch 404 and forward to error handler
app.use(function (req, res, next) {
    // res.status(200).json({
    //     message: "it works"
    // });
    next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render('error');
});

app.post('/serxio', function (req, res) {
    res.send('gonsalez');
});

module.exports = app;
