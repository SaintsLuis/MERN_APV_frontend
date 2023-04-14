/** hooks useAuth */
/** Este hook llamado useAuth se utiliza para obtener los datos del contexto AuthContext en cualquier componente que lo requiera. Utiliza la función useContext de React para obtener los datos del contexto de AuthProvider y los devuelve. Luego, se puede utilizar en cualquier componente para acceder a los datos de autenticación. */

import { useContext } from 'react';
import AuthContext from '../context/AuthProvider';

// Este hook utiliza el useContext de React para obtener los datos del contexto de AuthProvider y los devuelve
const useAuth = () => {
    return useContext(AuthContext);
};

export default useAuth;
