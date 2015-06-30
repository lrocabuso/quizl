Desarrollo de servicios en la nube con HTML5, Javascript y node.js
==================================================================

![NODE Version][node-image] ![NPM Version][npm-image]

Módulo 6 (Proyecto Quiz y MVC)
------------------------------
### Paquetes instalados:

![Express Version][express-image] ![BodyParser Version][body-parser-image] ![favicon Version][favicon-image] ![Morgan Version][morgan-image] ![DEBUG Version][debug-image] ![EJS Version][ejs-image] ![COOKIE Version][cookie-parser-image] ![EXPRESS Version][express-partials-image]

En esta práctica se muestra el desarrollo de la aplicación quizl, utilizando el modelo MVC.

La práctica consiste en:

- Crear el proyecto **quizl** desde el principio.
- Crear cada una de las versiones propuestas durante las transparencias del módulo.
- Crear un *diseño CSS adaptable* a dispositivos móviles y pcs. *Para esta tarea he utilizado las librerias CSS y js de Bootstrap CDN*.
- Añadir un nuevo enlace en la sección de pie de página (*footer*) que apunte a la página del proyecto en **GITHUB**.
- Crear una nueva rama de desarrollo llamada **creditos** y activarla para continuar con el desarrollo.
- Crear una nueva página con los datos del autor/es y enlazarla en la barra de navegación.
- Crear una cuenta en **Heroku** para desplegar la aplicación de esta práctica.

Módulo 7 (Integración con BD (SQLite y Postgres))
-------------------------------------------------
### Herramientas
![HEROKU Version][heroku-toolbelt-image] ![FOREMAN Version][foreman-image]

### Paquetes instalados:

![SEQUELIZE Version][sequelize-image] ![SQLITE Version][sqlite-image] ![PG Version][pg-image] ![PGHSTORE Version][pg-hstore-image]

En esta práctica se definen los modelos de comunicación con los datos utilizando una BD SQLite (*local*) y una BD Postgres (*Heroku*), se muestran la lista de preguntas disponibles y se crea un cuadro de búsqueda de preguntas.

La práctica consiste en:

- Instalar los módulos *sequelize* y *sqlite3* para el manejo en local de la BD.
- Crear los modelos de comunicación y la inicialización con datos de prueba.
- Modificar los controladores para hacer uso de los nuevos modelos de datos.
- Añadir el addon **Heroku Postgres** a nuestra aplicación desplegada en Heroku y crear la base de datos.
- Instalar los módulos *pg* y *pg-hstore* para le manejo en Heroku de la BD Postgres.
- Configurar las variables de entorno DATABASE_URL y DATABASE_STORAGE para el trabajo en local con SQLite.
- Adaptar models para el entorno local con SQLite y remoto con Postgres.
- Modificar el controlador para poder enviar la lista de preguntas a la vista index.
- Modificar el controlador para enviar la id de la pregunta en la acción show y la acción answer.
- Modificar las vistas de la aplicación para adaptarse a los cambios realizados en el controlador (layout, index, show, answer, etc..).
- Crear acción **load** de autocarga de registro antes de que sea procesada la acción GET solicitada y añadir la gestión de errores.
- Crear formulario de búsqueda en la vista index que permita cargar la lista de preguntas en función de un patrón de búsqueda.
- Desplegar los nuevos cambios en nuestra aplicación de Heroku.

Módulo 8 (Creación, Edición y Eliminación de preguntas)
-------------------------------------------------
### Paquetes instalados:

![OVERRIDE Version][method-override-image]

En este módulo se desarrollan las partes de la aplicación de comunicarse con la BD para crear, editar y eliminar registros. Se implementan los filtros put y delete por medio de la utilización del paquete **method-override**.

Estos desarrollos implican la creación de nuevas acciones en el controlador, nuevas vistas (formularios) y enlaces en las vistas para que el usuario pueda realizar las acciones de crear, editar y eliminar.

En la práctica final se añade un nuevo campo al modelo existente, para crear un índice temático de preguntas. Estos cambios nos obligan a eliminar la BD quiz.sqlite del proyecto local y vaciar la BD de Heroku ya que no hemos contemplado las migraciones en nuestro proyecto.
Tendremos que modificar las acciones new, update y create del controlador para que tengan en cuenta el nuevo campo y también tendremos que modificar el formulario de edición y creación de preguntas para mostrar el nuevo campo.

La práctica consiste en:

