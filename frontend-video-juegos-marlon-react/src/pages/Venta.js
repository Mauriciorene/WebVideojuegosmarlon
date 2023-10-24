import React, { useState, useEffect } from 'react';
import { Form, Row, Col, Container, FloatingLabel, Card, Button, Dropdown } from 'react-bootstrap';
import Header from '../components/Header';
import '../styles/App.css';

function Venta() {
  const [usuarios, setUsuarios] = useState([]);
  const [clientes, setClientes] = useState([]);
  const [productos, setProductos] = useState([]);
  const [idUsuario, setIdUsuario] = useState('');
  const [idCliente, setIdCliente] = useState('');
  const [idProducto, setIdProducto] = useState('');
  const [fecha, setFecha] = useState('');

  // Función para cargar la lista de usuarios desde el servidor
  const loadUsuarios = () => {
    fetch('http://localhost:5000/crud/getUsuarios')
      .then((response) => response.json())
      .then((data) => setUsuarios(data))
      .catch((error) => console.error('Error al obtener los usuarios:', error));
  };

  // Función para cargar la lista de clientes desde el servidor
  const loadClientes = () => {
    fetch('http://localhost:5000/crud/getClientes')
      .then((response) => response.json())
      .then((data) => setClientes(data))
      .catch((error) => console.error('Error al obtener los clientes:', error));
  };

  // Función para cargar la lista de productos desde el servidor
  const loadProductos = () => {
    fetch('http://localhost:5000/crud/getProductos')
      .then((response) => response.json())
      .then((data) => setProductos(data))
      .catch((error) => console.error('Error al obtener los productos:', error));
  };

  useEffect(() => {
    loadUsuarios();
    loadClientes();
    loadProductos();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = {
      id_usuario: idUsuario,
      id_cliente: idCliente,
      id_producto: idProducto,
      fecha,
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
        setIdUsuario('');
        setIdCliente('');
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
                  <FloatingLabel controlId="idUsuario">
                    <Dropdown>
                      <Dropdown.Toggle variant="success" id="dropdown-usuario">
                        {idUsuario ? usuarios.find((u) => u.id_usuario === idUsuario).nombre : 'Seleccionar Usuario'}
                      </Dropdown.Toggle>
                      <Dropdown.Menu>
                        {usuarios.map((usuario) => (
                          <Dropdown.Item key={usuario.id_usuario} onClick={() => setIdUsuario(usuario.id_usuario)}>
                            {usuario.nombre}
                          </Dropdown.Item>
                        ))}
                      </Dropdown.Menu>
                    </Dropdown>
                  </FloatingLabel>
                </Col>

                <Col sm="6" md="6" lg="4">
                  <FloatingLabel controlId="idCliente">
                    <Dropdown>
                      <Dropdown.Toggle variant="success" id="dropdown-cliente">
                        {idCliente ? clientes.find((c) => c.id_cliente === idCliente).nombre : 'Seleccionar Cliente'}
                      </Dropdown.Toggle>
                      <Dropdown.Menu>
                        {clientes.map((cliente) => (
                          <Dropdown.Item key={cliente.id_cliente} onClick={() => setIdCliente(cliente.id_cliente)}>
                            {cliente.nombre}
                          </Dropdown.Item>
                        ))}
                      </Dropdown.Menu>
                    </Dropdown>
                  </FloatingLabel>
                </Col>

                <Col sm="6" md="6" lg="4">
                  <FloatingLabel controlId="idProducto">
                    <Dropdown>
                      <Dropdown.Toggle variant="success" id="dropdown-producto">
                        {idProducto ? productos.find((p) => p.id_producto === idProducto).nombreProducto : 'Seleccionar Producto'}
                      </Dropdown.Toggle>
                      <Dropdown.Menu>
                        {productos.map((producto) => (
                          <Dropdown.Item key={producto.id_producto} onClick={() => setIdProducto(producto.id_producto)}>
                            {producto.nombreProducto}
                          </Dropdown.Item>
                        ))}
                      </Dropdown.Menu>
                    </Dropdown>
                  </FloatingLabel>
                </Col>

                <Col sm="6" md="6" lg="4">
                  <FloatingLabel controlId="fecha">
                    <Form.Control
                      type="date"
                      value={fecha}
                      onChange={(e) => setFecha(e.target.value)}
                    />
                  </FloatingLabel>
                </Col>
              </Row>
              <div className="center-button">
                <Button variant="primary" type="submit" className="mt-3" size="lg">
                  Registrar Venta
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
