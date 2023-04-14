/**Componente Alerta */
// Este componente muestra una alerta en pantalla con un mensaje y un estilo degradado que varía dependiendo si se trata de una alerta de error o no. El mensaje se recibe como una propiedad del componente (alerta.msg) y se muestra dentro de un div con estilos CSS que se ajustan a la clase de alerta.

const Alerta = ({ alerta }) => {
    return (
        <>
            <div
                className={`${
                    alerta.error ? 'from-red-400 to-red-600' : 'from-indigo-400 to-indigo-600'
                } bg-gradient-to-br text-center p-3 rounded-xl uppercase text-white font-bold text-sm mb-10 `}
            >
                {/* // Mensaje que se muestra en la alerta */}
                {alerta.msg}
            </div>
        </>
    );
};

export default Alerta;
