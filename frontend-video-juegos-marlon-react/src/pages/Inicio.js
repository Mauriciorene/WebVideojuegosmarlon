// About.js
import React from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import '../styles/App.css';

function Inicio() {
  return(
    <div>
      <Header />
      <Link to="/About">Ir a Informacion</Link>
                <p>
                </p>
                
                
    </div>
  );
}

export default Inicio;