var md5 = require('MD5');

// Definición del modelo de User (tabla User)
module.exports=function(sequelize, DataTypes){
  return sequelize.define(
                'User',
                {
                  nombre: {
                      type: DataTypes.STRING,
                      unique: true,
                      validate: {
                        notEmpty: {msg: "-> Falta Nombre Usuario"}
                      }
                    },
                    login: {
                    type: DataTypes.STRING,
                    unique: true,
                    validate: {
                      notEmpty: {msg: "-> Falta Login Usuario"},
                      len: {args: [5, 15], msg: 'Login debe estar entre 5 y 15 caracteres de logitud'}
                    }
                  },
                  password: {
                    type: DataTypes.STRING,
                    validate: {
                      notEmpty: {msg: "-> Falta Clave"}
                    },
                    set: function(val) {
                      this.setDataValue('password',md5(val))
                    }
                  },
                  acceso: {
                    type: DataTypes.DATE
                  },
                  admin: {
                    type:DataTypes.BOOLEAN,
                    defaultValue:false
                  }
                });
};
