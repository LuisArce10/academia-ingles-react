import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from './navBar';
import Footer from './footer';

function Layout({ children, requireAuth = false, allowedRoles = [] }) {
  const navigate = useNavigate();
  const usuario = localStorage.getItem('usuario');
  const rol = localStorage.getItem('rol');

  useEffect(() => {
    if (requireAuth) {
      const rolNormalizado = rol ? rol.trim().toLowerCase() : '';

      if (
        !usuario ||
        (allowedRoles.length > 0 &&
          !allowedRoles.map(r => r.toLowerCase()).includes(rolNormalizado))
      ) {
        navigate('/login');
      }
    }
  }, [usuario, rol, requireAuth, allowedRoles, navigate]);

  return (
    <>
      <Navbar />
      <main className="container py-4">{children}</main>
      <Footer />
    </>
  );
}

export default Layout;
