// Petición GET /quizes/question
exports.question = function(req, res){
  res.render('quizes/question',{title: 'Formulario pregunta', pregunta: 'Capital de Italia'});
};

// Petición GET /quizes/answer
exports.answer = function(req, res){
  var msg = 'Correcta';
  var tipo_panel = 'panel-success';
  // Si la petición es de tipo GET consultaremos la variable de query
  // Si la petición es de tipo POST consultaremos la variable de body
  if(req.query.respuesta.toUpperCase() !== 'ROMA') {
    msg = 'Incorrecta (' + req.query.respuesta + ')';
    tipo_panel = 'panel-warning';
  }
  res.render('quizes/answer',{title: 'Respuesta', respuesta: msg, tipopanel: tipo_panel});
};
