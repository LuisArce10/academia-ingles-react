import React from 'react';
import Layout from '../components/layout';

function Docente() {
  const usuario = localStorage.getItem('usuario');

  const azulDocente = '#007BFF';
  const fondoClaro = '#f8f9fa';

  return (
    <Layout requireAuth={true} allowedRoles={['profesor']}>
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
            color: azulDocente,
            border: `2px solid ${azulDocente}`,
            fontWeight: 'bold',
            borderRadius: '8px',
          }}
        >
          Bienvenido, <strong>{usuario}</strong> al <strong>Panel Docente</strong>
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
        <h2 className="mb-4" style={{ color: azulDocente }}>
          Herramientas del Docente
        </h2>

        {/* Cards */}
        <div className="row mt-4">
          {[
            {
              titulo: 'Mis Cursos',
              descripcion: 'Visualiza tu curso y sube materiales.',
              boton: 'Ir al módulo',
              icono: '📚',
              ruta: '/cursos',
            },
            {
              titulo: 'Evaluaciones',
              descripcion: 'Crea y revisa exámenes.',
              boton: 'Ir al módulo',
              icono: '📝',
              ruta: '/evaluaciones',
            },
            {
              titulo: 'Asistencia',
              descripcion: 'Registra y consulta asistencia.',
              boton: 'Ir al módulo',
              icono: '📅',
              ruta: '/asistencia',
            },
          ].map((card, index) => (
            <div className="col-md-4 mb-4" key={index}>
              <div
                className="card border-0 shadow-lg h-100"
                style={{
                  borderLeft: `5px solid ${azulDocente}`,
                  borderRadius: '10px',
                }}
              >
                <div className="card-body d-flex flex-column justify-content-between">
                  <div>
                    <h5 className="card-title" style={{ color: azulDocente }}>
                      {card.icono} {card.titulo}
                    </h5>
                    <p className="card-text">{card.descripcion}</p>
                  </div>
                  <button
                    className="btn w-100 mt-3"
                    style={{
                      backgroundColor: azulDocente,
                      color: '#FFFFFF',
                      transition: '0.3s',
                    }}
                    onMouseOver={(e) => (e.target.style.backgroundColor = '#0056b3')}
                    onMouseOut={(e) => (e.target.style.backgroundColor = azulDocente)}
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

export default Docente;
