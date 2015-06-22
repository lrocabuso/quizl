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

// Petición GET /quizes
exports.index = function(req, res) {
  // Si no hay query.search inicializamos patron de busqeda a cadena vacia
  var patron=(req.query.search||'');
  // Añadimos % al principio y al final del patron de busqueda y sustituimos los espacios por %
  patron='%'+patron.replace(' ','%')+'%';
  // Ahora obtenemos toda la colección de preguntas ordenado y se la enviamos como un array a la vista index
  // EL filtrado se puede hacer con where:["pregunta like ?",patron] o where:{pregunta:{like:patron}} 
  models.Quiz.findAll({where:{pregunta: {like: patron}}, order: 'pregunta'}).then(function(quizes){
      res.render('quizes/index',{preguntas: quizes, patron: patron});
    })
    .catch(function(error){  // Añadimos controlador de errores para findAll
      next(error);
    });
};

// Petición GET /quizes/:quizId
exports.show = function(req, res){
  // Desde el momento que creamos la acción de load el objet quiz viene como propiedad de req
      res.render('quizes/show',{pregunta: req.quiz});
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
      res.render('quizes/answer',{pregunta: req.quiz, respuesta: msg, tipopanel: tipo_panel});
};
