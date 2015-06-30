var users = {
  admin: {id:1, username:'admin', passwd:'1234'},
  luis: {id:2, username:'luis', passwd:'5678'}
};

// Comprobamos si el usuario que se quiere autenticar existe en users
// Si la autenticación falla o hay errores ejecuta la función callback
exports.autenticar = function(login, passwd, callback){
  if(users[login]) {
    if(passwd===users[login].passwd) {
      callback(null, users[login]);
    } else {
      callback(new Error('Usuario o clave erroneos.'));
    }
  } else {
    callback(new Error('No existe usuario.'));
  }
};
