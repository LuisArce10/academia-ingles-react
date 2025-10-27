import React, { useState } from "react";
import { Link } from "react-router-dom";  
import Navbar from '../components/navBar';
import Footer from '../components/footer';

function Registro() {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    nombre: "",
    apellido: "",
    correo: "",
    telefono: "",
    direccion: "",
    fecha_nacimiento: "",
  });

  const [mensaje, setMensaje] = useState("");
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMensaje("");
    setError("");

    try {
      const res = await fetch("http://localhost:3000/api/usuarios/registro", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (res.ok) {
        setMensaje(data.mensaje);
        setFormData({
          username: "",
          password: "",
          nombre: "",
          apellido: "",
          correo: "",
          telefono: "",
          direccion: "",
          fecha_nacimiento: "",
        });
      } else {
        setError(data.mensaje || "Error al registrar");
      }
    } catch (err) {
      setError("Error de conexión con el servidor");
    }
  };

  return (
    <>
      <Navbar />

      <div className="container mt-5" style={{ maxWidth: "600px" }}>
        <h2 className="text-center mb-4" style={{ color: "#007bff" }}>
          Registro de Estudiante
        </h2>
        <form onSubmit={handleSubmit} className="shadow p-4 bg-white rounded">
          <div className="mb-3">
            <label className="form-label">Nombre:</label>
            <input
              type="text"
              name="nombre"
              className="form-control"
              value={formData.nombre}
              onChange={handleChange}
              required
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Apellido:</label>
            <input
              type="text"
              name="apellido"
              className="form-control"
              value={formData.apellido}
              onChange={handleChange}
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Correo:</label>
            <input
              type="email"
              name="correo"
              className="form-control"
              value={formData.correo}
              onChange={handleChange}
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Teléfono:</label>
            <input
              type="text"
              name="telefono"
              className="form-control"
              value={formData.telefono}
              onChange={handleChange}
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Dirección:</label>
            <input
              type="text"
              name="direccion"
              className="form-control"
              value={formData.direccion}
              onChange={handleChange}
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Fecha de nacimiento:</label>
            <input
              type="date"
              name="fecha_nacimiento"
              className="form-control"
              value={formData.fecha_nacimiento}
              onChange={handleChange}
            />
          </div>

          <hr />
          <div className="mb-3">
            <label className="form-label">Usuario:</label>
            <input
              type="text"
              name="username"
              className="form-control"
              value={formData.username}
              onChange={handleChange}
              required
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Contraseña:</label>
            <input
              type="password"
              name="password"
              className="form-control"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </div>

          <button type="submit" className="btn btn-primary w-100">
            Registrarse
          </button>

          {mensaje && <div className="alert alert-success mt-3">{mensaje}</div>}
          {error && <div className="alert alert-danger mt-3">{error}</div>}

        <div className="text-center mt-3">
            <p className="mb-0">
                ¿Ya tienes una cuenta?{' '}
                <Link to="/" style={{ color: '#007bff', fontWeight: 'bold', textDecoration: 'none' }}>
                     Inicia sesión
                </Link>
            </p>
        </div>
        </form>
      </div>

      <Footer />
    </>
  );
}

export default Registro;
