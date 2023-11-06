import React, { useState, useEffect } from 'react';
import { Form, Row, Col, Container, FloatingLabel, Card, Button } from 'react-bootstrap';
import Header from '../components/Header';
import '../styles/App.css';

function Producto({Rol}) {

  // Crear un estado para cada campo del formulario
  const [descripcion, setDescripcion] = useState('');
  const [nombreProducto, setNombreProducto] = useState('');
  const [precio, setPrecio] = useState('');
  const [Stock, setStock] = useState('');
  
  const [categorias, setCategorias] = useState([]); // Estado para almacenar las categorias
  const [id_categoria, setIDCategoria] = useState(''); // Estado para el valor seleccionado

  const [imagen, setImagen] = useState('');

  const handleImagenChange = (event) => {
    const file = event.target.files[0]; // Obtener el primer archivo seleccionado
  
    const reader = new FileReader();
    reader.onload = () => {
      const base64String = reader.result; // Obtener la imagen en formato base64
      setImagen(base64String); // Puedes visualizar la imagen en base64 en la consola para asegurarte de que la conversión se hizo correctamente
    }; 
    if (file) {
      reader.readAsDataURL(file); // Lee el contenido del archivo como base64
    }
  };

  // Función para manejar el envío del formulario
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Crear un objeto con los datos del formulario
    const formData = {
      descripcion,
      nombreProducto,
      precio,
      Stock,
      id_categoria,
      imagen
    };

    try {
      // Realizar una solicitud HTTP al backend para enviar los datos
      const response = await fetch('http://localhost:5000/crud/createProducto', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        // El registro se creó exitosamente
        alert('Registro exitoso');
        // Reiniciar los campos del formulario
        setDescripcion('');
        setNombreProducto('');
        setPrecio('');
        setStock('');
        setIDCategoria('');
      } else {
        alert('Error al registrar el producto');
      }
    } catch (error) {
      console.error('Error en la solicitud:', error);
      alert('Error en la solicitud al servidor');
    }
  };

  useEffect(() => {
    // Realiza una solicitud a tu ruta para obtener las categorias
    fetch('http://localhost:5000/crud/readCategoria')
      .then(response => response.json())
      .then(data => {
        // Actualiza el estado con las categorias obtenidas
        setCategorias(data);
      })
      .catch(error => {
        console.error('Error al obtener las categorias', error);
      });
  }, []);

  return(
    <div>
      <Header Rol={ Rol } />
      
      <Container>
        <Card className="margen-contenedor">
          <Card.Body>
            <Card.Title>Registro de Productos</Card.Title>
            <Form className="mt-3" onSubmit={handleSubmit}>
              <Row className="g-3">

                <Col sm="6" md="6" lg="8">
                  <FloatingLabel controlId="nombreProducto" label="Nombre">
                    <Form.Control
                      type="text"
                      placeholder="Ingrese el nombre de producto"
                      value={nombreProducto}
                      onChange={(e) => setNombreProducto(e.target.value)}
                    />
                  </FloatingLabel>
                </Col>

                <Col sm="12" md="6" lg="4">
                  <FloatingLabel controlId="id_categoria" label="Categoria">
                    <Form.Select 
                      aria-label="Categoria"
                      value={id_categoria}
                      onChange={(e) => setIDCategoria(e.target.value)}
                    >
                      <option>Seleccione la categoria</option>
                      {categorias.map((categoria) => (
                        <option key={categoria.id_categoria} value={categoria.id_categoria}>
                          {categoria.nombre}
                        </option>
                      ))}
                    </Form.Select>
                  </FloatingLabel>
                </Col>

                <Col sm="6" md="6" lg="12">
                  <FloatingLabel controlId="descripcion" label="Descripcion">
                    <Form.Control
                      type="text"
                      placeholder="Escriba aqui"
                      value={descripcion}
                      onChange={(e) => setDescripcion(e.target.value)}
                    />
                  </FloatingLabel>
                </Col>               

                <Col sm="12" md="6" lg="6">
                  <FloatingLabel controlId="precio" label="Precio">
                    <Form.Control 
                      type="number" 
                      placeholder="Ingrese el precio"
                      value={precio}
                      onChange={(e) => setPrecio(e.target.value)} 
                    />
                  </FloatingLabel>
                </Col>

                <Col sm="12" md="6" lg="6">
                  <FloatingLabel controlId="Stock" label="Stock">
                    <Form.Control 
                      type="number" 
                      placeholder="Ingrese el stock"
                      value={Stock}
                      onChange={(e) => setStock(e.target.value)} 
                    />
                  </FloatingLabel>
                </Col>

                <Col sm="12" md="6" lg="6">
                  <Form.Group controlId="imagen" className="" >
                    <Form.Control 
                      type="file" 
                      accept=".jpg, .png, .jpeg"
                      size="lg"
                      onChange={handleImagenChange}
                    />
                  </Form.Group>
                </Col>

              </Row>
              <div className="center-button">
                <Button variant="primary" type="submit" className="mt-3" size="lg">
                  Registrar
                </Button>
              </div>
            </Form>
          </Card.Body>
        </Card>
      </Container>

    </div>
  );
}

export default Producto;