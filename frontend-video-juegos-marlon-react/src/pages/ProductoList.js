import React, { useState, useEffect } from 'react';
import { Table, Button, Container, Card, Row, Col, Form, Modal, FloatingLabel } from 'react-bootstrap';
import Header from '../components/Header';

function ProductoList() {
  const [productos, setProductos] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedProducto, setSelectedProducto] = useState({});
  const [formData, setFormData] = useState({
    id_categoria: '',
    descripcion: '',
    nombreProducto: '',
    precio: '',
    stock: '',
  });

  const openModal = (producto) => {
    setSelectedProducto(producto);

    setFormData({
      id_categoria: producto.id_categoria,
      descripcion: producto.descripcion,
      nombreProducto: producto.nombreProducto,
      precio: producto.precio,
      stock: producto.stock,
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

  return (
    <div>
      <Header />

      <Card className="m-3">
        <Card.Body>
          <Card.Title className="mb-3">Listado de Productos</Card.Title>
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>ID</th>
                <th>ID de Categoría</th>
                <th>Descripción</th>
                <th>Nombre del Producto</th>
                <th>Precio</th>
                <th>Stock</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {productos.map((producto) => (
                <tr key={producto.id_producto}>
                  <td>{producto.id_producto}</td>
                  <td>{producto.id_categoria}</td>
                  <td>{producto.descripcion}</td>
                  <td>{producto.nombreProducto}</td>
                  <td>{producto.precio}</td>
                  <td>{producto.stock}</td>
                  <td>
                    <Button variant="primary" onClick={() => openModal(producto)}>Actualizar</Button>
                    <Button variant="danger" onClick={() => handleDelete(producto.id_producto)}>Eliminar</Button>
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
                    <FloatingLabel controlId="idCategoria" label="ID de Categoría">
                      <Form.Control
                        type="number"
                        placeholder="Ingrese el ID de categoría"
                        name="id_categoria"
                        value={formData.id_categoria}
                        onChange={handleFormChange}
                      />
                    </FloatingLabel>
                  </Col>

                  <Col sm="6" md="6" lg="4">
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

                  <Col sm="6" md="6" lg="4">
                    <FloatingLabel controlId="nombreProducto" label="Nombre del Producto">
                      <Form.Control
                        type="text"
                        placeholder="Ingrese el nombre del producto"
                        name="nombreProducto"
                        value={formData.nombreProducto}
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

                  <Col sm="6" md="6" lg="4">
                    <FloatingLabel controlId="stock" label="Stock">
                      <Form.Control
                        type="number"
                        placeholder="Ingrese el stock"
                        name="stock"
                        value={formData.stock}
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
