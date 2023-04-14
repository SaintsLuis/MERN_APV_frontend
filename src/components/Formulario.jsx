/** Componente Formulario */

import { useState, useEffect } from 'react';
import Alerta from './Alerta';
import { ShowSuccessAlert, ShowErrorAlert } from './SweetAlertsUtils'; // Importar funciones de SweetAlertsUtils
import usePacientes from '../hooks/usePacientes'; // Importar hook usePacientes desde usePacientes.js

function Formulario() {
    // Estado para el nombre de la mascota, Asi asignarlo a cada uno... | useState empieza vacio ('')
    const [nombre, setNombre] = useState('');
    const [propietario, setPropietario] = useState('');
    const [email, setEmail] = useState('');
    const [fecha, setFecha] = useState('');
    const [sintomas, setSintomas] = useState('');
    const [id, setId] = useState(null);

    // Llamar al hook usePacientes  y asignar guardarPaciente y paciente a variables
    const { guardarPaciente, paciente } = usePacientes();

    useEffect(() => {
        // Si paciente existe y tiene una propiedad nombre
        if (paciente?.nombre) {
            // Asignar paciente.nombre al estado nombre | Asi a cada uno...
            setNombre(paciente.nombre);
            setPropietario(paciente.propietario);
            setEmail(paciente.email);
            setFecha(paciente.fecha);
            setSintomas(paciente.sintomas);
            setId(paciente._id);
        }
    }, [paciente]); // Ejecutar el efecto cada vez que cambia paciente.

    const handleSubmit = (e) => {
        e.preventDefault(); // Prevenir comportamiento por defecto del evento submit

        // Si algún estado está vacío....includes('')
        if ([nombre, propietario, email, fecha, sintomas].includes('')) {
            ShowErrorAlert({
                // Mostrar alerta de error con SweetAlertsUtils
                text: 'Todos los campos son Obligatorios', // Texto de la alerta
            });

            return; // Salir de la función | Detiene la ejecucion...
        }

        // Else | Llamar a la función guardarPaciente del hook usePacientes con los datos de los estados
        guardarPaciente({ nombre, propietario, email, fecha, sintomas, id });

        // Mostrar alerta de éxito con SweetAlertsUtils
        ShowSuccessAlert({
            title: 'Guardado Correctamente', // Título de la alerta
        });

        // Reiniciar el estado nombre...| Asi a cada uno...
        setNombre('');
        setPropietario('');
        setEmail('');
        setFecha('');
        setSintomas('');
        setId(null);
    };

    return (
        <>
            {/* Título del formulario */}
            <h2 className='font-black text-3xl text-center'>Administrador de Pacientes</h2>

            {/* Subtitulo */}
            <p className='text-xl mt-5 mb-10 text-center'>
                Añade tus pacientes y {''}
                <span className='text-indigo-600 font-bold'>Administralos</span>
            </p>

            {/* Formulario para agregar o editar paciente */}
            <form className='bg-white py-10 px-5 mb-10 lg:mb-0 shadow-md rounded-md' onSubmit={handleSubmit}>
                <div className='mb-5'>
                    {/* Campo de entrada para el Nombre de la Mascota */}
                    <label htmlFor='nombre' className='text-gray-700 uppercase font-bold'>
                        Nombre Mascota
                    </label>
                    <input
                        id='nombre'
                        type='text'
                        placeholder='Nombre de la Mascota'
                        className='border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md'
                        value={nombre}
                        onChange={(e) => setNombre(e.target.value)}
                    />
                </div>

                <div className='mb-5'>
                    {/* Campo de entrada para el Nombre del Propietario */}
                    <label htmlFor='propietario' className='text-gray-700 uppercase font-bold'>
                        Nombre Propietario
                    </label>
                    <input
                        id='propietario'
                        type='text'
                        placeholder='Nombre Propietario'
                        className='border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md'
                        value={propietario}
                        onChange={(e) => setPropietario(e.target.value)}
                    />
                </div>

                <div className='mb-5'>
                    {/* Campo de entrada para el Email del propietario */}
                    <label htmlFor='email' className='text-gray-700 uppercase font-bold'>
                        Email Propietario
                    </label>
                    <input
                        id='email'
                        type='text'
                        placeholder='Email Propietario'
                        className='border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md'
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </div>

                <div className='mb-5'>
                    {/* Campo de entrada para la Fecha de alta */}
                    <label htmlFor='fecha' className='text-gray-700 uppercase font-bold'>
                        Fecha Alta
                    </label>
                    <input
                        id='fecha'
                        type='date'
                        className='border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md'
                        value={fecha}
                        onChange={(e) => setFecha(e.target.value)}
                    />
                </div>
                <div className='mb-5'>
                    {/* Campo de entrada para los Síntomas */}
                    <label htmlFor='sintomas' className='text-gray-700 uppercase font-bold'>
                        Sintomas
                    </label>
                    <textarea
                        id='sintomas'
                        placeholder='Describe los Sintomas'
                        className='border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md'
                        value={sintomas}
                        onChange={(e) => setSintomas(e.target.value)}
                    />
                </div>

                {/* Botón para enviar el formulario | En value= tiene un valor condicional, si el paciente ya tiene un id el texto es 'Guardar Cambios' else 'Agregar Paciente*/}
                <input
                    type='submit'
                    className='bg-indigo-600 w-full p-3 text-white uppercase font-bold hover:bg-indigo-700 cursor-pointer transition-colors'
                    value={id ? 'Guardar Cambios' : 'Agregar Paciente'}
                />
            </form>

            {/* {msg && <Alerta alerta={alerta} />} */}
        </>
    );
}

export default Formulario;
