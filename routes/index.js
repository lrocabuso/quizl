var express = require('express');
var router = express.Router();
// Para poder tratar algunas de las rutas por ssl de forma obligatoria (login, logout)
var forceSSL = require('express-force-ssl');
// Importamos el enrutador de las preguntas
var quizController = require('../controllers/quiz_controller');
// Importamos el enrutador de las comentarios
var commentController = require('../controllers/comment_controller');
// Importamos el enrutador de los usuarios
var userController = require('../controllers/user_controller');
// Importamos el enrutador de las sesiones
var sessionController = require('../controllers/session_controller');


/* GET home page. */
router.get('/', function(req, res, next) {
  // Hemos cambiado el valor de la variable title
  res.render('index', { title: 'Quiz Creator', errors: [] });
});



// Autoload de comandos con :quizId
// Indica que si en la ruta llega algún parámetro de nombre quizId se ejecute la acción load  del controlador
// Se tiene que definir antes de cualquier otra petición
router.param('quizId',quizController.load);
// Autoload de comentarios con :commentId
router.param('commentId',commentController.load);
// Autoload de usuario con :userId
router.param('userId',userController.load);

//  Definición de rutas de usuarios
router.get('/users',sessionController.LoginRequired,forceSSL,userController.index);
router.get('/users/new',sessionController.LoginAdminRequired,forceSSL,userController.new);
router.post('/users/create',userController.create);
router.get('/users/:userId(\\d+)/edit',sessionController.LoginRequired,forceSSL,userController.edit);
router.put('/users/:userId(\\d+)',userController.update);
router.delete('/users/:userId(\\d+)',userController.destroy);

//  Definición de rutas de session
router.get('/login',forceSSL,sessionController.new); // formulario
router.post('/login',sessionController.create);     // crear
router.delete('/logout',sessionController.destroy); // destruir

// Definición de rutas para quiz
router.get('/quizes',quizController.index);
router.get('/quizes/statistics',quizController.statistics);
router.get('/quizes/:quizId(\\d+)',quizController.show);
router.get('/quizes/:quizId(\\d+)/answer',quizController.answer);
router.get('/quizes/new',sessionController.LoginRequired,quizController.new);
router.post('/quizes/create',sessionController.LoginRequired,quizController.create);
router.get('/quizes/:quizId(\\d+)/edit',sessionController.LoginRequired,quizController.edit);
router.put('/quizes/:quizId(\\d+)',sessionController.LoginRequired,quizController.update);
router.delete('/quizes/:quizId(\\d+)',sessionController.LoginRequired,quizController.destroy);

// Definición de rutas para comentarios
router.get('/quizes/:quizId(\\d+)/comments/new',commentController.new);
router.post('/quizes/:quizId(\\d+)/comments',commentController.create);
router.put('/quizes/:quizId(\\d+)/comments/:commentId(\\d+)/publish',sessionController.LoginRequired,commentController.publish);

// Definición de rutas para author
router.get('/author',function(req, res, next) {
  res.render('author', {errors: []});
});


module.exports = router;
