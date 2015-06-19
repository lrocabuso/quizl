// Necesario para crear las rutas
var path = require('path');

// Cargar el modelo ORM
var Sequelize = require('sequelize');

// Usar la BD SQLite por medio del modulo Sequelize
var sequelize = new Sequelize(null, null, null,
    {dialect: 'sqlite', storage: 'quiz.sqlite'}
);

// Importar la definición de la tabla Quiz definida en el fichero quiz.js
var Quiz = sequelize.import(path.join(__dirname,'quiz'));

// exportamos el modelo con la definicion de la tabla Quiz
exports.Quiz = Quiz;

// Comprobamos la cantidad de registros de la tabla Quiz que nos servira para incializar la BD
// .success es la forma antigua de crear un callback si se realiza la sincronización
sequelize.sync().then(function(){
  // Obtenemos el total de registros que tiene la Quiz
  Quiz.count().then(function(count){
    if(count===0){ // La tabla se inicializará sólo si está vaciá
      // Agragamos un registro y mostramos mensaje por consola si to ha ido bien
      Quiz.create({
        pregunta: 'Capital de Italia',
        respuesta: 'Roma'
      }).then(function(){console.log('Base de datos inicializada con exito.')});
    }
  });
});
