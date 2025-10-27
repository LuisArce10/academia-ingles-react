import React, { useEffect, useState } from 'react';
import Layout from '../components/layout';

function Cursos() {
  const usuario = localStorage.getItem('usuario');
  const usuarioId = localStorage.getItem('usuario_id');

  const azulDocente = '#007BFF';
  const fondoClaro = '#f8f9fa';

  const [curso, setCurso] = useState(null);
  const [materiales, setMateriales] = useState([]);
  const [titulo, setTitulo] = useState('');
  const [tipo, setTipo] = useState('');
  const [url, setUrl] = useState('');
  const [mensaje, setMensaje] = useState('');

  useEffect(() => {
    const obtenerCursoYMateriales = async () => {
      try {
        const token = localStorage.getItem('token');

        const resCurso = await fetch(`http://localhost:3000/api/cursos?usuario_id=${usuarioId}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        const dataCurso = await resCurso.json();
        setCurso(dataCurso[0] || null);

        if (dataCurso[0]) {
          const resMateriales = await fetch(
            `http://localhost:3000/api/materiales/${dataCurso[0].curso_id}`,
            { headers: { Authorization: `Bearer ${token}` } }
          );
          const dataMateriales = await resMateriales.json();
          setMateriales(dataMateriales);
        }
      } catch (err) {
        console.error(err);
      }
    };

    obtenerCursoYMateriales();
  }, [usuarioId]);

  const handleSubirMaterial = async () => {
    try {
      const token = localStorage.getItem('token');
      if (!titulo || !tipo || !url) {
        setMensaje('Completa todos los campos');
        return;
      }

      const res = await fetch('http://localhost:3000/api/materiales', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          curso_id: curso.curso_id,
          tipo,
          titulo,
          url,
        }),
      });

      if (res.ok) {
        setMensaje('¡Material agregado con éxito! 🎉');
        setTitulo('');
        setTipo('');
        setUrl('');

        const resMateriales = await fetch(`http://localhost:3000/api/materiales/${curso.curso_id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        const dataMateriales = await resMateriales.json();
        setMateriales(dataMateriales);
      } else {
        const errorData = await res.json();
        setMensaje(errorData.mensaje || 'Error al registrar material');
      }
    } catch (err) {
      console.error(err);
      setMensaje('Error al subir material');
    }
  };

  return (
    <Layout requireAuth={true} allowedRoles={['profesor']}>
      {/* Header */}
      <div
        className="d-flex align-items-center justify-content-between bg-white p-3 rounded shadow-sm"
        style={{ margin: '1rem 0' }}
      >
        <img
          src="/user.png"
          alt="Foto de perfil"
          className="rounded-circle"
          width="100"
          style={{ border: `3px solid ${azulDocente}` }}
        />
        <div style={{ marginLeft: '1rem', flex: 1 }}>
          <h2 style={{ color: azulDocente, marginBottom: '0.5rem' }}>
            Hola, {usuario}
          </h2>
          <p style={{ color: '#555', fontSize: '1rem', margin: 0 }}>
            Bienvenido al panel de tus cursos. Aquí puedes ver tu curso, gestionar materiales y mantener todo organizado de forma sencilla.
          </p>
        </div>
      </div>

      <div
        className="container mt-4 p-4 rounded shadow"
        style={{ backgroundColor: fondoClaro }}
      >
        {/* Curso */}
        {curso ? (
          <div
            className="p-3 mb-4 rounded shadow-sm"
            style={{ borderLeft: `5px solid ${azulDocente}`, backgroundColor: '#fff' }}
          >
            <h3 style={{ color: azulDocente }}>{curso.nombre}</h3>
            <p><strong>Código:</strong> {curso.codigo}</p>
            <p><strong>Nivel:</strong> {curso.nivel}</p>
            <p><strong>Duración:</strong> {curso.duracion}</p>
            <p><strong>Descripción:</strong> {curso.descripcion}</p>
            <p><strong>Estado:</strong> {curso.estado ? 'Activo' : 'Inactivo'}</p>
          </div>
        ) : (
          <p className="text-center text-muted">No tienes un curso asignado.</p>
        )}

        {/* Materiales */}
        <h4 className="mb-3" style={{ color: azulDocente }}>📝 Materiales</h4>
        <div className="row">
          {materiales.length > 0 ? (
            materiales.map((m) => (
              <div className="col-md-4 mb-3" key={m.material_id}>
                <div
                  className="card shadow-sm h-100"
                  style={{ borderRadius: '10px', borderLeft: `4px solid ${azulDocente}` }}
                >
                  <div className="card-body d-flex flex-column justify-content-between">
                    <div>
                      <h5 style={{ color: azulDocente }}>{m.titulo}</h5>
                      <p style={{ fontSize: '0.9rem', color: '#555' }}>{m.tipo}</p>
                    </div>
                    <a
                      href={m.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn mt-2"
                      style={{ backgroundColor: azulDocente, color: '#fff' }}
                    >
                      Ver material
                    </a>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <p className="text-center text-muted w-100">No hay materiales registrados</p>
          )}
        </div>

        {/* Subir material */}
        <div className="mt-4 p-3 rounded shadow-sm" style={{ backgroundColor: '#fff', borderLeft: `5px solid ${azulDocente}` }}>
          <h5 style={{ color: azulDocente }}>➕ Subir nuevo material</h5>
          <input
            type="text"
            placeholder="Título"
            className="form-control mb-2"
            value={titulo}
            onChange={(e) => setTitulo(e.target.value)}
          />
          <input
            type="text"
            placeholder="Tipo (PDF, Video, etc.)"
            className="form-control mb-2"
            value={tipo}
            onChange={(e) => setTipo(e.target.value)}
          />
          <input
            type="text"
            placeholder="URL del material"
            className="form-control mb-2"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
          />
          <button
            className="btn mt-2"
            style={{ backgroundColor: azulDocente, color: '#fff' }}
            onClick={handleSubirMaterial}
          >
            Subir material
          </button>
          {mensaje && <p className="mt-2 text-success">{mensaje}</p>}
        </div>

        <div className="text-center mt-4">
          <button
            className="btn"
            style={{ backgroundColor: azulDocente, color: 'white', borderRadius: '6px' }}
            onClick={() => (window.location.href = '/docente')}
          >
            ← Volver
          </button>
        </div>
      </div>
    </Layout>
  );
}

export default Cursos;
