import React, { useEffect, useState } from 'react';
import Layout from '../components/layout';

function Reportes() {
  const verdeAcademico = '#2E8B57';
  const negroElegante = '#1C1C1C';
  const fondoClaro = '#f8f9fa';

  const [cursos, setCursos] = useState([]);
  const [matriculas, setMatriculas] = useState([]);
  const [pagos, setPagos] = useState([]);
  const [error, setError] = useState('');
  const [estadisticas, setEstadisticas] = useState({
  estudiantesPorCurso: [],
  ingresosPorCiclo: []
});

useEffect(() => {
  const obtenerReportes = async () => {
    try {
      const token = localStorage.getItem('token');

      const [resCursos, resMatriculas, resPagos, resEstadisticas] = await Promise.all([
        fetch('http://localhost:3000/api/reportes/cursos', {
          headers: { Authorization: `Bearer ${token}` },
        }),
        fetch('http://localhost:3000/api/reportes/matriculas', {
          headers: { Authorization: `Bearer ${token}` },
        }),
        fetch('http://localhost:3000/api/reportes/pagos', {
          headers: { Authorization: `Bearer ${token}` },
        }),
        fetch('http://localhost:3000/api/reportes/estadisticas', {
          headers: { Authorization: `Bearer ${token}` },
        })
      ]);

      if (!resCursos.ok || !resMatriculas.ok || !resPagos.ok || !resEstadisticas.ok) {
        throw new Error('Error al obtener datos de los reportes');
      }

      const dataCursos = await resCursos.json();
      const dataMatriculas = await resMatriculas.json();
      const dataPagos = await resPagos.json();
      const dataEstadisticas = await resEstadisticas.json();

      setCursos(dataCursos);
      setMatriculas(dataMatriculas);
      setPagos(dataPagos);
      setEstadisticas(dataEstadisticas);

    } catch (err) {
      setError(err.message);
    }
  };

  obtenerReportes();
}, []);


  return (
    <Layout requireAuth={true} allowedRoles={['admin']}>
        {/* 🔙 BOTÓN VOLVER */}
        <div className=" mt-4">
          <button
            className="btn"
            style={{
              backgroundColor: negroElegante,
              color: 'white',
              borderRadius: '6px',
            }}
            onClick={() => (window.location.href = '/admin')}
            onMouseOver={(e) => (e.target.style.backgroundColor = verdeAcademico)}
            onMouseOut={(e) => (e.target.style.backgroundColor = negroElegante)}
          >
            Volver 
          </button>
        </div>
      <div
        className="container mt-5 p-4 rounded shadow-sm"
        style={{ backgroundColor: fondoClaro }}
      >
        
        <h2 className="mb-4 text-center" style={{ color: verdeAcademico }}>
          📊 Reportes del Sistema
        </h2>

        {error && (
          <div className="alert alert-danger text-center">{error}</div>
        )}


        <section className="mb-5">
          <h4 style={{ color: negroElegante }}>📘 Reporte de Cursos</h4>
          <div className="table-responsive mt-3">
            <table className="table table-bordered table-striped">
              <thead
                style={{
                  backgroundColor: verdeAcademico,
                  color: 'white',
                  textAlign: 'center',
                }}
              >
                <tr>
                  <th>ID</th>
                  <th>Código</th>
                  <th>Nombre</th>
                  <th>Nivel</th>
                  <th>Duración</th>
                  <th>Docente</th>
                </tr>
              </thead>
              <tbody>
                {cursos.length > 0 ? (
                  cursos.map((curso) => (
                    <tr key={curso.curso_id}>
                      <td>{curso.curso_id}</td>
                      <td>{curso.codigo}</td>
                      <td>{curso.nombre}</td>
                      <td>{curso.nivel}</td>
                      <td>{curso.duracion}</td>
                      <td>{curso.docente}</td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="7" className="text-center">
                      No hay datos disponibles
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </section>

       
        <section className="mb-5">
          <h4 style={{ color: negroElegante }}>🧾 Reporte de Matrículas</h4>
          <div className="table-responsive mt-3">
            <table className="table table-bordered table-striped">
              <thead
                style={{
                  backgroundColor: verdeAcademico,
                  color: 'white',
                  textAlign: 'center',
                }}
              >
                <tr>
                  <th>ID Matrícula</th>
                  <th>Estudiante</th>
                  <th>Ciclo</th>
                  <th>Estado</th>
                  <th>Fecha Matrícula</th>
                </tr>
              </thead>
              <tbody>
                {matriculas.length > 0 ? (
                  matriculas.map((mat) => (
                    <tr key={mat.matricula_id}>
                      <td>{mat.matricula_id}</td>
                      <td>{mat.estudiante}</td>
                      <td>{mat.ciclo}</td>
                      <td>{mat.estado}</td>
                      <td>{new Date(mat.fecha_matricula).toLocaleDateString()}</td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="5" className="text-center">
                      No hay datos disponibles
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </section>

       
        <section>
          <h4 style={{ color: negroElegante }}>💰 Reporte de Pagos</h4>
          <div className="table-responsive mt-3">
            <table className="table table-bordered table-striped">
              <thead
                style={{
                  backgroundColor: verdeAcademico,
                  color: 'white',
                  textAlign: 'center',
                }}
              >
                <tr>
                  <th>ID Pago</th>
                  <th>Estudiante</th>
                  <th>Monto</th>
                  <th>Estado</th>
                  <th>Ciclo</th>
                  <th>Fecha de Pago</th>
                </tr>
              </thead>
              <tbody>
                {pagos.length > 0 ? (
                  pagos.map((pago) => (
                    <tr key={pago.pago_id}>
                      <td>{pago.pago_id}</td>
                      <td>{pago.estudiante}</td>
                      <td>S/. {pago.monto.toFixed(2)}</td>
                      <td>{pago.estado}</td>
                      <td>{pago.ciclo}</td>
                      <td>{new Date(pago.fecha_pago).toLocaleDateString()}</td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="6" className="text-center">
                      No hay datos disponibles
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </section>
        <section className="mt-5">
  <h4 style={{ color: negroElegante }}>📈 Estadísticas Generales</h4>

  {/* Estudiantes por curso */}
  <h5 className="mt-3">Estudiantes por Curso</h5>
  <div className="table-responsive mt-2">
    <table className="table table-bordered table-striped">
      <thead style={{ backgroundColor: verdeAcademico, color: 'white', textAlign: 'center' }}>
        <tr>
          <th>Curso</th>
          <th>Total de Estudiantes</th>
        </tr>
      </thead>
      <tbody>
        {estadisticas.estudiantesPorCurso.length > 0 ? (
          estadisticas.estudiantesPorCurso.map((item, idx) => (
            <tr key={idx}>
              <td>{item.curso}</td>
              <td>{item.total_estudiantes}</td>
            </tr>
          ))
        ) : (
          <tr>
            <td colSpan="2" className="text-center">No hay datos disponibles</td>
          </tr>
        )}
      </tbody>
    </table>
  </div>

  {/* Ingresos por ciclo */}
  <h5 className="mt-4">Ingresos por Ciclo</h5>
  <div className="table-responsive mt-2">
    <table className="table table-bordered table-striped">
      <thead style={{ backgroundColor: verdeAcademico, color: 'white', textAlign: 'center' }}>
        <tr>
          <th>Ciclo</th>
          <th>Total Ingresos (S/.)</th>
        </tr>
      </thead>
      <tbody>
        {estadisticas.ingresosPorCiclo.length > 0 ? (
          estadisticas.ingresosPorCiclo.map((item, idx) => (
            <tr key={idx}>
              <td>{item.ciclo}</td>
              <td>S/. {item.total_ingresos.toFixed(2)}</td>
            </tr>
          ))
        ) : (
          <tr>
            <td colSpan="2" className="text-center">No hay datos disponibles</td>
          </tr>
        )}
      </tbody>
    </table>
  </div>
</section>


        
      </div>
    </Layout>
  );
}

export default Reportes;
