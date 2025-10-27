import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Index from './pages/index';       
import Login from './pages/login';        
import Admin from './pages/admin';        
import Docente from './pages/docente';     
import Estudiante from './pages/estudiante'; 
import CursoAlum from './pages/cursoalum';
import Usuarios from './pages/usuarios';
import Registro from "./pages/registro";
import Reportes from "./pages/reportes";
import Pagos from "./pages/pagos";
import Cursos from "./pages/cursos";
import Matricula from "./pages/matricula"

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/index" element={<Index />} />
        <Route path="/admin" element={<Admin />} />
        <Route path="/docente" element={<Docente />} />
        <Route path="/estudiante" element={<Estudiante />} />
        <Route path="/cursoalum" element={<CursoAlum />} /> 
        <Route path="/usuarios" element={<Usuarios />} />
        <Route path="/registro" element={<Registro />} />
        <Route path="/reportes" element={<Reportes />} />
        <Route path="/pagos" element={<Pagos />} />        
        <Route path="/cursos" element={<Cursos />} />
        <Route path="/matricula" element={<Matricula />} />
        
      </Routes>
    </Router>
  );
}

export default App;
