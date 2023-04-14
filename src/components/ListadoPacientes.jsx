/** Componente Listado Pacientes */

import usePacientes from '../hooks/usePacientes'; // Importamos el hook usePacientes, el cual nos provee la lista de pacientes
import Paciente from './Paciente'; // Importamos el componente Paciente, el cual se utilizará para renderizar cada paciente de la lista

const ListadoPacientes = () => {
    const { pacientes } = usePacientes(); // Utilizamos el hook usePacientes para obtener la lista de pacientes

    return (
        <>
            {/* Si hay pacientes en la lista | Usamos condicional con ? */}
            {pacientes.length ? (
                <>
                    <h2 className='font-black text-3xl text-center'>Listado Pacientes</h2>

                    <p className='text-xl mt-5 mb-10 text-center'>
                        Administra tus {''}
                        <span className='text-indigo-600 font-bold'>Pacientes y Citas</span>
                    </p>

                    {/* Iteramos sobre la lista de pacientes y renderizamos un componente Paciente para cada uno */}
                    {pacientes.map((paciente) => (
                        <Paciente key={paciente._id} paciente={paciente} />
                    ))}
                </>
            ) : (
                /* Si no hay (:) pacientes en la lista */
                <>
                    <h2 className='font-black text-3xl text-center'>No Hay Pacientes</h2>

                    <p className='text-xl mt-5 mb-10 text-center'>
                        Comienza agregando pacientes {''}
                        <span className='text-indigo-600 font-bold'>y aparecerán en este lugar</span>
                    </p>
                </>
            )}
        </>
    );
};

export default ListadoPacientes;
