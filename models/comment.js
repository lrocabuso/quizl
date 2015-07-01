// Definición del modelo de Comment (tabla Comment) módulo 9
module.exports=function(sequelize, DataTypes){
  return sequelize.define(
                'Comment',
                { texto: {
                    type: DataTypes.STRING,
                    validate: {notEmpty: {msg: "-> Falta Comentario"}}
                  },
                  publicado: {
                    type: DataTypes.BOOLEAN,
                    defaultValue: false
                  }
                });
};
