// Necesario para crear las rutas
var path = require('path');

// Añadimos una serie de pasos iniciales para obtener cada uno de los datos necesarios para
// realizar la conexión a la BD a partir de la variable de entorno DATABASE_URL
// Si estamos en producción en modo local se cargará el patrón de SQLite y si estamos en Heroku
// se cargará el patrón de Postgres
// Postgres: DATABASE_URL = postgres://user:password@host:port/database
// SQLite: DATABASE_URL = sqlite://:@://

// Desglosamos el contenido de la variable de entorno con el patrón
var url = process.env.DATABASE_URL.match(/(.*)\:\/\/(.*?)\:(.*)@(.*)\:(.*)\/(.*)/);
var DB_name  = (url[6] || null);
var user     = (url[2] || null);
var pwd      = (url[3] || null);
var protocol = (url[1] || null);
var dialect  = (url[1] || null);
var port     = (url[5] || null);
var host     = (url[4] || null);
var storage  = process.env.DATABASE_STORAGE;

// Cargar el modelo ORM
var Sequelize = require('sequelize');

// Usar la BD SQLite por medio del módulo Sequelize
var sequelize = new Sequelize(DB_name, user, pwd,
    {dialect: protocol,
      protocol: protocol,
      port: port,
      host: host,
      storage: storage, // Solo SQLite (.env)
      omitNULL: true    // Solo Postgres
    }
);

// Importar la definición de la tabla User definida en el fichero user.js
var User = sequelize.import(path.join(__dirname,'user'));
// Importar la definición de la tabla Quiz definida en el fichero quiz.js
var Quiz = sequelize.import(path.join(__dirname,'quiz'));
// Importar la definición de la tabla Comment definida en el fichero comment.js
var Comment = sequelize.import(path.join(__dirname,'comment'));

// Definimos las relaciones entre tablas 1 (quiz) - N (comment)
Comment.belongsTo(Quiz);
Quiz.hasMany(Comment);

// exportamos el modelo con la definicion de la tabla Quiz
exports.Quiz = Quiz;
// exportamos el modelo con la definicion de la tabla Comment
exports.Comment = Comment;
// exportamos el modelo con la definicion de la tabla User
exports.User = User;

// Comprobamos la cantidad de registros de la tabla Quiz que nos servira para incializar la BD
// .success es la forma antigua de crear un callback si se realiza la sincronización
sequelize.sync().then(function(){
  // Obtenemos el total de registros que tiene la Quiz
  Quiz.count().then(function(count){
    if(count===0){ // La tabla se inicializará sólo si está vacía
      // Agragamos tres registro y mostramos mensaje por consola si to ha ido bien
      Quiz.create({pregunta: 'Capital de Italia',respuesta: 'Roma', tema:'Humanidades'});
      Quiz.create({pregunta: 'Capital de Portugal',respuesta: 'Lisboa', tema:'Humanidades'});
      Quiz.create({pregunta: 'Capital de España',respuesta: 'Madrid', tema:'Humanidades'}).then(function(){console.log('Base de datos inicializada con exito.')});
    }
  });
  User.count().then(function(count){
    if(count===0){ // La tabla se inicializará sólo si está vacía
      User
      .create({nombre: 'Luis Roca', login: 'admin',password: '123aB456', acceso: new Date(), admin:true});
      User
      .create({nombre: 'Usuario Invitado', login: 'anonimo',password: '111a222', acceso: new Date(), admin:false})
      .then(function(){console.log('Tabla de usuarios inicializada con éxito.')});
    }
  });
});
