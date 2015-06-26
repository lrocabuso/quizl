// Definición del modelo de Quiz (tabla Quiz)
// En el módulo 8 añadimos la propiedad de validación (validate) para los campos de la tabla
module.exports=function(sequelize, DataTypes){
  return sequelize.define('Quiz',
                {
                  pregunta: {
                    type: DataTypes.STRING,
                    validate: {notEmpty: {msg: "-> Falta pregunta"}}
                  },
                  respuesta: {
                    type: DataTypes.STRING,
                    validate: {notEmpty: {msg: "-> Falta respuesta"}}
                  },
                  tema: {
                    type: DataTypes.STRING,
                    validate: {notEmpty: {msg: "-> Falta tema"}}
                  }                  
                });
};
