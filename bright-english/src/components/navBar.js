import React from 'react';

function Navbar() {
  const usuario = localStorage.getItem('usuario');
  const rol = localStorage.getItem('rol');

  const handleLogout = () => {
    localStorage.clear();
    window.location.href = '/';
  };

  const rutaInicio =
    rol === 'admin'
      ? '/admin'
      : rol === 'profesor'
      ? '/docente'
      : rol === 'alumno'
      ? '/estudiante'
      : '/index';

  return (
    <nav className="navbar navbar-expand-lg navbar-dark" style={{ backgroundColor: '#1f2231ff' }}>
      <div className="container-fluid">
        {/* Logo */}
        <a className="navbar-brand d-flex align-items-center" >
          <img
            src="\LogoBE1.png"
            alt="Logo"
            style={{
              height: '45px',
              width: '45px',
              marginRight: '10px',
              borderRadius: '50%', 
              objectFit: 'cover',
              border: '2px solid white',
            }}
          />
          <span className="fw-bold">ENGLISH ACADEMY</span>
        </a>

        {/* Botón responsive */}
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarContent"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        {/* Contenido del navbar */}
        <div className="collapse navbar-collapse" id="navbarContent">
          {/* Enlaces institucionales */}
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <a className="nav-link" href={rutaInicio}>Inicio</a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="/quienes-somos">Quiénes somos</a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="/contacto">Contacto</a>
            </li>
          </ul>
          
          {/* Usuario y logout*/}
          {usuario && (
            <>
              <span className="navbar-text me-3">👤 {usuario}</span>
              <button className="btn btn-outline-light" onClick={handleLogout}>
                Cerrar sesión
              </button>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}

export default Navbar;