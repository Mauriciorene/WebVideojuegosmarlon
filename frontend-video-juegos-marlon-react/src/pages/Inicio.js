// About.js
import React from 'react';
import { Container, } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import '../styles/App.css';

function Inicio({ Rol }) {

  return(
    <div>
      <Header Rol={ Rol } />

      <Container className="margen-contenedor"></Container>     
      <Link to="/About">Ir a Informacion</Link>
                <p>
                </p>               
    </div>
  );
}

export default Inicio;