import React from 'react';
import Layout from '../components/layout';

function Admin() {
  const usuario = localStorage.getItem('usuario');

  const verdeAcademico = '#2E8B57';
  const negroElegante = '#1C1C1C';
  const fondoClaro = '#f8f9fa';

  return (
    <Layout requireAuth={true} allowedRoles={['admin']}>
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
            color: verdeAcademico,
            border: `2px solid ${verdeAcademico}`,
            fontWeight: 'bold',
            borderRadius: '8px',
          }}
        >
          Bienvenido, <strong>{usuario}</strong> a <strong>ENGLISH ACADEMY</strong>
        </div>
        
      </div>

      {/* Panel principal */}
      <div
        className="container mt-5"
        style={{
          backgroundColor: fondoClaro,
          padding: '2rem',
          borderRadius: '10px',
        }}
      >
        <h2 className="mb-4" style={{ color: verdeAcademico }}>
          Panel del Administrador
        </h2>

        {/* Cards */}
        <div className="row mt-4">
         {[
            {
             titulo: 'Gestión de Usuarios',
             descripcion: 'Crear, editar y eliminar cuentas.',
             boton: 'Ir al módulo',
             icono: '👥',
             ruta: '/usuarios'
           },
           {
             titulo: 'Reportes',
             descripcion: 'Visualizar estadísticas del sistema.',
             boton: 'Ver reportes',
             icono: '📊',
             ruta: '/reportes'
            },
           {
             titulo: 'Gestión de Pagos',
             descripcion: 'Administrar los pagos de los estudiantes.',
             boton: 'Ir al módulo',
             icono: '💳',
             ruta: '/pagos'
            }
         ].map((card, index) => (
           <div className="col-md-4 mb-4" key={index}>
              <div
               className="card border-0 shadow-lg h-100"
                style={{
                 borderLeft: `5px solid ${verdeAcademico}`,
                 borderRadius: '10px',
                }}
               >
                <div className="card-body d-flex flex-column justify-content-between">
                  <div>
                   <h5 className="card-title" style={{ color: verdeAcademico }}>
                      {card.icono} {card.titulo}
                        </h5>
                        <p className="card-text">{card.descripcion}</p>
                   </div>
                      <button
                     className="btn w-100 mt-3"
                      style={{
                     backgroundColor: negroElegante,
                     color: '#FFFFFF',
                      transition: '0.3s',
                    }}
                    onMouseOver={(e) => (e.target.style.backgroundColor = verdeAcademico)}
                   onMouseOut={(e) => (e.target.style.backgroundColor = negroElegante)}
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

export default Admin;