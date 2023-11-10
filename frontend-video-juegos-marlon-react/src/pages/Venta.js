import React, { useState, useEffect } from 'react';
import { Form, Row, Col, Container, FloatingLabel, Card, Button } from 'react-bootstrap';
import Header from '../components/Header';
import '../styles/App.css';

function Venta({ Rol }) {

          //Validacion y limite de lingitud de caracteres para el Stock------------------------------------------
          const handleCantidadChange = (e) => {
            // Validar que solo se ingresen números y no hay límite de longitud
            const regex = /^[0-9]+$/;
            
            // Validar que solo se ingresen números
            if (regex.test(e.target.value) || e.target.value === '') {
              setCantidad(e.target.value.slice(0, 4));
            }
          };

  const [clientes, setClientes] = useState([]);
  const [productos, setProductos] = useState([]);
  const [idCliente, setIdCliente] = useState('');
  const [idProducto, setIdProducto] = useState('');
  const [cantidad, setCantidad] = useState('');
  const [fecha, setFecha] = useState('');


  // Función para cargar la lista de clientes desde el servidor
  const loadClientes = () => {
    fetch('http://localhost:5000/crud/getClientes')
      .then((response) => response.json())
      .then((data) => setClientes(data))
      .catch((error) => console.error('Error al obtener los clientes:', error));
  };

  // Función para cargar la lista de productos desde el servidor
  const loadProductos = () => {
    fetch('http://localhost:5000/crud/readProducto')
      .then((response) => response.json())
      .then((data) => setProductos(data))
      .catch((error) => console.error('Error al obtener los productos:', error));
  };

  useEffect(() => {
    loadClientes();
    loadProductos();
  }, []);

  const handleVentaSubmit = async (e) => {
    e.preventDefault();

    const formData = {
      id_cliente: idCliente,
      id_producto: idProducto,
      fecha,
      cantidad, 
    };

    try {
      const response = await fetch('http://localhost:5000/crud/createVenta', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        alert('Registro de venta exitoso');
        setIdCliente('');
        setIdProducto('');
        setFecha('');
        setCantidad('');
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
      <Header Rol={ Rol }/>

      <Container>
        <Card className="margen-contenedor">
          <Card.Body>
            <Card.Title>Registro de Venta</Card.Title>
            <Form onSubmit={handleVentaSubmit}>
              <Row className="mb-3">

                <Col sm="6" md="6" lg="3">
                  <FloatingLabel controlId="id_cliente" label="Cliente">
                    <Form.Select
                      aria-label="Cliente"
                      value={idCliente}
                      onChange={(e) => setIdCliente(e.target.value)}
                    >
                      <option>Seleccione el cliente</option>
                      {clientes.map((cliente) => (
                        <option key={cliente.id_cliente} value={cliente.id_cliente}>
                          {cliente.nombre}
                        </option>
                      ))}
                    </Form.Select>
                  </FloatingLabel>
                </Col>


                <Col sm="6" md="6" lg="3">
                  <FloatingLabel controlId="id_producto" label="Producto">
                    <Form.Select
                      aria-label="Producto"
                      value={idProducto}
                      onChange={(e) => setIdProducto(e.target.value)}
                    >
                      <option>Seleccione el producto</option>
                      {productos.map((producto) => (
                        <option key={producto.id_producto} value={producto.id_producto}>
                          {producto.nombreProducto}
                        </option>
                      ))}
                    </Form.Select>
                  </FloatingLabel>
                </Col>

                <Col sm="6" md="6" lg="3">
                  <FloatingLabel controlId="cantidad" label="Cantidad">
                    <Form.Control 
                      type="text"
                      min={1} 
                      placeholder="Ingrese el precio"
                      value={cantidad}
                      onChange={handleCantidadChange} 
                    />
                  </FloatingLabel>
                </Col>


                <Col sm="6" md="6" lg="3">
                <FloatingLabel controlId="fecha" label="Fecha">
                  <Form.Control type="date" value={fecha} onChange={(e) => setFecha(e.target.value)} />
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
