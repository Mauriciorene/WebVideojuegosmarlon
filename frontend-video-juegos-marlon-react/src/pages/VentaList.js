import React, { useState, useEffect } from 'react';
import { Table, Button, Card, Modal, Container } from 'react-bootstrap';
import Header from '../components/Header';
import { FaTrashCan, FaFileLines } from 'react-icons/fa6';

function VentaList({ Rol }) {
  const [ventas, setVentas] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedVenta, setSelectedVenta] = useState({});
  const [detalleVenta, setDetalleVenta] = useState([]);

  // Función para abrir el modal y cargar los detalles de la venta
  const openModal = (venta) => {
    setSelectedVenta(venta);
    setShowModal(true);

    // Cargar detalles de la venta
    fetch(`http://localhost:5000/crud/readDetalleVenta/${venta.id_venta}`)
      .then((response) => response.json())
      .then((data) => setDetalleVenta(data))
      .catch((error) => console.error('Error al obtener los detalles de la venta:', error));
  };

  // Función para cargar las ventas desde el servidor
  const loadVentas = () => {
    fetch('http://localhost:5000/crud/readVenta')
      .then((response) => response.json())
      .then((data) => setVentas(data))
      .catch((error) => console.error('Error al obtener las ventas:', error));
  };

  // Función para eliminar una venta
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

  // Realiza una solicitud GET al servidor para obtener las ventas
  useEffect(() => {
    loadVentas();
  }, []);

  function formatDateForInput(dateTimeString) {
    const date = new Date(dateTimeString);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  }

  return (
    <div>
      <Header Rol={Rol} />

      <Container>
        <Card className="margen-contenedor">
          <Card.Body>
            <Card.Title className="mb-3">Listado de Ventas</Card.Title>

            <Table striped bordered hover>
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Cliente</th>
                  <th>Fecha</th>
                  <th className="text-center">Acciones</th>
                </tr>
              </thead>
              <tbody>
                {ventas.map((venta) => (
                  <tr key={venta.id_venta}>
                    <td>{venta.id_venta}</td>
                    <td>{venta.nombreCliente}</td>
                    <td>{formatDateForInput(venta.fecha)}</td>
                    <td className="d-flex justify-content-center">
                      <Button variant="success" onClick={() => openModal(venta)} style={{ marginRight: '15px' }}><FaFileLines />
                      </Button>
                      <Button variant="danger" onClick={() => handleDelete(venta.id_venta)}><FaTrashCan />
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </Card.Body>
        </Card>
      </Container>

      <Modal show={showModal} onHide={() => setShowModal(false)} size="lg">
        <Modal.Header closeButton>
          <Modal.Title>Detalle de Venta</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Card className="mt-3">
            <Card.Body>
              <Card.Title>Detalles de la Venta</Card.Title>
              <ul>
                {detalleVenta.map((detalle) => (
                  <li key={detalle.id_detalle}>
                    Producto: {detalle.nombreProducto}, Cantidad: {detalle.cantidad}
                  </li>
                ))}
              </ul>
            </Card.Body>
          </Card>
        </Modal.Body>
      </Modal>
    </div>
  );
}

export default VentaList;