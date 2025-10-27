import React, { useState, useEffect } from 'react';
import Layout from '../components/layout';

function Matricula() {
  const naranja = '#FFA500';
  const fondoClaro = '#f8f9fa';
  const usuario = localStorage.getItem('usuario');
  const token = localStorage.getItem('token');

  const [ciclos, setCiclos] = useState([]);
  const [cursos, setCursos] = useState([]);
  const [cursosSeleccionados, setCursosSeleccionados] = useState([]);
  const [cicloSeleccionado, setCicloSeleccionado] = useState('');
  const [mensaje, setMensaje] = useState('');

  useEffect(() => {
    const obtenerCiclos = async () => {
      try {
        const res = await fetch('http://localhost:3000/api/ciclos', {
          headers: { Authorization: `Bearer ${token}` },
        });
        const data = await res.json();
        setCiclos(data);
      } catch (error) {
        console.error('Error al obtener ciclos:', error);
      }
    };
    obtenerCiclos();
  }, [token]);
  useEffect(() => {
    const obtenerCursos = async () => {
      try {
        const res = await fetch('http://localhost:3000/api/cursos', {
          headers: { Authorization: `Bearer ${token}` },
        });
        const data = await res.json();
        setCursos(data);
      } catch (error) {
        console.error('Error al obtener cursos:', error);
      }
    };
    obtenerCursos();
  }, [token]);

  const manejarSeleccionCurso = (cursoId) => {
    setCursosSeleccionados((prev) =>
      prev.includes(cursoId)
        ? prev.filter((id) => id !== cursoId)
        : [...prev, cursoId]
    );
  };

  const manejarMatricula = async () => {
    if (!cicloSeleccionado || cursosSeleccionados.length === 0) {
      setMensaje('Por favor selecciona un ciclo y mínimo un curso.');
      return;
    }

    try {
      const estudianteRes = await fetch(`http://localhost:3000/api/usuarios/${usuario}/estudiante`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      const estudianteData = await estudianteRes.json();
      const estudiante_id = estudianteData.estudiante_id;

      const res = await fetch('http://localhost:3000/api/matriculas', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          estudiante_id,
          ciclo_id: parseInt(cicloSeleccionado),
          cursos: cursosSeleccionados,
        }),
      });

      const data = await res.json();
      if (res.ok) {
        setMensaje(`✅ ${data.mensaje}. Monto generado: S/ ${data.monto_generado}`);
        setCursosSeleccionados([]);
        setCicloSeleccionado('');
      } else {
        setMensaje(`❌ Error: ${data.mensaje}`);
      }
    } catch (error) {
      console.error('Error al registrar matrícula:', error);
      setMensaje('Error al conectar con el servidor.');
    }
  };

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
            color: naranja,
            border: `2px solid ${naranja}`,
            fontWeight: 'bold',
            borderRadius: '8px',
          }}
        >
          Bienvenido, <strong>{usuario}</strong> al módulo de <strong>Matrícula</strong>
        </div>
      </div>

      <div
        className="container mt-4"
        style={{
          backgroundColor: fondoClaro,
          padding: '2rem',
          borderRadius: '10px',
        }}
      >
        <h2 className="mb-4" style={{ color: naranja }}>
          Realizar Matrícula
        </h2>

        {/* Seleccionar ciclo */}
        <div className="mb-3">
          <label className="form-label fw-bold" style={{ color: naranja }}>
            Selecciona un ciclo:
          </label>
          <select
            className="form-select"
            value={cicloSeleccionado}
            onChange={(e) => setCicloSeleccionado(e.target.value)}
          >
            <option value="">-- Seleccionar ciclo --</option>
            {ciclos.map((ciclo) => (
              <option key={ciclo.ciclo_id} value={ciclo.ciclo_id}>
                {ciclo.nombre}
              </option>
            ))}
          </select>
        </div>

        {/* Seleccionar cursos */}
        <div className="mb-3">
          <label className="form-label fw-bold" style={{ color: naranja }}>
            Selecciona tus cursos:
          </label>
          <div className="row">
            {cursos.map((curso) => (
              <div className="col-md-6 mb-2" key={curso.curso_id}>
                <div
                  className="form-check"
                  style={{
                    border: `1px solid ${naranja}`,
                    borderRadius: '6px',
                    padding: '10px',
                    backgroundColor: '#fff',
                  }}
                >
                  <input
                    className="form-check-input"
                    type="checkbox"
                    value={curso.curso_id}
                    checked={cursosSeleccionados.includes(curso.curso_id)}
                    onChange={() => manejarSeleccionCurso(curso.curso_id)}
                  />
                  <label className="form-check-label">
                    {curso.nombre} — <em>{curso.nivel}</em>
                  </label>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Botón */}
        <div className="text-center mt-4">
          <button
            className="btn px-5 py-2"
            style={{
              backgroundColor: naranja,
              color: '#fff',
              borderRadius: '8px',
              fontWeight: 'bold',
              transition: '0.3s',
            }}
            onClick={manejarMatricula}
            onMouseOver={(e) => (e.target.style.backgroundColor = '#cc8400')}
            onMouseOut={(e) => (e.target.style.backgroundColor = naranja)}
          >
            Confirmar Matrícula
          </button>
        </div>

        {mensaje && (
          <div className="alert alert-info mt-4 text-center">{mensaje}</div>
        )}
      </div>
    </Layout>
  );
}

export default Matricula;
