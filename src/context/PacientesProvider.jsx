/**context PacientesProvider */

import { createContext, useState, useEffect } from 'react';
import { DeleteConfirmation } from '../components/SweetAlertsUtils'; // Importamos el componente DeleteConfirmation que usaremos para mostrar una confirmación al usuario antes de eliminar un paciente
import clienteAxios from '../config/axios'; // Importamos la instancia de Axios con la que haremos las peticiones HTTP
import useAuth from '../hooks/useAuth';

const PacientesContext = createContext(); // Creamos un contexto de pacientes

// Creamos un componente PacientesProvider que contendrá el estado de pacientes y funciones para modificarlo
export const PacientesProvider = ({ children }) => {
    const [pacientes, setPacientes] = useState([]); // Creamos el estado de pacientes y una función para modificarlo
    const [paciente, setPaciente] = useState({}); // Creamos el estado de paciente (usado para editar) y una función para modificarlo
    const { auth } = useAuth();

    useEffect(() => {
        // Usamos un efecto para cargar los pacientes al montar el componente
        const obtenerPacientes = async () => {
            // Creamos una función asincrónica para hacer la petición de los pacientes
            try {
                const token = localStorage.getItem('token'); // Obtenemos el token de acceso del usuario
                if (!token) return; // Si no hay token, no hacemos la petición

                const config = {
                    // Creamos la configuración de la petición con el token en el header
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${token}`,
                    },
                };

                const { data } = await clienteAxios('/pacientes', config); // Hacemos la petición para obtener los pacientes
                setPacientes(data); // Actualizamos el estado de pacientes con los datos recibidos
            } catch (error) {
                console.log(error); // Si hay un error, lo mostramos en la consola
            }
        };
        obtenerPacientes(); // Llamamos a la función para obtener los pacientes
    }, [auth]); // El efecto se ejecutará solo al montar el componente

    const guardarPaciente = async (paciente) => {
        // Creamos una función asincrónica para guardar un paciente
        const token = localStorage.getItem('token'); // Obtenemos el token de acceso del usuario
        const config = {
            // Creamos la configuración de la petición con el token en el header
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
            },
        };

        // Si el paciente tiene un ID, es porque está editando uno existente
        if (paciente.id) {
            try {
                const { data } = await clienteAxios.put(`/pacientes/${paciente.id}`, paciente, config); // Hacemos la petición para actualizar el paciente

                // Actualizamos el estado de pacientes con el paciente editado
                const pacientesActualizado = pacientes.map((pacienteState) => (pacienteState._id === data._id ? data : pacienteState));

                setPacientes(pacientesActualizado); // Actualizamos el estado de pacientes con los datos recibidos
            } catch (error) {
                // Si hay un error, lo mostramos en la consola
                console.log(error);
            }
        } else {
            // Else, Si no tiene un ID, es porque está creando uno nuevo
            try {
                const { data } = await clienteAxios.post('/pacientes', paciente, config);

                // Almacena el paciente recién creado en el estado pacientes
                const { createdAt, updatedAt, __v, ...pacienteAlmacenado } = data;

                setPacientes([pacienteAlmacenado, ...pacientes]);
            } catch (error) {
                // Si hay un error...
                console.log(error.response.data.msg);
            }
        }
    };

    // Actualiza el estado paciente con la información del paciente a editar
    const setEdicion = (paciente) => {
        setPaciente(paciente);
    };

    // Función que se ejecutará al confirmar la eliminación del paciente
    const eliminarPaciente = async (id) => {
        const handleDeleteConfirmation = async () => {
            try {
                // Obtiene el token de autenticación desde el localStorage del navegador
                const token = localStorage.getItem('token');
                // Configuración de la petición para enviar el token en los headers
                const config = {
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${token}`,
                    },
                };
                // Envía una petición DELETE al backend para eliminar el paciente con el id proporcionado
                const { data } = await clienteAxios.delete(`/pacientes/${id}`, config);

                // Filtra los pacientes existentes en el estado para remover el paciente eliminado
                const pacientesActualizado = pacientes.filter((pacientesState) => pacientesState._id !== id);

                // Actualiza el estado de pacientes con la lista filtrada
                setPacientes(pacientesActualizado);
            } catch (error) {
                // En caso de error en la petición, lo muestra en la consola del navegador
                console.log(error);
            }
        };

        // Muestra la alerta de SweetAlert, al confirmar se ejecutará la función handleDeleteConfirmation
        DeleteConfirmation({
            title: `¿Confirmas que deseas eliminar el Paciente?`,
            text: 'Esta acción no se puede deshacer',
            confirmButtonText: 'Sí, eliminar',
            onDelete: handleDeleteConfirmation,
        });
    };

    return (
        <>
            {/* Provee el estado y funciones necesarias a sus hijos mediante el PacientesContext.Provider */}
            <PacientesContext.Provider
                value={{
                    pacientes,
                    guardarPaciente,
                    setEdicion,
                    paciente,
                    eliminarPaciente,
                }}
            >
                {children}
            </PacientesContext.Provider>
        </>
    );
};

export default PacientesContext;
