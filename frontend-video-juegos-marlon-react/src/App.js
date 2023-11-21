import React, { useState, useEffect } from 'react';

import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Home from './pages/Home';
import Inicio from './pages/Inicio';
import About from './pages/About';
import Cliente from './pages/Cliente';
import ClienteList from './pages/ClienteList';
import Producto from './pages/Producto';
import ProductoList from './pages/ProductoList';
import Categoria from './pages/Categoria';
import CategoriaList from './pages/CategoriaList';
import Venta from './pages/Venta';
import VentaList from './pages/VentaList';
import Login from './pages/Login';
import Estadisticas from './pages/Estadisticas';
import Galeria from './pages/Galeria';
import SinAcceso from './pages/SinAcceso';

function App() {
  const storedRol = localStorage.getItem('userRol');
  const [userRol, setUserRol] = useState(storedRol || '');

  // Guardar el rol del usuario en localStorage cada vez que cambie
  useEffect(() => {
    localStorage.setItem('userRol', userRol);
  }, [userRol]);
  

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login Rol={userRol} setRol={setUserRol} />} />
        <Route path="/home" element={<Home Rol={userRol} />} />
        <Route path="/Inicio" element={userRol ? <Inicio Rol={userRol} /> : <Navigate to="/sin-acceso" />}/>
        <Route path="/about" element={userRol ? <About Rol={userRol} /> : <Navigate to="/sin-acceso" />} />
        <Route path="/cliente" element={userRol ? <Cliente userRol={userRol} /> : <Navigate to="/sin-acceso" />} />
        <Route path="/clienteList" element={userRol ? <ClienteList Rol={userRol} />  : <Navigate to="/sin-acceso" />} />
        <Route path="/galeria" element={userRol ? <Galeria Rol={userRol} /> : <Navigate to="/sin-acceso" />} />
        <Route path="/producto" element={userRol ? <Producto Rol={userRol} /> : <Navigate to="/sin-acceso" />}/>
        <Route path="/productoList" element={userRol ? <ProductoList Rol={userRol} /> : <Navigate to="/sin-acceso" />}/>
        <Route path="/Categoria" element={userRol ? <Categoria Rol={userRol} /> : <Navigate to="/sin-acceso" />}/>
        <Route path="/CategoriaList" element={userRol ? <CategoriaList Rol={userRol} /> : <Navigate to="/sin-acceso" />}/>
        <Route path="/Venta" element={userRol ? <Venta Rol={userRol} /> : <Navigate to="/sin-acceso" />}/>
        <Route path="/VentaList" element={userRol ? <VentaList Rol={userRol} /> : <Navigate to="/sin-acceso" />}/>
        <Route path="/estadisticas" element={userRol ? <Estadisticas Rol={userRol} /> : <Navigate to="/sin-acceso" />}/>
        <Route path="/sin-acceso" element={<SinAcceso />}/>
      </Routes>
    </Router>
  );
}

export default App;