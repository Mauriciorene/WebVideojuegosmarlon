import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import About from './pages/About';
import Customer from './pages/Customer';
import Teacher from './pages/Teacher';
import TeacherList from './pages/TeacherList';
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
        <Route path="/customer" element={<Customer />} />
        <Route path="/teacher" element={<Teacher />} />
        <Route path="/teacherList" element={<TeacherList />} />
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