/**config Axios */

/** Básicamente, lo que hace es crear una instancia de axios con una URL base y exportarla para que pueda ser utilizada en otras partes del código.

En particular, esta instancia de axios utiliza la URL base que está definida en la variable de entorno VITE_BACKEND_URL y la concatenación "/api". Por lo tanto, cualquier petición que se haga utilizando este cliente de axios se enviará a la URL VITE_BACKEND_URL/api. */

import axios from 'axios'; // Importamos la librería Axios

// Creamos una instancia de Axios con la función create y la almacenamos en la constante clienteAxios
const clienteAxios = axios.create({
    baseURL: `${import.meta.env.VITE_BACKEND_URL}/api`, // Configuramos la URL base para todas las solicitudes HTTP
});

// Exportamos la instancia de Axios para poder usarla en otros archivos de nuestro proyecto
export default clienteAxios;
