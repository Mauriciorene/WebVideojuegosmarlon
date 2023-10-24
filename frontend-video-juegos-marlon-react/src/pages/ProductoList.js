import React, { useState, useEffect } from 'react';
import { Table, Button, Container, Card, Row, Col, Form, Modal, FloatingLabel } from 'react-bootstrap';
import Header from '../components/Header';
import { FaTrashCan, FaPencil } from 'react-icons/fa6';

function ProductoList() {
  const [productos, setProductos] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedProducto, setSelectedProducto] = useState({});
  const [formData, setFormData] = useState({
    nombre: '',
    precio: '',
    descripcion: '',
  });
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const openModal = (producto) => {
    setSelectedProducto(producto);

    setFormData({
      nombre: producto.nombre,
      precio: producto.precio,
      descripcion: producto.descripcion,
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

  const loadProductos = () => {
    fetch('http://localhost:5000/crud/getProductos')
      .then((response) => response.json())
      .then((data) => setProductos(data))
      .catch((error) => console.error('Error al obtener los productos:', error));
  };

  const handleUpdate = () => {
    fetch(`http://localhost:5000/crud/updateProducto/${selectedProducto.id_producto}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    })
      .then((response) => {
        if (response.ok) {
          setShowModal(false);
          loadProductos();
        }
      })
      .catch((error) => console.error('Error al actualizar el producto:', error));
  };

  const handleDelete = (id_producto) => {
    const confirmation = window.confirm('¿Seguro que deseas eliminar este producto?');
    if (confirmation) {
      fetch(`http://localhost:5000/crud/deleteProducto/${id_producto}`, {
        method: 'DELETE',
      })
        .then((response) => {
          if (response.ok) {
            loadProductos();
          }
        })
        .catch((error) => console.error('Error al eliminar el producto:', error));
    }
  };

  useEffect(() => {
    loadProductos();
  }, []);

  const filteredProductos = productos.filter((producto) => {
    const nombre = producto.nombre.toLowerCase();
    const descripcion = producto.descripcion.toLowerCase();
    const search = searchQuery.toLowerCase();

    return nombre.includes(search) || descripcion.includes(search);
  });

  return (
    <div>
      <Header />

      <Card className="m-3">
        <Card.Body>
          <Card.Title className="mb-3">Listado de Productos</Card.Title>

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
                <th>Nombre</th>
                <th>Precio</th>
                <th>Descripción</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {filteredProductos.map((producto) => (
                <tr key={producto.id_producto}>
                  <td>{producto.id_producto}</td>
                  <td>{producto.nombre}</td>
                  <td>{producto.precio}</td>
                  <td>{producto.descripcion}</td>
                  <td>
                    <Button variant="primary" onClick={() => openModal(producto)}>
                      <FaPencil />
                    </Button>
                    <Button variant="danger" onClick={() => handleDelete(producto.id_producto)}>
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
          <Modal.Title>Actualizar Producto</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Card className="mt-3">
            <Card.Body>
              <Card.Title>Registro de Producto</Card.Title>
              <Form className="mt-3">
                <Row className="g-3">
                  <Col sm="6" md="6" lg="4">
                    <FloatingLabel controlId="nombre" label="Nombre">
                      <Form.Control
                        type="text"
                        placeholder="Ingrese el nombre"
                        name="nombre"
                        value={formData.nombre}
                        onChange={handleFormChange}
                      />
                    </FloatingLabel>
                  </Col>
                  <Col sm="6" md="6" lg="4">
                    <FloatingLabel controlId="precio" label="Precio">
                      <Form.Control
                        type="number"
                        placeholder="Ingrese el precio"
                        name="precio"
                        value={formData.precio}
                        onChange={handleFormChange}
                      />
                    </FloatingLabel>
                  </Col>
                  <Col sm="12" md="6" lg="4">
                    <FloatingLabel controlId="descripcion" label="Descripción">
                      <Form.Control
                        type="text"
                        placeholder="Ingrese la descripción"
                        name="descripcion"
                        value={formData.descripcion}
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

export default ProductoList;
