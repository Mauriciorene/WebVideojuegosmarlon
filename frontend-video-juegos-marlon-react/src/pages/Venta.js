import React, { useState, useEffect } from 'react';
import { Form, Row, Col, Container, FloatingLabel, Card, Button, Table, Modal } from 'react-bootstrap';
import Header from '../components/Header';
import { FaTrashCan, FaPencil } from 'react-icons/fa6';
import '../styles/App.css';

function Venta({ Rol }) {
  // Estado para la lista de clientes
  const [clientes, setClientes] = useState([]);

  // Estado para la lista de productos
  const [productos, setProductos] = useState([]);

  // Estado para los datos del formulario de venta
  const [formData, setFormData] = useState({
    idCliente: '',
    idProducto: '',
    cantidad: '',
    fecha: '',
  });

  // Estado para la lista de ventas
  const [ventas, setVentas] = useState([]);

  // Estado para el modal de edición
  const [showModal, setShowModal] = useState(false);

  // Estado para la venta seleccionada para la edición
  const [selectedVenta, setSelectedVenta] = useState({});

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

  // Función para cargar la lista de ventas desde el servidor
  const loadVentas = () => {
    fetch('http://localhost:5000/crud/readVenta')
      .then((response) => response.json())
      .then((data) => setVentas(data))
      .catch((error) => console.error('Error al obtener las ventas:', error));
  };

  // Función para manejar cambios en el formulario de venta
  const handleFormChange = (e) => {
    const { name, value } = e.target;

    setFormData({
      ...formData,
      [name]: value,
    });
  };

  // Crear búsqueda
const [searchQuery, setSearchQuery] = useState('');

const handleSearchChange = (e) => {
  setSearchQuery(e.target.value);
};

const filteredVentas = ventas.filter((venta) => {
  // Convierte los valores de los campos a minúsculas para realizar una búsqueda insensible a mayúsculas y minúsculas
  const productoNombre = getProductNameById(venta.id_producto).toLowerCase();
  const clienteNombre = getClientNameById(venta.id_cliente).toLowerCase();
  const fecha = formatDateForInput(venta.fecha);
  const search = searchQuery.toLowerCase();

  // Verifica si la cadena de búsqueda se encuentra en algún campo
  return (
    productoNombre.includes(search) ||
    clienteNombre.includes(search) ||
    fecha.includes(search) ||
    venta.id_venta.toString().includes(search) ||
    venta.cantidad.toString().includes(search)
  );
});

  // Función para abrir el modal de edición
  const openModal = (venta) => {
    setSelectedVenta(venta);

    setFormData({
      idCliente: venta.id_cliente,
      idProducto: venta.id_producto,
      cantidad: venta.cantidad,
      fecha: venta.fecha,
    });

    setShowModal(true);
  };

  // Función para cerrar el modal de edición
  const closeModal = () => {
    setShowModal(false);
    setSelectedVenta({});
  };

  // Función para actualizar una venta
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
          closeModal();
          loadVentas();
        }
      })
      .catch((error) => console.error('Error al actualizar la venta:', error));
  };

  // Función para eliminar una venta
  const handleDelete = (idVenta) => {
    const confirmation = window.confirm('¿Seguro que deseas eliminar esta venta?');
    if (confirmation) {
      fetch(`http://localhost:5000/crud/deleteVenta/${idVenta}`, {
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

  // Función para formatear la fecha para el input de tipo "date"
  const formatDateForInput = (dateTimeString) => {
    const date = new Date(dateTimeString);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  };

  // Función para obtener el nombre del producto por su ID
  const getProductNameById = (productId) => {
    const product = productos.find((p) => p.id_producto === productId);
    return product ? product.nombreProducto : 'Producto no encontrado';
  };

  // Función para obtener el nombre del cliente por su ID
  const getClientNameById = (clientId) => {
    const client = clientes.find((c) => c.id_cliente === clientId);
    return client ? client.nombre : 'Cliente no encontrado';
  };

  // Realiza una solicitud GET al servidor para obtener las ventas, productos y clientes
  useEffect(() => {
    loadClientes();
    loadProductos();
    loadVentas();
  }, []);


  return (
    <div>
      <Header Rol={Rol} />
  
      <Container>
        <Card className="margen-contenedor">
          <Card.Body>
            <Card.Title>Registro de Venta</Card.Title>
            <Form>
              <Row className="mb-3">
                <Col sm="6" md="6" lg="3">
                  <FloatingLabel controlId="idCliente" label="Cliente">
                    <Form.Select
                      aria-label="Cliente"
                      value={formData.idCliente}
                      onChange={handleFormChange}
                      name="idCliente"
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
                  <FloatingLabel controlId="idProducto" label="Producto">
                    <Form.Select
                      aria-label="Producto"
                      value={formData.idProducto}
                      onChange={handleFormChange}
                      name="idProducto"
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
                      placeholder="Ingrese la cantidad"
                      value={formData.cantidad}
                      onChange={handleFormChange}
                      name="cantidad"
                    />
                  </FloatingLabel>
                </Col>
  
                <Col sm="6" md="6" lg="3">
                  <FloatingLabel controlId="fecha" label="Fecha">
                    <Form.Control
                      type="date"
                      value={formatDateForInput(formData.fecha)}
                      onChange={handleFormChange}
                      name="fecha"
                    />
                  </FloatingLabel>
                </Col>

                <Col sm="12" md="1" lg="12">
                <Card className="margen-contenedor">
                  <Card.Body>
                    <Card.Title className="mb-3">Detalle de Ventas</Card.Title>

                    <Table striped bordered hover responsive>
                      <thead>
                        <tr>
                          <th>ID</th>
                          <th>Producto</th>
                          <th>Cantidad</th>
                          <th>Cliente</th>
                          <th>Fecha</th>
                          <th>Acciones</th>
                        </tr>
                      </thead>
                      <tbody>
                        {filteredVentas.map((venta) => (
                          <tr key={venta.id_venta}>
                            <td>{venta.id_venta}</td>
                            <td>{getProductNameById(venta.id_producto)}</td>
                            <td>{venta.cantidad}</td>
                            <td>{getClientNameById(venta.id_cliente)}</td>
                            <td>{formatDateForInput(venta.fecha)}</td>
                            <td>
                              <Button
                                variant="primary"
                                onClick={() => openModal(venta)}
                                style={{ marginRight: '15px' }}
                              >
                                <FaPencil />
                              </Button>
                              <Button
                                variant="danger"
                                onClick={() => handleDelete(venta.id_venta)}
                              >
                                <FaTrashCan />
                              </Button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </Table>
                  </Card.Body>
                </Card>
                </Col>

              </Row>
              <div className="center-button">
                <Button variant="primary" type="submit" className="mt-3" size="lg" onClick={handleUpdate}>
                  Registrar
                </Button>
              </div>
            </Form>
          </Card.Body>
        </Card>
        

  
        <Modal show={showModal} onHide={closeModal} size="lg">
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
                          value={formData.idProducto}
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
                          value={getClientNameById(selectedVenta.id_cliente)}
                          onChange={handleFormChange}
                          readOnly
                        />
                      </FloatingLabel>
                      <div>Nombre del Cliente: {getClientNameById(formData.idCliente)}</div>
                    </Col>
                  </Row>
                </Form>
              </Card.Body>
            </Card>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={closeModal}>
              Cerrar
            </Button>
            <Button variant="primary" onClick={handleUpdate}>
              Actualizar
            </Button>
          </Modal.Footer>
        </Modal>
      </Container>
    </div>
  );
  }
  
  export default Venta;
  