var express = require('express');
var router = express.Router();
// Importamos el enrutador de las preguntas
var quizController = require('../controllers/quiz_controller');

/* GET home page. */
router.get('/', function(req, res, next) {
  // Hemos cambiado el valor de la variable title
  res.render('index', { title: 'Quiz Creator', errors: [] });
});

// Autoload de comandos con :quizId
// Indica que si en la ruta llega algún parámetro de nombre quizId se ejecute la acción load  del controlador
// Se tiene que definir antes de cualquier otra petición
router.param('quizId',quizController.load);

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

// Configuramos middleware que atiende a la petición de crear pregunta
router.get('/quizes/new',quizController.new);
// Configuramos middleware que atiende a la petición de guardar pregunta utilizando el metodo POST
router.post('/quizes/create',quizController.create);
// Configuramos filtro que atiende a la petición de editar pregunta utilizando el metodo GET
router.get('/quizes/:quizId(\\d+)/edit',quizController.edit);
// Configuramos filtro que atiende a la petición de actualizar pregunta utilizando el metodo PUT
router.put('/quizes/:quizId(\\d+)',quizController.update);

// GET pagina de author
router.get('/author',function(req, res, next) {
    res.render('author', {errors: []});
});

module.exports = router;
