import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import About from './pages/About';
import Customer from './pages/Customer';
import Teacher from './pages/Teacher';
import TeacherList from './pages/TeacherList';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/customer" element={<Customer />} />
        <Route path="/teacher" element={<Teacher />} />
        <Route path="/teacherList" element={<TeacherList />} />
      </Routes>
    </Router>
  );
}

export default App;