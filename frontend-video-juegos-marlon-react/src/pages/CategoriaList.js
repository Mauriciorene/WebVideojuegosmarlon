import React, { useState, useEffect } from 'react';
import { Table, Button, Card, Row, Col, Form, Modal, FloatingLabel } from 'react-bootstrap';
import Header from '../components/Header';
import { FaTrashCan, FaPencil } from 'react-icons/fa6';

function CategoriaList() {
  const [categorias, setCategorias] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedCategoria, setSelectedCategoria] = useState({});
  const [formData, setFormData] = useState({
    nombre: '',
    descripcion: '',
  });
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const openModal = (categoria) => {
    setSelectedCategoria(categoria);

    setFormData({
      nombre: categoria.nombre,
      descripcion: categoria.descripcion,
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

  const loadCategorias = () => {
    fetch('http://localhost:5000/crud/getCategorias')
      .then((response) => response.json())
      .then((data) => setCategorias(data))
      .catch((error) => console.error('Error al obtener las categorías:', error));
  };

  const handleUpdate = () => {
    fetch(`http://localhost:5000/crud/updateCategoria/${selectedCategoria.id_categoria}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    })
      .then((response) => {
        if (response.ok) {
          setShowModal(false);
          loadCategorias();
        }
      })
      .catch((error) => console.error('Error al actualizar la categoría:', error));
  };

  const handleDelete = (id_categoria) => {
    const confirmation = window.confirm('¿Seguro que deseas eliminar esta categoría?');
    if (confirmation) {
      fetch(`http://localhost:5000/crud/deleteCategoria/${id_categoria}`, {
        method: 'DELETE',
      })
        .then((response) => {
          if (response.ok) {
            loadCategorias();
          }
        })
        .catch((error) => console.error('Error al eliminar la categoría:', error));
    }
  };

  useEffect(() => {
    loadCategorias();
  }, []);

  const filteredCategorias = categorias.filter((categoria) => {
    const nombre = categoria.nombre.toLowerCase();
    const descripcion = categoria.descripcion.toLowerCase();
    const search = searchQuery.toLowerCase();

    return nombre.includes(search) || descripcion.includes(search);
  });

  return (
    <div>
      <Header />

      <Card className="m-3">
        <Card.Body>
          <Card.Title className="mb-3">Listado de Categorías</Card.Title>

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
                <th>Descripción</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {filteredCategorias.map((categoria) => (
                <tr key={categoria.id_categoria}>
                  <td>{categoria.id_categoria}</td>
                  <td>{categoria.nombre}</td>
                  <td>{categoria.descripcion}</td>
                  <td>
                    <Button variant="primary" onClick={() => openModal(categoria)}>
                      <FaPencil />
                    </Button>
                    <Button variant="danger" onClick={() => handleDelete(categoria.id_categoria)}>
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
          <Modal.Title>Actualizar Categoría</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Card className="mt-3">
            <Card.Body>
              <Card.Title>Registro de Categoría</Card.Title>
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
                  <Col sm="12" md="6" lg="8">
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

export default CategoriaList;

