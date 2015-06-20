var express = require('express');
var router = express.Router();
// Importamos el enrutador de las preguntas
var quizController = require('../controllers/quiz_controller');

/* GET home page. */
router.get('/', function(req, res, next) {
  // Hemos cambiado el valor de la variable title
  res.render('index', { title: 'Quiz Creator' });
});

// Configuramos las peticiones GET a la pregunta y a la respuesta
// para ejecutar las acciones question y answer definidas en el controlador quizController
// Añadimos la acción index cuando pasamos a mostrar los listados de recursos (mod 7)
// Se utiliza como nombre de la acción 'index' para mostrar el listado de registros por convenio con Rails
router.get('/quizes',quizController.index);
// Cambiamos los middlewares de preguntas y respuestas para enviar la id del registro al que se accede
// utilizar las expresiones regulares para crear la ruta get (mod 7)
// Se utiliza como nombre de la acción 'show' para mostrar el contenido de un registro por convenio con Rails
router.get('/quizes/:quizId(\\d+)',quizController.show);
router.get('/quizes/:quizId(\\d+)/answer',quizController.answer);
// Si quisieramos enviar las respuestas en el cuerpo del documento tendriamos que utilizar
// la petición POST para la respuesta de la siguiente manera
// router.post('/quizes/answer',quizController.answer);

// GET pagina de author
router.get('/author',function(req, res, next) {
    res.render('author', { });
});

module.exports = router;
