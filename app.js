var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var hbs = require('hbs');

var main = require('./controllers'); 
var dev = require('./controllers/dev');
var menuTpl = require('./controllers/menuTpl');
var refTpl = require('./controllers/referTpl');
var filterTpl = require('./controllers/filterTpl');
var config = require('./config');
var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');
app.set('env', config.currentEnv);

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.set('view engine', 'html');
app.engine('.html', hbs.__express);
 

app.use('/', main); 
app.use('/dev', dev);
app.use('/menu', menuTpl);
app.use('/ref', refTpl);
app.use('/filter', filterTpl);


 
if(app.get('env') === (config.initEnv || 'init')){
  var systeminit = require('./controllers/init');
  app.use('/init', systeminit);
}


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
 
if(app.get('env') === (config.devEnv || 'development')){
    var demo = require('./controllers/demo');
    app.use('/demo', demo);

    app.use(function(err, req, res, next) { 
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) { 
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});


module.exports = app;
