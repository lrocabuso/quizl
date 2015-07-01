var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
// incluir modulo para generar vistas parciales
var partials = require('express-partials');
// Incluir modulo para realizar conversiones de POST a PUT
var methodOverride = require('method-override');
// Incluir modulo para gestión de sesiones
var session = require('express-session');

var routes = require('./routes/index');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
// Vistas parciales de express-partials
app.use(partials());

// uncomment after placing your favicon in /public
app.use(favicon(__dirname + '/public/favicon.ico'));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser('Quizl-Luis 2015'));
app.use(session({ secret: 'Quizl-Luis 2015', resave: true, saveUninitialized: true }));
app.use(methodOverride('_method'));
app.use(express.static(path.join(__dirname, 'public')));

// Helpers dinámicos (muy importante declararlos antes de la directiva app.use('/',routes))
app.use(function(req, res, next){
  // Si no existe la propiedad redir (variable de sesion) la inicializa
  if (!req.session.redir) { req.session.redir = '/';  }
  // Guardamos la URL completa en session.redir para despues del login hacer el redirect de forma correcta
  // Si guardamos solo el path, cuando estamos en peticiones que lleven variables no se devuelven las variables y da error
  if(!req.path.match(/\/login|\/logout/)){req.session.redir = req.originalUrl; }
  // Hacemos visible session.redir para las vistas utilizando una variable local
  // Desde cualquier vista se podrá acceder a la sesión haciendo referencia al objeto session
  res.locals.session = req.session;
  next();
});

app.use('/', routes);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  // Reiniciamos la propiedad redir de session, por si a continuación se hace un inicio de sesión, que no vuelva
  // a la dirección que provocó el error
  req.session.redir = '/';
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err,
      errors: []
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {},
    errors: []
  });
});


module.exports = app;
