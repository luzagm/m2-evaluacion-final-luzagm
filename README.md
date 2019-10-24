# Examen final del módulo 2 (Javascript) 
# Buscador de series

### 1. Estructura básica
La aplicación de búsqueda de series consta de dos partes:
1. Un campo de texto y un botón para buscar series por su título.
2. Un listado de resultados de búsqueda donde aparece el cartel de la serie y el título.


### 2. Búsqueda
Al escribir en el input vacío creado para la búsqueda y, a continuación, hacer click con el ratón o pulsar intro, la aplicación se conectará al API abierto de TVMaze para búsqueda de series y obtenemos como respuesta un listado de elementos filtrados según lo que estuviesemos buscando. 


### 3. Favoritos
Una vez aparecen los resultados de búsqueda, podremos indicar cuáles son nuestras series favoritas. Para ello, haremos click sobre una de ellas. Esta serie seleccionada cambiará su color de fondo y, además, se añadirá al listado de Favoritos (a la izquierda de la pantalla en versión tablet o desktop, y en la parte superior en versión móvil).


### 4. Almacenamiento local
El listado de favoritos quedará almacenado en el localStorage, de manera que, al recargar la página, el listado de favoritos se mantiene.

### 5. BONUS: Borrar favoritos
Como bonus, no propusieron añadir una funcionalidad extra que nos permitiese borrar los favoritos. En este caso, el elemento añadido a la lista de favoritos tiene una "X" a la derecha. Si hacemos click sobre ésta, borraremos la serie seleccionada de favoritos, tanto de la lista como del localSorage.
