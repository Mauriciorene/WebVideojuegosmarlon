import React, { useState, useEffect } from 'react';
import { Table, Button, Card, Row, Col, Form, Modal, FloatingLabel } from 'react-bootstrap';
import Header from '../components/Header';
import { FaTrashCan, FaPencil } from 'react-icons/fa6';

function VentaList({ Rol }) {
  const [ventas, setVentas] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedVenta, setSelectedVenta] = useState({});
  const [formData, setFormData] = useState({
    producto: '',
    cantidad: '',
    cliente: '',
  });
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const openModal = (venta) => {
    setSelectedVenta(venta);

    setFormData({
      producto: venta.producto,
      cantidad: venta.cantidad,
      cliente: venta.cliente,
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
    fetch('http://localhost:5000/crud/getVenta')
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

  const filteredVentas = ventas.filter((venta) => {
    const producto = venta.producto.toLowerCase();
    const cantidad = venta.cantidad.toString();
    const cliente = venta.cliente.toLowerCase();
    const search = searchQuery.toLowerCase();

    return producto.includes(search) || cantidad.includes(search) || cliente.includes(search);
  });

  return (
    <div>
      <Header Rol={ Rol }/>

      <Card className="margen-contenedor">
        <Card.Body>
          <Card.Title className="mb-3">Listado de Ventas</Card.Title>

          <Row className="mb-3">
            <Col sm="6" md="6" lg="4">
              <FloatingLabel controlId="search" label="Buscar">
                <Form.Control
                  type="text"
                  placeholder="Buscar"
                  value={searchQuery}
                  onChange={handleSearchChange}
                />
              </FloatingLabel>
            </Col>
          </Row>

          <Table striped bordered hover>
            <thead>
              <tr>
                <th>ID</th>
                <th>Producto</th>
                <th>Cantidad</th>
                <th>Cliente</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {filteredVentas.map((venta) => (
                <tr key={venta.id_venta}>
                  <td>{venta.id_venta}</td>
                  <td>{venta.producto}</td>
                  <td>{venta.cantidad}</td>
                  <td>{venta.cliente}</td>
                  <td>
                    <Button variant="primary" onClick={() => openModal(venta)}>
                      <FaPencil />
                    </Button>
                    <Button variant="danger" onClick={() => handleDelete(venta.id_venta)}>
                      <FaTrashCan />
                    </Button>
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
                    <FloatingLabel controlId="producto" label="Producto">
                      <Form.Control
                        type="text"
                        placeholder="Ingrese el producto"
                        name="producto"
                        value={formData.producto}
                        onChange={handleFormChange}
                      />
                    </FloatingLabel>
                  </Col>
                  <Col sm="6" md="6" lg="4">
                    <FloatingLabel controlId="cantidad" label="Cantidad">
                      <Form.Control
                        type="number"
                        placeholder="Ingrese la cantidad"
                        name="cantidad"
                        value={formData.cantidad}
                        onChange={handleFormChange}
                      />
                    </FloatingLabel>
                  </Col>
                  <Col sm="12" md="6" lg="4">
                    <FloatingLabel controlId="cliente" label="Cliente">
                      <Form.Control
                        type="text"
                        placeholder="Ingrese el cliente"
                        name="cliente"
                        value={formData.cliente}
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
