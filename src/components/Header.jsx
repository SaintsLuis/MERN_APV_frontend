/** Componente Header */
/** Este componente representa la barra de navegación superior en la aplicación y muestra un título y enlaces a las páginas de pacientes y perfil, así como un botón para cerrar la sesión del usuario. Se importa la función cerrarSesion del custom hook useAuth, que se encarga de manejar la autenticación del usuario. */

import { Link } from 'react-router-dom';
import useAuth from '../hooks/useAuth';

function Header() {
    const { cerrarSesion } = useAuth(); // Importa la función cerrarSesion del custom hook useAuth

    return (
        <header className='py-10 bg-indigo-600'>
            <div className='container mx-auto flex flex-col lg:flex-row justify-between items-center'>
                {/* Título */}
                <h1 className='font-bold text-2xl text-indigo-200 text-center'>
                    Administrador de Pacientes de {''} <span className='text-white font-black'>Veterinaria</span>
                </h1>

                {/* Navegación */}
                <nav className='flex flex-col items-center lg:flex-row gap-4 mt-5 lg:mt-0'>
                    {/* Enlace a la página de pacientes */}
                    <Link to='/admin' className='text-white text-sm uppercase font-bold'>
                        Pacientes
                    </Link>

                    {/* Enlace a la página de perfil */}
                    <Link to='/admin/perfil' className='text-white text-sm uppercase font-bold'>
                        Perfil
                    </Link>

                    {/* Botón para cerrar sesión */}
                    <button type='button' className='text-white text-sm uppercase font-bold' onClick={cerrarSesion}>
                        Cerrar Sesión
                    </button>
                </nav>
            </div>
        </header>
    );
}

export default Header;
