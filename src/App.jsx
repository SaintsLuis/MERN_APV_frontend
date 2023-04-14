import { BrowserRouter, Routes, Route } from 'react-router-dom';
import AuthLayout from './layout/AuthLayout';
import RutaProtegida from './layout/RutaProtegida';

// Importamos los componentes de paginas
import Login from './paginas/Login';
import Registrar from './paginas/Registrar';
import OlvidePassword from './paginas/OlvidePassword';
import ConfirmarCuenta from './paginas/ConfirmarCuenta';
import NuevoPassword from './paginas/NuevoPassword';
import AdministrarPacientes from './paginas/AdministrarPacientes';

import EditarPerfil from './paginas/EditarPerfil';
import CambiarPassword from './paginas/CambiarPassword';

// Importamos los componentes de context
import { AuthProvider } from './context/AuthProvider';
import { PacientesProvider } from './context/PacientesProvider';

//  Aquí se define el componente App que es el componente PRINCIPAL de la aplicación.
function App() {
    return (
        // Se utiliza el componente BrowserRouter de react-router-dom para definir la navegación(las rutas) de la aplicación.
        <BrowserRouter>
            {/* Se utiliza el componente AuthProvider para definir la autenticación de la aplicación. */}
            <AuthProvider>
                {/* Se utiliza el componente PacientesProvider para proveer información de pacientes en la aplicación. */}
                <PacientesProvider>
                    {/* Se utiliza el componente Routes de react-router-dom para definir las rutas que la aplicación puede tomar. */}
                    <Routes>
                        {/* Se define la ruta principal de la aplicación, que utiliza el componente AuthLayout. Dentro de esta ruta, se definen rutas hijas (subrutas) utilizando el elemento Route. */}
                        <Route path='/' element={<AuthLayout />}>
                            <Route index element={<Login />} />
                            <Route path='registrar' element={<Registrar />} />
                            <Route path='olvide-password' element={<OlvidePassword />} />
                            <Route path='olvide-password/:token' element={<NuevoPassword />} />
                            <Route path='confirmar/:id' element={<ConfirmarCuenta />} />
                        </Route>

                        {/* la ruta /admin. Utiliza el componente RutaProtegida. Este componente se encarga de verificar si el usuario está autenticado y tiene permiso para acceder a esta página. */}
                        <Route path='/admin' element={<RutaProtegida />}>
                            <Route index element={<AdministrarPacientes />} />
                            <Route path='perfil' element={<EditarPerfil />} />
                            <Route path='cambiar-password' element={<CambiarPassword />} />
                        </Route>
                    </Routes>
                </PacientesProvider>
            </AuthProvider>
        </BrowserRouter>
    );
}

// Exportamos el componente App
export default App;
