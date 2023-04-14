/** hooks usePacientes */
/** Este hook se utiliza para obtener el estado y las funciones del contexto 'PacientesContext' desde cualquier componente sin tener que pasarlas como props. Para ello, utiliza el hook useContext de React para acceder al contexto 'PacientesContext' y luego devuelve su valor. */

// Importamos el hook 'useContext' de React
import { useContext } from 'react';

// Importamos el contexto 'PacientesContext'
import PacientesContext from '../context/PacientesProvider';

// Creamos un custom hook llamado 'usePacientes'
const usePacientes = () => {
    // Utilizamos el hook 'useContext' para obtener el estado y las funciones del contexto 'PacientesContext'
    return useContext(PacientesContext);
};

// Exportamos el custom hook 'usePacientes'
export default usePacientes;
