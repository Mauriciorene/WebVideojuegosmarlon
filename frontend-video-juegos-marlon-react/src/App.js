import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
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

function App() {

  const [userRol, setUserRol] = useState('');

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login Rol={userRol} setRol={setUserRol} />} />
        <Route path="/home" element={<Home Rol={userRol} />} />
        <Route path="/Inicio" element={<Inicio Rol={userRol} />} />
        <Route path="/about" element={<About Rol={userRol} />} />
        <Route path="/cliente" element={<Cliente userRol={userRol} />} />
        <Route path="/clienteList" element={<ClienteList Rol={userRol} />} />
        <Route path="/galeria" element={<Galeria Rol={userRol} />} />
        <Route path="/producto" element={<Producto Rol={userRol} />}/>
        <Route path="/productoList" element={<ProductoList Rol={userRol} />} />
        <Route path="/Categoria" element={<Categoria Rol={userRol} />}  />
        <Route path="/CategoriaList" element={<CategoriaList Rol={userRol} />} />
        <Route path="/Venta" element={<Venta Rol={userRol} />} />
        <Route path="/VentaList" element={<VentaList Rol={userRol} />} />
        <Route path="/estadisticas" element={<Estadisticas Rol={userRol} />} />
      </Routes>
    </Router>
  );
}

export default App;