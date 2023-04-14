/** context AuthProvider */

import { useState, useEffect, createContext } from 'react';
import clienteAxios from '../config/axios'; // Importamos nuestro cliente Axios que configuramos previamente
import { ShowErrorAlert, ShowSuccessAlert } from '../components/SweetAlertsUtils';
const AuthContext = createContext(); // Creamos nuestro contexto de autenticación

// Creamos nuestro componente proveedor que acepta como children a todos los componentes que lo rodean
const AuthProvider = ({ children }) => {
    const [cargando, setCargando] = useState(true); // Creamos un estado para controlar si el proceso de autenticación está cargando
    const [auth, setAuth] = useState({}); // Creamos un estado para almacenar la información del usuario autenticado

    // Utilizamos el hook useEffect para que se ejecute una vez al montarse el componente
    useEffect(() => {
        // Definimos nuestra función para autenticar al usuario
        const autenticarUsuario = async () => {
            const token = localStorage.getItem('token'); // Obtenemos el token almacenado en el localStorage

            // Si no hay un token almacenado
            if (!token) {
                setCargando(false); // Cambiamos el estado de cargando a falso
                return; // Salimos de la función | Detiene la ejecucion...
            }

            // Definimos la configuración de nuestra solicitud HTTP con el token
            const config = {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                },
            };

            try {
                // Intentamos obtener la información del usuario autenticado
                const { data } = await clienteAxios('/veterinarios/perfil', config); // Hacemos la solicitud HTTP a nuestro servidor con Axios

                setAuth(data); // Actualizamos el estado de autenticación con los datos obtenidos del servidor
            } catch (error) {
                // Si hay un error en la solicitud
                console.log(error.response.data.msg); // Mostramos el mensaje de error en la consola
                setAuth({}); // Borramos cualquier información de autenticación previa
            }

            setCargando(false); // Cambiamos el estado de cargando a falso
        };
        autenticarUsuario(); // Ejecutamos nuestra función de autenticación al montarse el componente
    }, []); // El segundo parámetro del useEffect es un arreglo vacío, lo que indica que solo se ejecutará una vez al montarse el componente

    // Definimos nuestra función para cerrar sesión
    const cerrarSesion = () => {
        localStorage.removeItem('token'); // Borramos el token del localStorage
        setAuth({}); // Borramos cualquier información de autenticación previa
    };

    // Definimos la función para actualizar el perfil
    const actualizarPerfil = async (datos) => {
        const token = localStorage.getItem('token'); // Obtenemos el token almacenado en el localStorage

        // Si no hay un token almacenado, salimos de la función
        if (!token) {
            setCargando(false);
            return;
        }

        // Configuramos la solicitud HTTP con el token
        const config = {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
            },
        };

        try {
            const url = `/veterinarios/perfil/${datos._id}`;
            // Realizamos la petición PUT para actualizar el perfil
            const { data } = await clienteAxios.put(url, datos, config);

            return data;
        } catch (error) {
            // Ej de error pasandole a SweetAlert
            return {
                error: error.response.data.text,
            };
        }
    };

    // Definimos una funcion para Guardar un nuevo password
    const guardarPassword = async (datos) => {
        const token = localStorage.getItem('token'); // Obtenemos el token almacenado en el localStorage

        // Si no hay un token almacenado, salimos de la función
        if (!token) {
            setCargando(false);
            return;
        }

        // Configuramos la solicitud HTTP con el token
        const config = {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
            },
        };

        try {
            const url = '/veterinarios/actualizar-password';
            // Realizamos la petición PUT para actualizar el password
            const { data } = await clienteAxios.put(url, datos, config);

            return data;
        } catch (error) {
            // Ej de error pasandole a SweetAlert
            return {
                error: error.response.data.text,
            };
        }
    };

    return (
        // Devolvemos nuestro contexto de autenticación proveedor con los valores que queremos compartir
        <AuthContext.Provider
            value={{
                auth,
                setAuth,
                cargando,
                cerrarSesion,
                actualizarPerfil,
                guardarPassword,
            }}
        >
            {/* // Devolvemos los componentes que rodean a nuestro proveedor como hijos */}
            {children}
        </AuthContext.Provider>
    );
};

export { AuthProvider }; // Exportamos nuestro proveedor para poder utilizarlo en otros componentes

export default AuthContext; // Exportamos nuestro contexto de autenticación para poder utilizarlo en otros componentes mediante el hook useContext de React
