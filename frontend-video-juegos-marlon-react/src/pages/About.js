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
        <Link to="/Inicio">Ir a inicio</Link>
        <div
          style={{
            backgroundColor: 'white',
            padding: '20px',
            border: '1px solid #ccc',
            borderRadius: '8px',
          }}
        >
          <p style={{ color: 'black' }}>
            "Somos una Sala de videojuegos apasionada por la cultura gamer.
            Ofrecemos una amplia selección de títulos para todas las plataformas, desde clásicos hasta lanzamientos recientes.
            Nuestro local está listo para asesorarte y brindarte la mejor experiencia de compra.
            ¡Únete a la diversión y explora nuestro mundo de videojuegos!"
          </p>
        </div>
      </Container>

      {/* contenedor para las imágenes */}
      <Container id="additional-images" style={{ textAlign: 'center' }}>
        <img src="/Imágenes/sala.jpeg" alt="imagen 1" style={{ margin: '10px' }} />
        <img src="/Imágenes/sala 2.jpeg" alt="imagen 2" style={{ margin: '10px' }} />
        <img src="/Imágenes/vitrina.jpeg" alt="imagen 3" style={{ margin: '10px' }} />
        <img src="/Imágenes/c.jpeg" alt="imagen 4" style={{ width: '29%', margin: '10px' }} />
        <img src="/Imágenes/cartel 2.jpeg" alt="imagen 5" style={{ width: '47%', margin: '10px' }} />
        <img src="/Imágenes/vitrina 2.jpeg" alt="imagen 6" style={{ margin: '10px' }} />
        <img src="/Imágenes/jugadores.jpeg" alt="imagen 7" style={{ margin: '10px' }} />
      {/* Agrega más imágenes según sea necesario */}
      </Container>

    </div>
  );
}

export default About;
