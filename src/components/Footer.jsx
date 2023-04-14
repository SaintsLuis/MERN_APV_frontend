/** Componente Footer */
// Este componente muestra el título del Footer en la página, que indica el nombre del sistema y la institución a la que pertenece. El título se muestra dentro de un footer con una clase CSS y está compuesto por un texto y un span con una clase de color para resaltar una parte del texto.

function Footer() {
    return (
        <footer className='py-10'>
            <p className='text-center font-bold'>
                APV - Administrador de Pacientes de {''} <span className='text-indigo-600'>Veterinaria</span>
            </p>
            <p className='text-center font-bold'>
                by: {''} <span className='text-indigo-600'>Luis M Santos</span>
            </p>
        </footer>
    );
}

export default Footer;
