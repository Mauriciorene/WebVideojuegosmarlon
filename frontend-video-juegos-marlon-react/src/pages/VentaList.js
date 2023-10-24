import React, { useState, useEffect } from 'react';
import { Table, Button, Container, Card, Row, Col, Form, Modal, FloatingLabel } from 'react-bootstrap';
import Header from '../components/Header';

function VentaList() {
  const [ventas, setVentas] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedVenta, setSelectedVenta] = useState({});
  const [formData, setFormData] = useState({
    id_usuario: '',
    id_cliente: '',
    id_producto: '',
    fecha: '',
  });

  const openModal = (venta) => {
    setSelectedVenta(venta);

    setFormData({
      id_usuario: venta.id_usuario,
      id_cliente: venta.id_cliente,
      id_producto: venta.id_producto,
      fecha: venta.fecha,
    });
    setShowModal(true);
  };

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const loadVentas = () => {
    fetch('http://localhost:5000/crud/getVentas')
      .then((response) => response.json())
      .then((data) => setVentas(data))
      .catch((error) => console.error('Error al obtener las ventas:', error));
  };

  const handleUpdate = () => {
    fetch(`http://localhost:5000/crud/updateVenta/${selectedVenta.id_venta}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    })
      .then((response) => {
        if (response.ok) {
          setShowModal(false);
          loadVentas();
        }
      })
      .catch((error) => console.error('Error al actualizar la venta:', error));
  };

  const handleDelete = (id_venta) => {
    const confirmation = window.confirm('¿Seguro que deseas eliminar esta venta?');
    if (confirmation) {
      fetch(`http://localhost:5000/crud/deleteVenta/${id_venta}`, {
        method: 'DELETE',
      })
        .then((response) => {
          if (response.ok) {
            loadVentas();
          }
        })
        .catch((error) => console.error('Error al eliminar la venta:', error));
    }
  };

  useEffect(() => {
    loadVentas();
  }, []);

  return (
    <div>
      <Header />

      <Card className="m-3">
        <Card.Body>
          <Card.Title className="mb-3">Listado de Ventas</Card.Title>
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>ID</th>
                <th>ID de Usuario</th>
                <th>ID de Cliente</th>
                <th>ID de Producto</th>
                <th>Fecha</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {ventas.map((venta) => (
                <tr key={venta.id_venta}>
                  <td>{venta.id_venta}</td>
                  <td>{venta.id_usuario}</td>
                  <td>{venta.id_cliente}</td>
                  <td>{venta.id_producto}</td>
                  <td>{venta.fecha}</td>
                  <td>
                    <Button variant="primary" onClick={() => openModal(venta)}>Actualizar</Button>
                    <Button variant="danger" onClick={() => handleDelete(venta.id_venta)}>Eliminar</Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Card.Body>
      </Card>

      <Modal show={showModal} onHide={() => setShowModal(false)} size="lg">
        <Modal.Header closeButton>
          <Modal.Title>Actualizar Venta</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Card className="mt-3">
            <Card.Body>
              <Card.Title>Registro de Venta</Card.Title>
              <Form className="mt-3">
                <Row className="g-3">
                  <Col sm="6" md="6" lg="4">
                    <FloatingLabel controlId="id_usuario" label="ID de Usuario">
                      <Form.Control
                        type="number"
                        placeholder="Ingrese el ID de usuario"
                        name="id_usuario"
                        value={formData.id_usuario}
                        onChange={handleFormChange}
                      />
                    </FloatingLabel>
                  </Col>

                  <Col sm="6" md="6" lg="4">
                    <FloatingLabel controlId="id_cliente" label="ID de Cliente">
                      <Form.Control
                        type="number"
                        placeholder="Ingrese el ID de cliente"
                        name="id_cliente"
                        value={formData.id_cliente}
                        onChange={handleFormChange}
                      />
                    </FloatingLabel>
                  </Col>

                  <Col sm="6" md="6" lg="4">
                    <FloatingLabel controlId="id_producto" label="ID de Producto">
                      <Form.Control
                        type="number"
                        placeholder="Ingrese el ID de producto"
                        name="id_producto"
                        value={formData.id_producto}
                        onChange={handleFormChange}
                      />
                    </FloatingLabel>
                  </Col>

                  <Col sm="6" md="6" lg="4">
                    <FloatingLabel controlId="fecha" label="Fecha">
                      <Form.Control
                        type="date"
                        name="fecha"
                        value={formData.fecha}
                        onChange={handleFormChange}
                      />
                    </FloatingLabel>
                  </Col>
                </Row>
              </Form>
            </Card.Body>
          </Card>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            Cerrar
          </Button>
          <Button variant="primary" onClick={handleUpdate}>
            Actualizar
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default VentaList;
