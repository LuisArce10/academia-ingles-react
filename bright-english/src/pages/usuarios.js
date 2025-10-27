import React, { useEffect, useState } from 'react';
import Layout from '../components/layout';

function Usuarios() {
  const [usuarios, setUsuarios] = useState([]);
  const [nuevoUsuario, setNuevoUsuario] = useState({
    username: '',
    password: '',
    rol: 'alumno',
  });
  const [editando, setEditando] = useState(null);
  const [mensaje, setMensaje] = useState('');

  const verdeAcademico = '#2E8B57';
  const negroElegante = '#1C1C1C';
  const fondoClaro = '#f8f9fa';

  useEffect(() => {
    obtenerUsuarios();
  }, []);

  const obtenerUsuarios = async () => {
    try {
      const token = localStorage.getItem('token');
      const res = await fetch('http://localhost:3000/api/usuarios', {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      setUsuarios(data);
    } catch (error) {
      console.error('Error al obtener usuarios:', error);
    }
  };

  const handleCrearUsuario = async () => {
    try {
      const token = localStorage.getItem('token');
      const res = await fetch('http://localhost:3000/api/usuarios', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(nuevoUsuario),
      });
      const data = await res.json();
      setMensaje(data.mensaje);
      setNuevoUsuario({ username: '', password: '', rol: 'alumno' });
      obtenerUsuarios();
    } catch (error) {
      console.error('Error al crear usuario:', error);
    }
  };

  const handleActualizarUsuario = async () => {
    try {
      const token = localStorage.getItem('token');
      const res = await fetch(`http://localhost:3000/api/usuarios/${editando.usuario_id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(editando),
      });
      const data = await res.json();
      setMensaje(data.mensaje);
      setEditando(null);
      obtenerUsuarios();
    } catch (error) {
      console.error('Error al actualizar usuario:', error);
    }
  };

  const handleEliminarUsuario = async (id) => {
    if (!window.confirm('¿Seguro que deseas eliminar este usuario?')) return;
    try {
      const token = localStorage.getItem('token');
      const res = await fetch(`http://localhost:3000/api/usuarios/${id}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      setMensaje(data.mensaje);
      obtenerUsuarios();
    } catch (error) {
      console.error('Error al eliminar usuario:', error);
    }
  };

  return (
    <Layout requireAuth={true} allowedRoles={['admin']}>
      <div className="container mt-5">
        <h2 className="mb-4" style={{ color: verdeAcademico }}>
          👥 Gestión de Usuarios
        </h2>

        {mensaje && <div className="alert alert-info">{mensaje}</div>}

        {/* Formulario */}
        <div
          className="card mb-4 shadow-sm"
          style={{ borderLeft: `5px solid ${verdeAcademico}`, borderRadius: '10px' }}
        >
          <div className="card-body">
            <h5 className="card-title">
              {editando ? 'Editar Usuario' : 'Registrar Nuevo Usuario'}
            </h5>

            <div className="row g-3">
              <div className="col-md-3">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Usuario"
                  value={editando ? editando.username : nuevoUsuario.username}
                  onChange={(e) =>
                    editando
                      ? setEditando({ ...editando, username: e.target.value })
                      : setNuevoUsuario({ ...nuevoUsuario, username: e.target.value })
                  }
                />
              </div>
              <div className="col-md-3">
                <input
                  type="password"
                  className="form-control"
                  placeholder="Contraseña"
                  value={editando ? editando.password : nuevoUsuario.password}
                  onChange={(e) =>
                    editando
                      ? setEditando({ ...editando, password: e.target.value })
                      : setNuevoUsuario({ ...nuevoUsuario, password: e.target.value })
                  }
                />
              </div>
              <div className="col-md-3">
                <select
                  className="form-select"
                  value={editando ? editando.rol : nuevoUsuario.rol}
                  onChange={(e) =>
                    editando
                      ? setEditando({ ...editando, rol: e.target.value })
                      : setNuevoUsuario({ ...nuevoUsuario, rol: e.target.value })
                  }
                >
                  <option value="admin">Administrador</option>
                  <option value="profesor">Profesor</option>
                  <option value="alumno">Alumno</option>
                </select>
              </div>
              <div className="col-md-3">
                {editando ? (
                  <button className="btn btn-success w-100" onClick={handleActualizarUsuario}>
                    💾 Guardar Cambios
                  </button>
                ) : (
                  <button className="btn btn-primary w-100" onClick={handleCrearUsuario}>
                    ➕ Crear Usuario
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Tabla de usuarios */}
        <div className="table-responsive shadow-sm">
          <table className="table table-striped align-middle">
            <thead style={{ backgroundColor: verdeAcademico, color: 'white' }}>
              <tr>
                <th>ID</th>
                <th>Usuario</th>
                <th>Rol</th>
                <th>Estado</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {usuarios.map((u) => (
                <tr key={u.usuario_id}>
                  <td>{u.usuario_id}</td>
                  <td>{u.username}</td>
                  <td>{u.rol}</td>
                  <td>{u.estado ? 'Activo' : 'Inactivo'}</td>
                  <td>
                    <button
                      className="btn btn-warning btn-sm me-2"
                      onClick={() => setEditando(u)}
                    >
                      ✏️ Editar
                    </button>
                    <button
                      className="btn btn-danger btn-sm"
                      onClick={() => handleEliminarUsuario(u.usuario_id)}
                    >
                      🗑️ Eliminar
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </Layout>
  );
}

export default Usuarios;
