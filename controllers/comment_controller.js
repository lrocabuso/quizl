// Improtamos el modelo de BD
var models = require('../models/models');

// Petición GET /quizes/:quizId/comments/new
exports.new = function(req, res) {
  // Simplemente renderizamos la vista new enviando el quizId asociado
  res.render('comments/new',{quiz: req.quiz, quizId:req.params.quizId, errors: [] });
};

// Petición POST /quizes/:quizId/comments
exports.create = function (req, res, next) {
  var comment = models.Comment.build({
              texto: req.body.comment.texto,
              QuizId: req.params.quizId
              });

  // Guardamos en la BD los campos pregunta y respusta del formulario
  comment
  .validate()
  .then(function(err){
    if(err) {
      res.render('comments/new',{quiz: req.quiz, quizId:req.params.quizId, errors: err.errors});
    } else {
      comment
      .save()
      .then(function(){res.redirect('/quizes/'+req.params.quizId);})  // Redirección HTTP a la página del listado de preguntas
      .catch(function(error){  // Añadimos controlador de errores para findAll
        next(error);
      });
    }
  });
};
