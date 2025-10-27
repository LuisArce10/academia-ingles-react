import React from 'react';
import Navbar from '../components/navBar';  
import Footer from '../components/footer';  
function Index() {
  const idiomas = [
    { nombre: 'Inglés', precio: 'S/ 150 mensual', nivel: 'Básico a avanzado' },
    { nombre: 'Francés', precio: 'S/ 180 mensual', nivel: 'Inicial a intermedio' },
    { nombre: 'Alemán', precio: 'S/ 200 mensual', nivel: 'Desde cero' },
  ];

  return (
    <>
      <Navbar />

      <div
        style={{
          backgroundImage: 'url("/images/Fondo.png")',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          minHeight: '60vh',
          paddingTop: '100px',
          paddingBottom: '60px',
          color: '#105488ff',
          textAlign: 'center',
        }}
      >
        <div className="container">
          <h1 className="display-4 fw-bold">Bienvenido a ENGLISH ACADEMY</h1>
          <h2 className="lead">Y una nueva forma de aprender inglés comienza aquí.</h2>
          <p className="lead">Con nosotros aprenderás idiomas de forma divertida y efectiva.</p>
          <div className="d-flex justify-content-center gap-3 mt-4">
            <a href="/matricula" className="btn btn-success btn-lg px-4">Matricúlate ahora</a>
            <a href="/login" className="btn btn-outline-light btn-lg px-4">Soy profesor</a>
          </div>
        </div>
      </div>

      <div className="container py-5">
        <h2 className="text-center mb-4 text-success">Idiomas disponibles</h2>
        <div className="row">
          {idiomas.map((idioma, index) => (
            <div className="col-md-4 mb-4" key={index}>
              <div className="card shadow-sm h-100">
                <div className="card-body text-center">
                  <h5 className="card-title text-success">{idioma.nombre}</h5>
                  <p className="card-text">{idioma.nivel}</p>
                  <p className="fw-bold">{idioma.precio}</p>
                  <a href="/matricula" className="btn btn-dark">Inscribirme</a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <Footer />
    </>
  );
}

export default Index;