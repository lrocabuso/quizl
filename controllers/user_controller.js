// Paquete para realizar conversiones md5
var md5 = require('MD5');
// Improtamos el modelo de BD
var models = require('../models/models');
// Paquete para el formateo de las fechas
var moment = require('moment');

// Acción de autoload de datos de usuarios cuando se reciba el parámetro userId
exports.load = function(req, res, next, userId){
  models.User
  .findById(userId)
  .then(function(user){
    if(user) {
      // Creamos nueva propiedad en req asignándole el valor de user obtenido en la lectura
      req.user = user;
      next(); // Pasamos el control a la siguiente acción que corresponda
    } else {
      // Si no existe el usuario con id userId creamos mensaje de error
      next(new Error("No existe el usuario con id: "+userId));
    }
  })
  .catch(function(error){  // Añadimos controlador de errores para findById
    next(error);
  });
};
// Petición GET /new
exports.new = function(req, res) {
    // Creamos una nueva instancia del objeto user (registro de la BD) con unos valores iniciales
    var user = models.User.build({
      nombre: "",
      login: "",
      password: "",
      acceso:new Date(),
      admin: false
    });
    // Renderizamos la vista new enviandole el objeto user creado
    // El parametro apdatelogin indica que se puede modificar el login (solo se permite a la hora de crear usuario)
    res.render('users/new',{user: user, errors: [], updatelogin:true});
};
// Petición POST /create
exports.create = function(req, res, next){
  // Creamos instancia del objeto user utilizando como datos la información enviada por el formulario en el objeto user
  // que tiene como propiedades los campos del formulario y sus valores
  var user = models.User.build(req.body.user);

  // Guardamos en la BD todos los del formulario
  user
  .validate()
  .then(function(err){
    if(err) {
      res.render('users/new',{user: user, errors: err.errors, updatelogin:true});
    } else {
      user
      .save({fields:["nombre","login","password","acceso","admin"]})
      .then(function(){res.redirect('/users');})  // Redirección HTTP a la página del listado de usuarios
      .catch(function(err){
        // Si se produce un error al crear el usuario (nombre o login ya existen) quiero que el mensaje
        // de error se muestre en la misma pagina del formulario
        res.render('users/new',{user: user, errors: err.errors, updatelogin:true});
      });
    }
  });
};
// Petición DELETE /users/:userId
exports.destroy = function(req, res, next){
  req.user.destroy().then(function () {
    res.redirect('/users');
  })
  .catch(function(error){  // Añadimos controlador de errores para destroy
    next(error);
  });
};
// Petición GET /users/:userId/edit
exports.edit = function(req, res) {
    var user = req.user;
    // Cuando un usuario accede al formulario de edición de datos de usuario, desactivamos por medio del parametro updatelogin
    // la posibilidad de editar el login para que no se pueda modificar
    res.render('users/edit',{user: user, errors: [], updatelogin:false});
};
// Petición PUT /users/:userId
exports.update = function(req, res, next){
  // Actualizamos los campos del objeto user obtenido por la acción load con los valores de los campos del formulario
  req.user.nombre = req.body.user.nombre;
  req.user.password = (req.body.user.password || req.user.password);
  req.user.acceso = req.body.user.acceso;
  // Al ser un input de tipo checkbox, si existe sera true de lo contrario sera false
  req.user.admin = (req.body.user.admin)? true:false;

  req
  .user
  .validate()
  .then(function(err){
    if(err) {
      // Si se produce un error, rederizamos de nuevo el formulario con los datos que venian del formulario
      res.render('users/edit',{user: req.user, errors: err.errors, updatelogin:false});
    }
    else {
      req
      .user
      .save({fields:["nombre","password","acceso","admin"]})
      .then(function(){res.redirect('/users');}) // Redirección HTTP a la página del listado de usuarios
      .catch(function(err){  // Añadimos controlador de errores para save
        res.render('users/edit',{user: req.user, errors: err.errors, updatelogin:false});
      });
    }
  });
};
// Función auxiliar para formatear las fechas de los campos de tipo DATE que se muestren en la vista index de users
function fmtfecha(fecha) {
    return moment(fecha).format('DD/MM/YY');
};
// Petición GET /users
exports.index = function(req, res, next) {
  // Objeto que utilizaremos como argumento de la función findAll
  var Objfind = {order: 'login'};
  var patron_search=(req.query.search||'');
  var borrar_filtro=false;
  if(patron_search.length<=0) { // No hay patron de búsqueda
    Objfind.where = ["login <> 'admin'"]; // Mostrar todos execto el super 'admin'
  } else {
    patron_search='%'+patron_search.replace(/\b/g ,'%')+'%';
    // Creamos propiedad del objeto Objfind con condición where
    Objfind.where = ["lower(login) like lower(?) AND login <> 'admin'",patron_search];
    borrar_filtro=true;     //Activamos el boton de borrar filtro
  }
  // Ahora obtenemos toda la colección de preguntas ordenado y se la enviamos como un array a la vista index
  models.User.findAll(Objfind).then(function(users){
      res.render('users/index',{usuarios: users,  fmtfecha: fmtfecha, borrar_filtro: borrar_filtro, errors: []});
    })
    .catch(function(error){  // Añadimos controlador de errores para findAll
      next(error);
    });
};
// Acción invocada por el controlador session_controller para autenticar los datos del login
exports.autenticar = function(LogIn, passwd, callback){
    models.User
    .findOne({where: { login: LogIn } })
    .then(function(user){
        if(user) {
          if(md5(passwd)===user.password) {
            callback(null, user);
          } else {
            callback(new Error('Usuario o clave erroneos.'));
          }
        } else {
          callback(new Error('No existe usuario.'));
        }
    });
};
// Acción invocada por el controlador session_controller para actualizar la fecha de acceso del usuario que hace login
exports.act_acceso = function(LogIn, callback) {
  models.User
  .findOne({where: { login: LogIn } })
  .then(function(user){
    user.acceso=new Date();
    user
    .save({fields:["acceso"]})
    .then(function(){callback(null);})
    .catch(function(err){callback(new Error('Imposible actualizar acceso.'));});
  });
};
