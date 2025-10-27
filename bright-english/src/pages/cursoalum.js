import React, { useEffect, useState } from 'react';
import Layout from '../components/layout';

function CursoAlum() {
  const usuario = localStorage.getItem('usuario');
  const usuarioId = localStorage.getItem('usuario_id');

  const naranjaAlum = '#FFA500';
  const fondoClaro = '#f8f9fa';

  const [cursos, setCursos] = useState([]);
  const [materiales, setMateriales] = useState({});
  const [mensaje, setMensaje] = useState('');

  useEffect(() => {
    const obtenerCursosYMateriales = async () => {
      try {
        const token = localStorage.getItem('token');

        const resCursos = await fetch(`http://localhost:3000/api/cursos?usuario_id=${usuarioId}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        const dataCursos = await resCursos.json();
        setCursos(dataCursos);

        
        const matPromises = dataCursos.map(async (curso) => {
          const resMat = await fetch(`http://localhost:3000/api/materiales/${curso.curso_id}`, {
            headers: { Authorization: `Bearer ${token}` },
          });
          const dataMat = await resMat.json();
          return { [curso.curso_id]: dataMat };
        });

        const matResults = await Promise.all(matPromises);
        const matObj = Object.assign({}, ...matResults);
        setMateriales(matObj);

      } catch (err) {
        console.error(err);
        setMensaje('Error al cargar cursos o materiales');
      }
    };

    obtenerCursosYMateriales();
  }, [usuarioId]);

  return (
    <Layout requireAuth={true} allowedRoles={['alumno']}>
<div
        className="d-flex align-items-center justify-content-between bg-white p-3 rounded shadow-sm"
        style={{ margin: '1rem 0' }}
      >
        <img
          src="/user.png"
          alt="Foto de perfil"
          className="rounded-circle"
          width="100"
          style={{ border: `3px solid ${naranjaAlum}` }}
        />
        <div style={{ marginLeft: '1rem', flex: 1 }}>
          <h2 style={{ color: naranjaAlum, marginBottom: '0.5rem' }}>
            Hola, {usuario} 
          </h2>
          <p style={{ color: '#555', fontSize: '1rem', margin: 0 }}>
            Bienvenido al panel de tus cursos. Aquí puedes ver tus cursos y acceder a los materiales de cada uno de forma sencilla.
          </p>
        </div>
      </div>

      <div
        className="container mt-5"
        style={{ backgroundColor: fondoClaro, padding: '2rem', borderRadius: '10px' }}
      >
        <h2 className="mb-4" style={{ color: naranjaAlum }}>Mis Cursos</h2>

        {cursos.length === 0 && <p className="text-center text-muted">No tienes cursos asignados.</p>}

        {cursos.map((curso) => (
          <div key={curso.curso_id} className="mb-4 p-3 rounded shadow-sm" style={{ backgroundColor: '#fff', borderLeft: `5px solid ${naranjaAlum}` }}>
            <h3 style={{ color: naranjaAlum }}>{curso.nombre}</h3>
            <p><strong>Código:</strong> {curso.codigo}</p>
            <p><strong>Nivel:</strong> {curso.nivel}</p>
            <p><strong>Duración:</strong> {curso.duracion}</p>
            <p><strong>Descripción:</strong> {curso.descripcion}</p>

            <h5 style={{ color: naranjaAlum, marginTop: '1rem' }}>📝 Materiales</h5>
            <div className="row">
              {materiales[curso.curso_id] && materiales[curso.curso_id].length > 0 ? (
                materiales[curso.curso_id].map((m) => (
                  <div className="col-md-4 mb-3" key={m.material_id}>
                    <div className="card shadow-sm h-100" style={{ borderRadius: '10px', borderLeft: `4px solid ${naranjaAlum}` }}>
                      <div className="card-body d-flex flex-column justify-content-between">
                        <div>
                          <h6 style={{ color: naranjaAlum }}>{m.titulo}</h6>
                          <p style={{ fontSize: '0.9rem', color: '#555' }}>{m.tipo}</p>
                        </div>
                        <a
                          href={m.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="btn mt-2"
                          style={{ backgroundColor: naranjaAlum, color: '#fff' }}
                        >
                          Ver material
                        </a>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <p className="text-center text-muted w-100">No hay materiales para este curso</p>
              )}
            </div>
          </div>
        ))}
      </div>
    </Layout>
  );
}

export default CursoAlum;
