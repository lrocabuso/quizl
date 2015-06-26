// Improtamos el modelo de BD
var models = require('../models/models');

// Autoload:  Permite realizar una factorización del código si en alguna de las acciones llega
// un parámetro de nombre quizId
exports.load = function(req, res, next, quizId){
  models.Quiz.findById(quizId).then(function(quiz){
    if(quiz) {
      // Creamos nueva propiedad en req asignándole el valor de quiz obtenido en la lectura
      req.quiz = quiz;
      next(); // Pasamos el control a la siguiente acción que corresponda
    } else {
      // Si no existe el quiz con id quizId creamos mensaje de error
      next(new Error("No existe la pregunta con id: "+quizId));
    }
  });
};

// Petición GET /quizes/:quizId/edit
exports.edit = function(req, res) {
    // Obtenemos el objeto quiz (registro de la BD) cargado por la acción load
    var quiz = req.quiz;
    // Renderizamos la vista edit enviandole el objeto quiz leido
    res.render('quizes/edit',{quiz: quiz, errors: []});
};

// Petición DELETE /quizes/:quizId
exports.destroy = function(req, res){
  req.quiz.destroy().then(function () {
    res.redirect('/quizes');
  })
  .catch(function(error){  // Añadimos controlador de errores para destroy
    next(error);
  });
};

// Petición PUT /quizes/:quizId
exports.update = function(req, res){
  // Actualizamos los campos del objeto quiz obtenido por la acción load con los valores de los campos del formulario
  req.quiz.pregunta = req.body.quiz.pregunta;
  req.quiz.respuesta = req.body.quiz.respuesta;
  req.quiz.tema = req.body.quiz.tema;

  // Guardamos en la BD los campos pregunta y respusta del formulario
  req
  .quiz
  .validate()
  .then(function(err){
    if(err) {
      // Si se produce un error, rederizamos de nuevo el formulario con los datos que venian del formulario
      res.render('quizes/edit',{quiz: req.quiz, errors: err.errors});
    } else {
      req
      .quiz
      .save({fields:["pregunta","respuesta","tema"]})
      .then(function(){res.redirect('/quizes');}) // Redirección HTTP a la página del listado de preguntas
      .catch(function(error){  // Añadimos controlador de errores para save
        next(error);
      });
    }
  });
};

// Petición POST /create
exports.create = function(req, res, next){
  // Creamos instancia del objeto quiz utilizando como datos la información enviada por el formulario en el objeto quiz
  // que tiene como propiedades los campos del formulario y sus valores
  var quiz = models.Quiz.build(req.body.quiz);

  // Guardamos en la BD los campos pregunta y respusta del formulario
  quiz
  .validate()
  .then(function(err){
    if(err) {
      res.render('quizes/new',{quiz: quiz, errors: err.errors});
    } else {
      quiz
      .save({fields:["pregunta","respuesta","tema"]})
      .then(function(){res.redirect('/quizes');})  // Redirección HTTP a la página del listado de preguntas
      .catch(function(error){  // Añadimos controlador de errores para findAll
        next(error);
      });
    }
  });
};

// Petición GET /new
exports.new = function(req, res) {
    // Creamos una nueva instancia del objeto quiz (registro de la BD) con unos valores iniciales
    var quiz = models.Quiz.build({
      pregunta: "",
      respuesta: "",
      tema: ""
    });
    // Renderizamos la vista new enviandole el objeto quiz creado
    res.render('quizes/new',{quiz: quiz, errors: []});
};

// Petición GET /quizes
exports.index = function(req, res, next) {

  // Objeto que utilizaremos como argumento de la función findAll
  var Objfind = {order: 'pregunta'};
  // Obtenemos los valores de las variables que pueden venir en la query
  // Si no hay valores inicializamos variables search de busqeda a cadena vacia
  var patron_search=(req.query.search||'');
  var tipo_search=(req.query.field||'');
  // Indicador para mostrar botón de borrar filtro
  var borrar_filtro=true;
  // Evaluamos la variable tipo para saber si la búsqueda se realiza por campo (p) o por tema (t)
  switch (tipo_search) {
    case 'p':
        // Añadimos % a ambos lados de la expresión y sustituimos los espacios por %
        patron_search='%'+patron_search.replace(/\b/g ,'%')+'%';
        // Creamos propiedad del objeto Objfind con condición where
        Objfind.where = ["lower(pregunta) like lower(?)",patron_search];
      break;
    case 't':
        // Creamos propiedad del objeto Objfind con condición where
        Objfind.where = ["tema=?",patron_search];
      break;
    default:
        // Si no llegan variables en la petición GET, ocultamos el bot´ón de borrar filtro y no se crea condición WHERE
        borrar_filtro=false;
  }

  // Ahora obtenemos toda la colección de preguntas ordenado y se la enviamos como un array a la vista index
  models.Quiz.findAll(Objfind).then(function(quizes){
      res.render('quizes/index',{preguntas: quizes, borrar_filtro: borrar_filtro, errors: []});
    })
    .catch(function(error){  // Añadimos controlador de errores para findAll
      next(error);
    });
};

// Petición GET /quizes/:quizId
exports.show = function(req, res){
  // Desde el momento que creamos la acción de load el objet quiz viene como propiedad de req
      res.render('quizes/show',{pregunta: req.quiz, errors: []});
};

// Petición GET /quizes/:quizId/answer
exports.answer = function(req, res){
  // Desde el momento que creamos la acción de load el objet quiz viene como propiedad de req
      var msg = 'Correcta';
      var tipo_panel = 'panel-success';
      if(req.query.respuesta.toUpperCase() !== req.quiz.respuesta.toUpperCase()) {
        msg = 'Incorrecta (' + req.query.respuesta + ')';
        tipo_panel = 'panel-warning';
      }
      // Enviamos como variable la id de la pregunta para poder volver a la misma que se ha contestado
      res.render('quizes/answer',{pregunta: req.quiz, respuesta: msg, tipopanel: tipo_panel, errors: []});
};