- Instalar el módulo *method-override* para convertir las peticiones POST en PUT o DELETE.
- Definir las validaciones en el modelo de la BD.
- Añadir en el controlador las acciones new y create.
- Añadir las acciones de validación de datos en las acciones creadas, utilizando la función validate() de sequelize.
- Crear formulario para la creación, edición de preguntas.
- Añadir los filtros necesarios en el router para atender las peticiones GET (new) y POST (create).
- Añadir al marco principal de la aplicación una sección para mostrar los errores de validación.
- Modificar la configuración de bodyParser.urlencoded() en apps.js para crear de forma correcta el objeto que se envía desde el formulario.
- Añadir enlace en la vista principal para enviar al formulario de creación de preguntas.
- Añadir en el controlador la acción edit para editar preguntas.
- Añadir en el controlador la acción update para actualizar las preguntas.
- Añadir los filtros necesarios en el router para atender las peticiones GET (edit) y PUT (update).
- Añadir a cada pregunta de la lista en la vista principal un enlace para editarla con la id de cada pregunta que se pasa como variable de la URL
- Añadir al controlador la acción destroy para eliminar preguntas.
- Añadir filtro necesario en el router para atender la petición DELETE (destroy).
- Añadir a cada pregunta de la lista en la vista principal un enlace para eliminarla con la id de cada pregunta que se pasa como variable de la URL.

Práctica final módulo

- Modificar el modelo de la BD para añadir el nuevo campo *tema* que nos permita realizar un índice temático de preguntas.
- Eliminar la BD sqlite local para que se vuelva a generar la BD con el nuevo campo.
- Modificar en el controlador las acciones new, update y create para que se tenga en cuenta el nuevo campo.
- Añadir al formulario de creación/edición de preguntas una lista desplegable con los temas que forman el índice temático de la pregunta.
- Desde el  Dashboard de Heroku para acceder a la base de datos de Postgress y vaciarla.
- Guardar los cambios.
- Desplegar los nuevos cambios en nuestra aplicación de Heroku.

Módulo 9 (Relaciones, Sesiones y Protocolo HTTPS)
-------------------------------------------------------------------------------------------------------------
### Paquetes instalados:

![SESSION Version][express-session-image]

En este último módulo vemos como crear relaciones entre las tablas de la BD utilizando los métodos que define sequelize. También vemos el tratamiento de sesiones de trabajo con autenticación de usuarios por medio del paquete express-session, donde se nos enseña como crear y destruir sesiones de trabajo, como realizar la validación de usuarios y la autorización de trabajo.



- Crear nuevo modelo para la tabla de comentarios.
- Definir la relación 1->N entre quizs y comments.
- Crear controlador asociado al nuevo modelo con las acciones new y create.
- Crear filtros en el router index para atender las nuevas peticiones sobre comentarios.
- Mostrar la lista de comentarios asociados a una pregunta en la vista answer.
- Añadir enlace que permita crear un nuevo comentario.
- Crear formulario para introducir el texto del comentario en views/comments
- - - -
- Instalar paquete express-session para el control de sesiones de trabajo.
- Importar, iniciar y hacer visibles las sesiones desde app.js.
- Crear filtros para las peticiones de login y logout en el router principal.
- Crear controlador de sesiones session_controller.
- Crear controlador de usuarios para realizar la autenticación.
- Modificar el interface de trabajo para iniciar/cerrar sesión.
- Crear nueva vista para el formulario de inicio de sesión.



[node-image]: https://img.shields.io/badge/node-0.12.4-blue.svg
[npm-image]: https://img.shields.io/npm/v/npm.svg
[body-parser-image]: https://img.shields.io/badge/body--parser-1.12.4-green.svg
[express-image]:https://img.shields.io/badge/express-4.12.4-green.svg
[favicon-image]:https://img.shields.io/badge/serve--favicon-2.2.1-green.svg
[morgan-image]:https://img.shields.io/badge/morgan-1.5.3-green.svg
[debug-image]:https://img.shields.io/badge/debug-2.2.0-green.svg
[ejs-image]:https://img.shields.io/badge/ejs-2.3.1-green.svg
[cookie-parser-image]:https://img.shields.io/badge/cookie--parser-1.3.5-green.svg
[express-partials-image]:https://img.shields.io/badge/express--partials-0.3.0-green.svg
[sequelize-image]:https://img.shields.io/badge/sequelize-3.2.0-green.svg
[sqlite-image]:https://img.shields.io/badge/sqlite3-3.0.8-green.svg
[pg-image]:https://img.shields.io/badge/pg-4.4.0-green.svg
[pg-hstore-image]:https://img.shields.io/badge/pg--hstore-2.3.2-green.svg
[method-override-image]:https://img.shields.io/badge/method--override-2.3.3-green.svg
[heroku-toolbelt-image]:https://img.shields.io/badge/heroku--toolbelt-3.38.2-red.svg
[foreman-image]:https://img.shields.io/badge/foreman-0.78.0-blue.svg
[express-session-image]:https://img.shields.io/badge/express--session-1.11.3-green.svg
