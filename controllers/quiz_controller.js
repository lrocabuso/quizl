// Improtamos el modelo de BD
var models = require('../models/models');

// Petición GET /quizes/question
exports.question = function(req, res){
  models.Quiz.findAll().then(function(quiz){
      res.render('quizes/question',{pregunta: quiz[0].pregunta});
  });
};

// Petición GET /quizes/answer
exports.answer = function(req, res){
    models.Quiz.findAll().then(function(quiz){
      var msg = 'Correcta';
      var tipo_panel = 'panel-success';
      // Si la petición es de tipo GET consultaremos la variable de query
      // Si la petición es de tipo POST consultaremos la variable de body
      if(req.query.respuesta.toUpperCase() !== quiz[0].respuesta.toUpperCase()) {
        msg = 'Incorrecta (' + req.query.respuesta + ')';
        tipo_panel = 'panel-warning';
      }
      res.render('quizes/answer',{respuesta: msg, tipopanel: tipo_panel});
    });
};
