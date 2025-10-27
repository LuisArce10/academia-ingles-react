import React from 'react';
import Layout from '../components/layout';

function Estudiante() {
  const usuario = localStorage.getItem('usuario');

  const naranjaEstudiante = '#FFA500';
  const fondoClaro = '#f8f9fa';

  return (
    <Layout requireAuth={true} allowedRoles={['alumno']}>
      <div className="text-center py-4 bg-white">
        <img
          src="/user.png"
          alt="Foto de perfil"
          className="rounded-circle mb-3"
          width="120"
        />
        <div
          className="alert text-center"
          style={{
            backgroundColor: '#FFFFFF',
            color: naranjaEstudiante,
            border: `2px solid ${naranjaEstudiante}`,
            fontWeight: 'bold',
            borderRadius: '8px',
          }}
        >
          Bienvenido, <strong>{usuario}</strong> al <strong>Panel del Estudiante</strong>
        </div>
      </div>

      <div
        className="container mt-5"
        style={{
          backgroundColor: fondoClaro,
          padding: '2rem',
          borderRadius: '10px',
        }}
      >
        <h2 className="mb-4" style={{ color: naranjaEstudiante }}>
          Área del Estudiante
        </h2>

        <div className="row mt-4">
         {[
            {
             titulo: 'Mis Cursos',
             descripcion: 'Accede a tus clases y materiales.',
              boton: 'Ir al módulo',
              icono: '📘',
             ruta: '/cursoalum',
            },
           {
              titulo: 'Pagos',
              descripcion: 'Revisa tus pagos y mensualidades.',
              boton: 'Ir al módulo',
             icono: '💳',
             ruta: '/pagos',
           },
           {
              titulo: 'Matricula',
              descripcion: 'Matriculate a los proximos cursos',
              boton: 'Ir al módulo',
             icono: '📝',
             ruta: '/matricula',
           },
        ].map((card, index) => (
            <div className="col-md-4 mb-4" key={index}>
             <div
               className="card border-0 shadow-lg h-100"
                style={{
                  borderLeft: `5px solid ${naranjaEstudiante}`,
                  borderRadius: '10px',
               }}
              >
                <div className="card-body d-flex flex-column justify-content-between">
                  <div>
                   <h5 className="card-title" style={{ color: naranjaEstudiante }}>
                      {card.icono} {card.titulo}
                    </h5>
                   <p className="card-text">{card.descripcion}</p>
                  </div>
                 <button
                   className="btn w-100 mt-3"
                      style={{
                      backgroundColor: naranjaEstudiante,
                      color: '#FFFFFF',
                      transition: '0.3s',
                   }}
                   onMouseOver={(e) => (e.target.style.backgroundColor = '#cc8400')}
                    onMouseOut={(e) => (e.target.style.backgroundColor = naranjaEstudiante)}
                   onClick={() => (window.location.href = card.ruta)}
                  >
                   {card.boton}
                 </button>
                </div>
             </div>
           </div>
          ))}
        </div>
      </div>
    </Layout>
  );
}

export default Estudiante;