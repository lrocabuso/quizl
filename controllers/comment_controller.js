// Improtamos el modelo de BD
var models = require('../models/models');

// Autoload:  Permite realizar una factorización del código si en alguna de las acciones llega
// un parámetro de nombre commentId
exports.load = function(req, res, next, commentId){
  models.Comment
    .findById(commentId)
    .then(function(comment){
      if(comment) {
        // Creamos nueva propiedad en req asignándole el valor de comment obtenido en la lectura
        req.comment = comment;
        next(); // Pasamos el control a la siguiente acción que corresponda
      } else {
        // Si no existe el comment con id commentId creamos mensaje de error
        next(new Error("No existe el comentario con id: "+comment));
      }
    })
    .catch(function(error){  // Añadimos controlador de errores para findById
      next(error);
    });
};

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

// Petición PUT /quizes/:quizId/comments/:commentId/publish
exports.publish = function(req, res) {
  // Actualizamos el campo publicado del objeto comment obtenido en el Autoload
  req.comment.publicado = true;

  req.comment
  .save({fields:["publicado"]})
  .then(function(){res.redirect('/quizes/'+req.params.quizId);}) // Redirección HTTP a la página de responder pregunta
  .catch(function(error){  // Añadimos controlador de errores para save
    next(error);
  });
};
