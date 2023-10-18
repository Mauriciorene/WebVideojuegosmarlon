import React, { useState } from 'react';
import { Form, Row, Col, Container, FloatingLabel, Card, Button } from 'react-bootstrap';
import Header from '../components/Header';
import '../styles/App.css';

function Venta() {

  // Crear un estado para cada campo del formulario
  const [nombreCliente, setNombreCliente] = useState('');
  const [id_producto, setIdProducto] = useState('');
  const [fecha, setFecha] = useState('');

  // Función para manejar el envío del formulario
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Crear un objeto con los datos del formulario
    const formData = {
      nombreCliente,
      id_producto,
      fecha,
    };

    try {
      // Realizar una solicitud HTTP al backend para enviar los datos
      const response = await fetch('http://localhost:5000/crud/createVenta', {
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
        setNombreCliente('');
        setIdProducto('');
        setFecha('');
      } else {
        alert('Error al registrar la venta');
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
            <Card.Title>Registro de Venta</Card.Title>
            <Form className="mt-3" onSubmit={handleSubmit}>
              <Row className="g-3">
                <Col sm="6" md="6" lg="4">
                  <FloatingLabel controlId="nombreCliente" label="Nombre del Cliente">
                    <Form.Control
                      type="text"
                      placeholder="Ingrese el nombre del cliente"
                      value={nombreCliente}
                      onChange={(e) => setNombreCliente(e.target.value)}
                    />
                  </FloatingLabel>
                </Col>

                <Col sm="6" md="6" lg="4">
                  <FloatingLabel controlId="idProducto" label="ID del Producto">
                    <Form.Control
                      type="text"
                      placeholder="Ingrese el ID del producto"
                      value={id_producto}
                      onChange={(e) => setIdProducto(e.target.value)}
                    />
                  </FloatingLabel>
                </Col>

                <Col sm="12" md="6" lg="4">
                  <FloatingLabel controlId="fecha" label="Fecha">
                    <Form.Control
                      type="date"
                      placeholder="Seleccione la fecha"
                      value={fecha}
                      onChange={(e) => setFecha(e.target.value)}
                    />
                  </FloatingLabel>
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

export default Venta;
