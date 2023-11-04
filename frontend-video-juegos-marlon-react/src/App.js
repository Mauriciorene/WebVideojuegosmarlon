import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
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

function App() {

  const [userRol, setUserRol] = useState('');

  return (
    <Router>
      <Routes>
      <Route path="/" element={<Login rol={userRol} setRol={setUserRol} />} />
        <Route path="/" element={<Home rol={userRol} />} />
        <Route path="/about" element={<About rol={userRol} />} />
        <Route path="/cliente" element={<Cliente rol={userRol} />} />
        <Route path="/clienteList" element={<ClienteList rol={userRol} />} />
        <Route path="/producto" element={<Producto />} rol={userRol} />
        <Route path="/productoList" element={<ProductoList rol={userRol} />} />
        <Route path="/Categoria" element={<Categoria />} rol={userRol} />
        <Route path="/CategoriaList" element={<CategoriaList rol={userRol} />} />
        <Route path="/Venta" element={<Venta />} rol={userRol} />
        <Route path="/VentaList" element={<VentaList rol={userRol} />} />
      </Routes>
    </Router>
  );
}

export default App;