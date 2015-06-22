Desarrollo de servicios en la nube con HTML5, Javascript y node.js
==================================================================

Módulo 6 (Proyecto Quiz y MVC)
------------------------------

En esta práctica se muestra el desarrollo de la aplicación quizl, utilizando el modelo MVC.

La práctica consiste en:

- Crear el proyecto **quizl** desde el principio.
- Crear cada una de las versiones propuestas durante las transparencias del módulo.
- Crear un *diseño CSS adaptable* a dispositivos móviles y pcs.
- Añadir un nuevo enlace en la sección de pie de página (*footer*) que apunte a la página del proyecto en **GITHUB**.
- Crear una nueva rama de desarrollo llamada **creditos** y activarla para continuar con el desarrollo.
- Crear una nueva página con los datos del autor/es y enlazarla en la barra de navegación.
- Crear una cuenta en **Heroku** para desplegar la aplicación de esta práctica.

Módulo 7 (Integración con BD (SQLite y Postgres))
-------------------------------------------------

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
