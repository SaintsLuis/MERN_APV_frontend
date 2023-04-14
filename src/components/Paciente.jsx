/** Componente Paciente */

import usePacientes from '../hooks/usePacientes';

const Paciente = ({ paciente }) => {
    // Importamos las funciones y variables que necesitamos del hook usePacientes
    const { setEdicion, eliminarPaciente } = usePacientes();

    // Extraemos las propiedades del paciente que estamos mostrando
    const { email, fecha, nombre, propietario, sintomas, _id } = paciente;

    // Función que formatea la fecha para mostrarla de forma más amigable
    const formatearFecha = (fecha) => {
        const nuevaFecha = new Date(fecha);
        return new Intl.DateTimeFormat('es-ES', { dateStyle: 'long' }).format(nuevaFecha);
    };

    // Componente que muestra los detalles del paciente
    return (
        <>
            <div className='mx-5 my-10 bg-white shadow-md px-5 py-8 rounded-xl'>
                <p className='font-bold uppercase text-indigo-700 my-2'>
                    Nombre: {''}
                    <span className='font-normal normal-case text-black'>{nombre}</span>
                </p>

                <p className='font-bold uppercase text-indigo-700 my-2'>
                    Propietario: {''}
                    <span className='font-normal normal-case text-black'>{propietario}</span>
                </p>

                <p className='font-bold uppercase text-indigo-700 my-2'>
                    Email Contacto: {''}
                    <span className='font-normal normal-case text-black'>{email}</span>
                </p>

                <p className='font-bold uppercase text-indigo-700 my-2'>
                    Fecha de Alta: {''}
                    <span className='font-normal normal-case text-black'>{formatearFecha(fecha)}</span>
                </p>

                <p className='font-bold uppercase text-indigo-700 my-2'>
                    Sintomas: {''}
                    <span className='font-normal normal-case text-black'>{sintomas}</span>
                </p>

                <div className='flex justify-between my-5'>
                    {/* Botón que llama a la función setEdicion del hook usePacientes para editar el paciente */}
                    <button
                        type='button'
                        className='py-2 px-10 bg-indigo-600 hover:bg-indigo-700 text-white uppercase font-bold rounded-lg'
                        onClick={() => setEdicion(paciente)}
                    >
                        Editar
                    </button>

                    {/* Botón que llama a la función eliminarPaciente del hook usePacientes para eliminar el paciente */}
                    <button
                        type='button'
                        className='py-2 px-10 bg-red-600 hover:bg-red-700 text-white uppercase font-bold rounded-lg'
                        onClick={() => eliminarPaciente(_id)}
                    >
                        Eliminar
                    </button>
                </div>
            </div>
        </>
    );
};

export default Paciente;
