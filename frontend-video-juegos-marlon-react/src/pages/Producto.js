import React, { useState } from 'react';
import { Form, Row, Col, Container, FloatingLabel, Card, Button } from 'react-bootstrap';
import Header from '../components/Header';
import '../styles/App.css';

function Producto() {
  const [idCategoria, setIdCategoria] = useState(''); // Agrega el estado para el id de categoría
  const [descripcion, setDescripcion] = useState('');
  const [nombreProducto, setNombreProducto] = useState('');
  const [precio, setPrecio] = useState('');
  const [stock, setStock] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = {
      id_categoria: idCategoria, // Cambia para usar el id de categoría
      descripcion,
      nombreProducto,
      precio,
      stock,
    };

    try {
      const response = await fetch('http://localhost:5000/crud/createProducto', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        alert('Registro de producto exitoso');
        setIdCategoria(''); // Reinicia los campos del formulario
        setDescripcion('');
        setNombreProducto('');
        setPrecio('');
        setStock('');
      } else {
        alert('Error al registrar el producto');
      }
    } catch (error) {
      console.error('Error en la solicitud:', error);
      alert('Error en la solicitud al servidor');
    }
  };

  return (
    <div>
      <Header />

      <Container>
        <Card className="mt-3">
          <Card.Body>
            <Card.Title>Registro de Producto</Card.Title>
            <Form className="mt-3" onSubmit={handleSubmit}>
              <Row className="g-3">
                <Col sm="6" md="6" lg="4">
                  <FloatingLabel controlId="idCategoria" label="ID de Categoría">
                    <Form.Control
                      type="number"
                      placeholder="Ingrese el ID de categoría"
                      value={idCategoria}
                      onChange={(e) => setIdCategoria(e.target.value)}
                    />
                  </FloatingLabel>
                </Col>

                <Col sm="6" md="6" lg="4">
                  <FloatingLabel controlId="descripcion" label="Descripción">
                    <Form.Control
                      type="text"
                      placeholder="Ingrese la descripción"
                      value={descripcion}
                      onChange={(e) => setDescripcion(e.target.value)}
                    />
                  </FloatingLabel>
                </Col>

                <Col sm="6" md="6" lg="4">
                  <FloatingLabel controlId="nombreProducto" label="Nombre del Producto">
                    <Form.Control
                      type="text"
                      placeholder="Ingrese el nombre del producto"
                      value={nombreProducto}
                      onChange={(e) => setNombreProducto(e.target.value)}
                    />
                  </FloatingLabel>
                </Col>

                <Col sm="6" md="6" lg="4">
                  <FloatingLabel controlId="precio" label="Precio">
                    <Form.Control
                      type="number"
                      placeholder="Ingrese el precio"
                      value={precio}
                      onChange={(e) => setPrecio(e.target.value)}
                    />
                  </FloatingLabel>
                </Col>

                <Col sm="6" md="6" lg="4">
                  <FloatingLabel controlId="stock" label="Stock">
                    <Form.Control
                      type="number"
                      placeholder="Ingrese el stock"
                      value={stock}
                      onChange={(e) => setStock(e.target.value)}
                    />
                  </FloatingLabel>
                </Col>
              </Row>
              <div className="center-button">
                <Button variant="primary" type="submit" className="mt-3" size="lg">
                  Registrar Producto
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
