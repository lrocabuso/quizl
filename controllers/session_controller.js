
// MW de autorización de accesos HTTP restringidos
exports.LoginRequired=function(req, res, next) {
  if(req.session.user) {
    next();
  } else {
    res.redirect('/login');
  }
};

// MW de autorización de accesos HTTP restringidos
exports.LoginAdminRequired=function(req, res, next) {
  if(req.session.user) {
    if(req.session.user.isadmin) {
        next();
    } else {
        res.redirect('/');
    }
  } else {
    res.redirect('/');
  }
};

// Petición GET /login (formulario de login)
exports.new = function(req, res){
  var errors = req.session.errors || {};
  req.session.errors={};

  res.render('sessions/new',{errors: errors});
};

// Petición POST /login (crear recurso  de sesión)
exports.create = function(req, res){
  var login = req.body.login;
  var passwd = req.body.passwd;

  var userController = require('./user_controller');
  userController.autenticar(login, passwd, function(error, user){
    if(error) { // Si se ha producido algún error de autenticación
      req.session.errors = [{'message':'Se ha producido un error de autenticación: '+error}];
      res.redirect('/login');
      return;
    } else {
      // Creamos recurso session.user guardando los datos del usuario
      // Una sesión se considera definida si existe el recursos session.user
      req.session.user = {
                id:user.id,
                username:user.login,
                inicio:new Date().getTime(),  // Iniciamos variable con valor de momento de inicio de sesión
                isadmin:user.admin,           // Indica si el usuario tiene permisos de administracion
                isroot: (user.login==='admin') // Indica si el administrador ha iniciado sesión
                };
      // Actualizamos fecha de último acceso del usuario
      userController.act_acceso(login,function(error,user){
        if(error) {
          req.session.errors = [{'message':'Se ha producido un error de actualizacioón: '+error}];
          res.redirect('/login');
          return;
        } else {
          res.redirect(req.session.redir.toString()); // Redireccionamos al path anterior al login, almacenado en session.redir
        }
      });

    }
  });
};

// Petición DELETE /logout (destruir recurso  de sesión)
exports.destroy = function(req, res){
  delete req.session.user; // Eliminado la propiedad destruimos la sesión
  res.redirect(req.session.redir.toString()); // Redireccionamos al path anterior al login, almacenado en session.redir
};
