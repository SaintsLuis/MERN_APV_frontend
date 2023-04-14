/**layout RutaProtegida */
/**En general, este componente se encarga de proteger una ruta y mostrar su contenido sólo si el usuario ha iniciado sesión. */

/** Master Page de /admin */
import { Outlet, Navigate } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import useAuth from '../hooks/useAuth';

function RutaProtegida() {
    const { auth, cargando } = useAuth(); // Obtenemos el objeto auth y cargando del hook useAuth

    if (cargando) return 'cargando...'; // Si cargando es verdadero, se muestra el mensaje "cargando..."

    return (
        <>
            {/* // Se muestra el componente Header */}
            <Header />
            {auth?._id ? ( // Si hay un objeto auth y este tiene un _id, se muestra el componente Outlet que contiene la página a la que se accedió
                <main className='container mx-auto mt-10'>
                    <Outlet />
                </main>
            ) : (
                // Si no hay un objeto auth o este no tiene un _id, se redirige a la página principal "/"
                <Navigate to='/' />
            )}
            {/* // Se muestra el componente Footer */}
            <Footer />
        </>
    );
}

export default RutaProtegida; // Se exporta el componente RutaProtegida
