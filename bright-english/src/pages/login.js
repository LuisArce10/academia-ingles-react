import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import Navbar from '../components/navBar';
import Footer from '../components/footer';

function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = async () => {
    if (!username || !password) {
      setError('Por favor completa todos los campos.');
      return;
    }

    try {
      const response = await fetch('http://localhost:3000/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
      });

      const data = await response.json();

      if (response.ok) {
       localStorage.setItem('usuario', data.usuario);
       localStorage.setItem('rol', data.rol);
       localStorage.setItem('token', data.token);

  
        if (data.usuario_id) {
          localStorage.setItem('usuario_id', data.usuario_id);
        } else {
          console.warn("El backend no devolvió 'usuario_id'");
        }

       if (data.rol === 'admin') navigate('/admin');
       else if (data.rol === 'profesor') navigate('/docente');
       else navigate('/estudiante');
      }
      else {
        setError(data.mensaje || 'Credenciales inválidas');
      }
    } catch (error) {
      console.error('Error al iniciar sesión:', error);
      setError('Error de conexión con el servidor');
    }
  };

  return (
    <>
      <Navbar />
      <div className="container py-5">
        <h2 className="text-center mb-4" style={{ color: '#f4c542' }}>
          Iniciar sesión
        </h2>
        <div className="row justify-content-center">
          <div className="col-md-6">
            <div className="shadow p-4 bg-white rounded">
              {error && <div className="alert alert-danger">{error}</div>}
              
              <div className="mb-3">
                <label className="form-label">Usuario</label>
                <input
                  type="text"
                  className="form-control"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="Ej. admin, profesor1, alumno1"
                />
              </div>

              <div className="mb-3">
                <label className="form-label">Contraseña</label>
                <input
                  type="password"
                  className="form-control"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Tu clave"
                />
              </div>

              <button
                className="btn w-100"
                style={{
                  backgroundColor: '#f4c542',
                  color: '#1f2231',
                  fontWeight: 'bold',
                  border: 'none',
                  transition: '0.3s',
                }}
                onMouseOver={(e) => (e.target.style.backgroundColor = '#e0b530')}
                onMouseOut={(e) => (e.target.style.backgroundColor = '#f4c542')}
                onClick={handleLogin}
              >
                Ingresar
              </button>

              {/* Enlace al registro */}
              <div className="text-center mt-3">
                <p className="mb-0">
                  ¿No tienes una cuenta?{' '}
                  <Link to="/registro" style={{ color: '#f4c542', fontWeight: 'bold', textDecoration: 'none' }}>
                    Regístrate aquí
                  </Link>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default Login;
