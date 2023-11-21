import React, { useEffect } from 'react';
import { Container } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import '../styles/App.css';

function About({ Rol }) {

  useEffect(() => {
    // Cambia el color del texto del párrafo a blanco
    const parrafo = document.querySelector('p');
    if (parrafo) {
      parrafo.style.color = 'black';
    }
  }, []); // El segundo parámetro [] asegura que el efecto se ejecute solo una vez al montar el componente

  return (
    <div>
      <Header Rol={Rol} />

      <Container className="margen-contenedor">
      <Link to="/About">Ir a Informacion</Link>
        <div
          style={{
            backgroundColor: 'white',
            padding: '20px',
            border: '1px solid #ccc',
            borderRadius: '8px',
          }}
        >
          <p style={{ color: 'black' }}>
              "Sala de videojuegos Marlón" : Ubicado en Juigalpa chontales de la esquina del monumento Instituto Josefa Toledo de Aguerri,
              a una cuadra y media al norte
          </p>
        </div>
      </Container>

      {/* contenedor para las imágenes */}
      <Container id="additional-images" style={{ textAlign: 'center' }}>
        <img src="/Imágenes/1.png" alt="imagen 1" style={{ margin: '10px' }} />
        <img src="/Imágenes/2.gif" alt="imagen 2" style={{ width: '47%', margin: '10px' }} />
        <img src="/Imágenes/3.gif" alt="imagen 3" style={{ width: '46%', margin: '10px' }} />
        <img src="/Imágenes/4.gif" alt="imagen 4" style={{ margin: '10px' }} />
        <img src="/Imágenes/5.gif" alt="imagen 5" style={{ margin: '10px' }} />
        <img src="/Imágenes/6..gif" alt="imagen 5" style={{ margin: '10px' }} />
        <img src="/Imágenes/7..gif" alt="imagen 5" style={{ margin: '10px' }} />
        <img src="/Imágenes/8..gif" alt="imagen 5" style={{ margin: '10px' }} />

      {/* Agrega más imágenes según sea necesario */}
      </Container>

    </div>
  );
}

export default About;
