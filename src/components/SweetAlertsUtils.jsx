/** Componente SweetAlerts */

import Swal from 'sweetalert2'; // Importa la librería SweetAlert2
import withReactContent from 'sweetalert2-react-content'; // Importa la función withReactContent para usar componentes de React en las alertas

// Crea una instancia de SweetAlert2 con soporte para componentes de React
const MySwal = withReactContent(Swal);

// Función para mostrar una alerta de confirmación de eliminación
const DeleteConfirmation = ({ title, text, confirmButtonText, onDelete }) => {
    // Muestra la alerta de SweetAlert2 con los parámetros proporcionados o valores por defecto
    MySwal.fire({
        title: title || 'Are you sure?', // Título de la alerta
        text: text || "You won't be able to revert this!", // Texto de la alerta
        icon: 'warning', // Icono de la alerta
        showCancelButton: true, // Muestra el botón de cancelar
        confirmButtonColor: '#3085d6', // Color del botón de confirmación
        cancelButtonColor: '#d33', // Color del botón de cancelar
        confirmButtonText: confirmButtonText || 'Yes, delete it!', // Texto del botón de confirmación
    }).then((result) => {
        // Agrega un listener a la alerta para saber si se ha confirmado la eliminación
        if (result.isConfirmed) {
            // Si el usuario confirmó la eliminación, muestra una alerta de éxito y llama a la función onDelete si se proporcionó
            Swal.fire('Eliminado!', 'Tu registro fue eliminado.', 'success');
            if (onDelete) {
                onDelete();
            }
        }
    });
};

// Función para mostrar una alerta de error
const ShowErrorAlert = ({ title, text, footer }) => {
    // Muestra la alerta de SweetAlert2 con los parámetros proporcionados o valores por defecto
    MySwal.fire({
        icon: 'error', // Icono de la alerta
        title: title || 'Oops...', // Título de la alerta
        text: text || 'Something went wrong!', // Texto de la alerta
        footer: footer || '', // Texto adicional en la alerta
    });
};

// Función para mostrar una alerta de éxito
const ShowSuccessAlert = ({ title }) => {
    // Muestra la alerta de SweetAlert2 con los parámetros proporcionados o valores por defecto
    MySwal.fire({
        position: 'top-end', // Posición de la alerta
        icon: 'success', // Icono de la alerta
        title: title || 'Your work has been saved', // Título de la alerta
        showConfirmButton: false, // Oculta el botón de confirmación
        timer: 2000, // Duración de la alerta en milisegundos
    });
};

// Exporta las funciones para usarlas en otros módulos
export { DeleteConfirmation, ShowErrorAlert, ShowSuccessAlert };
