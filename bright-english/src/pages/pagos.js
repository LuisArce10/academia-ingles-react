import React, { useEffect, useState } from 'react';
import Layout from '../components/layout';

function Pagos() {
  const usuario = localStorage.getItem('usuario');
  const usuarioId = localStorage.getItem('usuario_id');
  const token = localStorage.getItem('token');

  const azul = '#007BFF';
  const fondo = '#f8f9fa';

  const [pagos, setPagos] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const obtenerPagos = async () => {
      try {
        const res = await fetch(`http://localhost:3000/api/pagos/usuario?usuario_id=${usuarioId}`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        if (!res.ok) {
          throw new Error('Error al obtener los pagos');
        }

        const data = await res.json();
        setPagos(data);
      } catch (err) {
        setError('No se pudieron cargar los pagos.');
        console.error(err);
      } finally {
        setCargando(false);
      }
    };

    obtenerPagos();
  }, [usuarioId, token]);

  return (
    <Layout requireAuth={true} allowedRoles={['alumno']}>
      <div className="container mt-4 p-4 rounded shadow" style={{ backgroundColor: fondo }}>
        <h2 className="mb-4 text-center" style={{ color: azul }}>
          💳 Estado de Pagos
        </h2>

        <div className="text-center mb-4">
          <h4 style={{ color: azul }}>Hola, {usuario}</h4>
          <p style={{ color: '#555' }}>
            Aquí puedes ver el estado de tus pagos y ciclos correspondientes.
          </p>
        </div>

        {cargando ? (
          <p className="text-center text-muted">Cargando pagos...</p>
        ) : error ? (
          <p className="text-center text-danger">{error}</p>
        ) : pagos.length === 0 ? (
          <p className="text-center text-muted">No se encontraron pagos registrados.</p>
        ) : (
          <table className="table table-hover table-bordered shadow-sm">
            <thead className="table-primary">
              <tr>
                <th>ID</th>
                <th>Ciclo</th>
                <th>Monto (S/)</th>
                <th>Fecha de Pago</th>
                <th>Estado</th>
              </tr>
            </thead>
            <tbody>
              {pagos.map((pago) => (
                <tr key={pago.pago_id}>
                  <td>{pago.pago_id}</td>
                  <td>{pago.ciclo}</td>
                  <td>{pago.monto.toFixed(2)}</td>
                  <td>{pago.fecha_pago}</td>
                  <td
                    style={{
                      color: pago.estado === 'pagado' ? 'green' : 'red',
                      fontWeight: 'bold',
                    }}
                  >
                    {pago.estado}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}

        <div className="text-center mt-4">
          <button
            className="btn"
            style={{ backgroundColor: azul, color: 'white', borderRadius: '6px' }}
            onClick={() => (window.location.href = '/estudiante')}
          >
            ← Volver
          </button>
        </div>
      </div>
    </Layout>
  );
}

export default Pagos;
