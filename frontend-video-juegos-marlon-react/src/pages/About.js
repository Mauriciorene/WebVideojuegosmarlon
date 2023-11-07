// About.js
import React from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import '../styles/App.css';

function About() {
  return(
    <div>
      <Header />
      <Link to="/Inicio">Ir a inicio</Link>
                <p>
                    "Somos una Sala de videojuegos apasionada por la cultura gamer. 
                    Ofrecemos una amplia selección de títulos para todas las plataformas, desde clásicos hasta lanzamientos recientes. 
                    Nuestro local esta listo para asesorarte y brindarte la mejor experiencia de compra. 
                    ¡Únete a la diversión y explora nuestro mundo de videojuegos!"
                </p>
                
                
    </div>
  );
}

export default About;