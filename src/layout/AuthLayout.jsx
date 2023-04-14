/** layout AuthLayout */
/**En este archivo se define un componente llamado AuthLayout que sirve como una plantilla para la parte visual de las rutas que requieren autenticación. En lugar de definir el contenido de las rutas dentro del componente, se utiliza el componente Outlet de react-router-dom para renderizar el contenido de la ruta hija que esté siendo accedida. */

import { Outlet } from 'react-router-dom';

// Definición del componente AuthLayout | Master Page
const AuthLayout = () => {
    // Renderiza el componente Outlet que mostrará el contenido de la ruta hija que esté siendo accedida
    return (
        <>
            <main className='container mx-auto grid md:grid-cols-2 mt-12 gap-10 p-6 items-center'>
                <Outlet />
            </main>
        </>
    );
};

// Exporta el componente AuthLayout para ser utilizado en otras partes de la aplicación
export default AuthLayout;
