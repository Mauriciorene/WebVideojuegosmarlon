import React from 'react';
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

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/cliente" element={<Cliente />} />
        <Route path="/clienteList" element={<ClienteList />} />
        <Route path="/producto" element={<Producto />} />
        <Route path="/productoList" element={<ProductoList />} />
        <Route path="/Categoria" element={<Categoria />} />
        <Route path="/CategoriaList" element={<CategoriaList />} />
        <Route path="/Venta" element={<Venta />} />
        <Route path="/VentaList" element={<VentaList />} />
      </Routes>
    </Router>
  );
}

export default App;