var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var expressSession = require('express-session');
var fs = require('fs');

var login = require('./routes/login');
var register = require('./routes/register');
var logout = require('./routes/logout');
var posts = require('./routes/posts');
var comments = require('./routes/comments');
var user = require('./routes/user');
var uploads = require('./routes/uploads');
var photos = require('./routes/photos');


var app = express();

var mongo = require('mongodb');
var monk = require('monk');
var db = monk('mongodb://alen:alen1234@ds151060.mlab.com:51060/social-network');

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(expressSession({ secret: 'kjdasbdlas83k54fs5d', resave: false, saveUninitialized: true }));
// app.use(express.static(path.join(__dirname, 'public')));



function requireLogin(req, res, next) {
    if (!req.session.user) {
        res.redirect('/login');
    } else {
        next();
    }
};

app.use(function(req, res, next) {
    req.db = db;
    res.header('Cache-Control', 'no-cache, private, no-store, must-revalidate, max-stale=0, post-check=0, pre-check=0');    
    next();
});
app.use('/login', login);
app.use('/register', register);
app.use('/', requireLogin, express.static(path.join(__dirname, 'public')));
app.use('/user', user);

app.use('/logout', logout);
app.use('/posts', posts);
app.use('/comments', comments);
app.use('/uploads', uploads);
app.use('/photos', photos);


// catch 404 and forward to error handler

app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// error handler
app.use(function(err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render('error');
});


module.exports = app;