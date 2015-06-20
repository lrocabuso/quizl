// Improtamos el modelo de BD
var models = require('../models/models');

// Petición GET /quizes
exports.index = function(req, res) {
  // Ahora obtenemos toda la colección de preguntas y se la enviamos como un array
  // a la vista index
  models.Quiz.findAll().then(function(quizes){
      res.render('quizes/index',{preguntas: quizes});
  });
};

// Petición GET /quizes/:quizId
exports.show = function(req, res){
  // La búsqueda del elemento asociado al paramtero quizId
  models.Quiz.findById(req.params.quizId).then(function(quiz){
      res.render('quizes/show',{pregunta: quiz});
  });
};

// Petición GET /quizes/:quizId/answer
exports.answer = function(req, res){
  // Buscamos el registro identificado por quizId
    models.Quiz.findById(req.params.quizId).then(function(quiz){
      var msg = 'Correcta';
      var tipo_panel = 'panel-success';
      // Si la petición es de tipo GET consultaremos la variable de query
      // Si la petición es de tipo POST consultaremos la variable de body
      if(req.query.respuesta.toUpperCase() !== quiz.respuesta.toUpperCase()) {
        msg = 'Incorrecta (' + req.query.respuesta + ')';
        tipo_panel = 'panel-warning';
      }
      // Enviamos como variable la id de la pregunta para poder volver a la misma que se ha contestado
      res.render('quizes/answer',{Idpregunta: quiz.id, respuesta: msg, tipopanel: tipo_panel});
    });
};
