import { useEffect, useState } from 'react';
import AdminNav from '../components/AdminNav';
import useAuth from '../hooks/useAuth';
import { ShowErrorAlert, ShowSuccessAlert } from '../components/SweetAlertsUtils';

const EditarPerfil = () => {
    const { auth, actualizarPerfil } = useAuth();
    const [perfil, setPerfil] = useState({});

    useEffect(() => {
        setPerfil(auth);
    }, [auth]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        const { nombre, email } = perfil;

        // Validamos que los campos obligatorios estén completos
        if ([nombre, email].includes('')) {
            ShowErrorAlert({
                text: 'Email y Nombre son obligatorios',
            });
            return;
        }

        try {
            // Actualizamos el perfil del veterinario
            const resultado = await actualizarPerfil(perfil);

            // Si hubo un error, mostramos la alerta de error
            if (resultado.error) {
                // Ej de error pasandole a SweetAlert
                ShowErrorAlert({
                    text: resultado.error,
                });
            } else {
                // Si se actualizó correctamente, mostramos la alerta de éxito
                ShowSuccessAlert({
                    title: 'Almacenado Correctamente',
                });
            }
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <>
            <AdminNav />

            <h2 className='font-black text-3xl text-center mt-10'>Editar Perfil</h2>
            <p className='text-xl mt-5 mb-10 text-center'>
                Modifica tu {''}
                <span className='text-indigo-600 font-bold'>Información aqui</span>
            </p>

            <div className='flex justify-center'>
                <div className='w-full md:w-1/2 bg-white shadow rounded-lg p-5'>
                    <form onSubmit={handleSubmit}>
                        <div className='my-3'>
                            <label className='uppercase font-bold text-gray-600 '>Nombre</label>
                            <input
                                type='text'
                                className='border bg-gray-50 w-full p-2 mb-5 mt-1 rounded-lg'
                                name='nombre'
                                value={perfil.nombre || ''}
                                onChange={(e) =>
                                    setPerfil({
                                        ...perfil,
                                        [e.target.name]: e.target.value,
                                    })
                                }
                            />

                            <label className='uppercase font-bold text-gray-600'>Sitio Web</label>
                            <input
                                type='text'
                                className='border bg-gray-50 w-full p-2 mb-5 mt-1 rounded-lg'
                                name='web'
                                value={perfil.web || ''}
                                onChange={(e) =>
                                    setPerfil({
                                        ...perfil,
                                        [e.target.name]: e.target.value,
                                    })
                                }
                            />

                            <label className='uppercase font-bold text-gray-600'>Telefono</label>
                            <input
                                type='tel'
                                className='border bg-gray-50 w-full p-2 mb-5 mt-1 rounded-lg'
                                name='telefono'
                                value={perfil.telefono || ''}
                                onChange={(e) =>
                                    setPerfil({
                                        ...perfil,
                                        [e.target.name]: e.target.value,
                                    })
                                }
                            />

                            <label htmlFor='nombre' className='uppercase font-bold text-gray-600'>
                                Email
                            </label>
                            <input
                                type='email'
                                className='border bg-gray-50 w-full p-2 mb-5 mt-1 rounded-lg'
                                name='email'
                                value={perfil.email || ''}
                                onChange={(e) =>
                                    setPerfil({
                                        ...perfil,
                                        [e.target.name]: e.target.value,
                                    })
                                }
                            />
                        </div>

                        <input
                            type='submit'
                            value='Guardar Cambios'
                            className='bg-indigo-700 px-10 py-3 font-bold text-white rounded-lg uppercase w-full mt-5'
                        />
                    </form>
                </div>
            </div>
        </>
    );
};

export default EditarPerfil;
