import React , { useState, useEffect } from 'react';
import { Button, Container, Card, Row, Col, Form, Modal, FloatingLabel, Table } from 'react-bootstrap';
import { FaSearch, FaPlus, FaTrashAlt } from 'react-icons/fa';
import Header from '../components/Header';
import '../styles/App.css';

function Venta({ Rol }) {

  const [errors, setErrors] = useState({});
  const [formData, setFormData] = useState({
    id_cliente: '',
    id_producto: ''
  });

  const [fecha, setFecha] = useState('');
  const [cantidad, setCantidad] = useState('');
  const [clientes, setClientes] = useState([]);
  const [productos, setProductos] = useState([]);
  const [detallesVenta, setDetallesVenta] = useState([]);
  const [showClienteModal, setShowClienteModal] = useState(false);
  const [showProductoModal, setShowProductoModal] = useState(false);
  const [selectedCliente, setSelectedCliente] = useState(null);
  const [selectedProducto, setSelectedProducto] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const AgregarDetalleProducto = () => {
    if (selectedProducto && cantidad) {
      const nuevoDetalle = {
        id_producto: selectedProducto.id_producto,
        nombreProducto: selectedProducto.nombreProducto,
        precio: selectedProducto.precio,
        cantidad: cantidad
      };
      setDetallesVenta([...detallesVenta, nuevoDetalle]);
      setCantidad('');
      setSelectedProducto('');
    } else {
      alert('Asegúrese de selecionar un producto o ingresar una cantidad.');
    }
  };

  const EliminarDetalle = (id_producto) => {
    const detallesActualizados = detallesVenta.filter(detalle => detalle.id_producto !== id_producto);
    setDetallesVenta(detallesActualizados);
  };


  const filteredClientes = clientes.filter((cliente) => {
    // Convierte los valores de los campos a minúsculas para realizar una búsqueda insensible a mayúsculas y minúsculas
    const id_cliente = cliente.Id_Cliente;
    const nombre = cliente.nombre.toLowerCase(); 
    const search = searchQuery.toLowerCase();
    
    // Verifica si la cadena de búsqueda se encuentra en algún campo
    return (
      id_cliente == (search) ||
      nombre.includes(search)
    );
  });
  

  //Manejo de carga y selección de Clientes --------------------------------------
  const loadClientes = () => {
    fetch('http://localhost:5000/crud/getClientes')
      .then((response) => response.json())
      .then((data) => setClientes(data))
      .catch((error) => console.error('Error al obtener los clientes:', error));
  };

  //Control de apertura de modal de Clientes
  const openClienteModal = () => {
    setShowClienteModal(true);
  };

  //Control de clierre de modal de Clientes
  const closeClienteModal = () => {
    setShowClienteModal(false);
    setSearchQuery('');
  };

  //Actualización de valor de variable de estado de Cliente selecionado
  const selectCliente = (cliente) => {
    setSelectedCliente(cliente);
    setFormData({
      ...formData,
      id_cliente: cliente.id_cliente,
    });
    closeClienteModal();
  };

  //Manejo de carga y selección de Productos --------------------------------------
  const loadProductos = () => {
    fetch('http://localhost:5000/crud/readproducto')
      .then((response) => response.json())
      .then((data) => setProductos(data))
      .catch((error) => console.error('Error al obtener los productos:', error));
  };

  //Control de apertura de modal de producto
  const openProductoModal = () => {
    setShowProductoModal(true);
  };

  //Control de clierre de modal de producto
  const closeProductoModal = () => {
    setShowProductoModal(false);
  };

  const validarVenta = () => {
    const validationErrors = validateForm();

    if (Object.keys(validationErrors).length === 0) {
      registrarVenta();
      setErrors({});
    } else {
      alert('Por favor, complete todos los campos obligatorios.');
    }
  };

  //Actualización de valor de variable de estado de Empleado selecionado
  const selectProducto = (producto) => {
    setSelectedProducto(producto);
    setFormData({
      ...formData,
      id_producto: producto.id_producto,
    });
    closeProductoModal();
  };

  //Carga de datos de Clientes, Empleados y Productos
  useEffect(() => {
    loadClientes ();
    loadProductos();
  }, []);


  const registrarVenta = () => {
    if (fecha && selectedCliente && detallesVenta.length > 0) {
      const data = {
        fecha: fecha,
        id_cliente: selectedCliente.id_cliente,
        detallesVenta: detallesVenta,
      };

      fetch('http://localhost:5000/crud/createventa', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      })
        .then((response) => {
          if (response.ok) {
            // Aquí puedes mostrar un mensaje de éxito o reiniciar los estados
            console.log('Venta registrada con éxito');
            alert('¡Venta registrada con éxito!');
            setFecha('');
            setDetallesVenta([]);
            setSelectedCliente('');
            setSelectedProducto('');
            setCantidad('');
            // Limpia otros estados según sea necesario
          } else {
            // Aquí maneja el caso de error en la petición
            console.error('Error al registrar la venta');
          }
        })
        .catch((error) => {
          // Aquí maneja los errores de red u otros
          console.error('Error en la solicitud:', error);
        });
    } else {
      alert('Asegúrese de completar la información necesaria para registrar la venta.');
    }
  };

    // Validación
  const validateForm = () => {
    const newErrors = {}; 

  // Validación de campos vacíos y notificar al usuario sobre los campos incompletos

  if (!fecha) {
    newErrors.fecha = 'Por favor, seleccione la fecha de venta.';
  }

  if (!selectedCliente) {
    newErrors.cliente = 'Por favor, seleccione un cliente.';
  }

  setErrors(newErrors);
  return newErrors;
};



  return(
    <div>
      <Header Rol={ Rol } />

      <Container className="margen-contenedor">
        <Card className="global-margin-top">
          <Card.Body>
            <Card.Title className="mt-3 title">Registro de Venta</Card.Title>
            <Form className="mt-3" >
              <Row className="g-3">

                <Col sm="12" md="6" lg="2">
                  <FloatingLabel controlId="fecha" label="Fecha">
                    <Form.Control 
                      type="date" 
                      placeholder="Seleccione la fecha venta"
                      value={fecha}
                      onChange={(e) => setFecha(e.target.value)} 
                    />
                  </FloatingLabel>
                  {errors.fecha && <div className="text-danger">{errors.fecha}</div>}
                </Col>

                <Col sm="12" md="6" lg="3">
                  <FloatingLabel controlId="cliente" label="Cliente">
                    <Form.Control
                      type="text"
                      placeholder="Seleccionar Cliente"
                      name="cliente"
                      value={selectedCliente ? selectedCliente.nombre : ''}
                      readOnly
                    />
                    <div className="button-container">
                      <Button className="search-button" variant="outline-primary" onClick={openClienteModal}>
                        <FaSearch />
                      </Button>
                    </div>
                  </FloatingLabel>
                  {errors.cliente && <div className="text-danger">{errors.cliente}</div>}
                </Col>

                <Col sm="12" md="6" lg="4">
                  <FloatingLabel controlId="producto" label="Producto">
                    <Form.Control
                      type="text"
                      placeholder="Seleccionar Producto"
                      name="producto"
                      value={selectedProducto ? selectedProducto.nombreProducto : ''}
                      readOnly
                    />
                    <div className="button-container">
                      <Button className="search-button" variant="outline-primary" onClick={openProductoModal}>
                        <FaSearch />
                      </Button>
                    </div>
                  </FloatingLabel>
                  {errors.producto && <div className="text-danger">{errors.producto}</div>}
                </Col>

                <Col xs="10" sm="10" md="4" lg="2" className="">
                  <FloatingLabel controlId="cantidad" label="Cantidad">
                    <Form.Control 
                      type="number"
                      min={1} 
                      placeholder="Cantidad de Producto"
                      value={cantidad}
                      onChange={(e) => {
                        const inputValue = e.target.value;
                        if (/^\d*$/.test(inputValue)) {
                          setCantidad(inputValue);
                        }
                      }}
                    />
                  </FloatingLabel>
                  {errors.cantidad && <div className="text-danger">{errors.cantidad}</div>}
                </Col>

                <Col xs="2" sm="2" md="2" lg="1" className="d-flex align-items-center">
                  <Button onClick={AgregarDetalleProducto} variant="outline-success" size="lg">
                    <FaPlus />
                  </Button>
                </Col>

                <Col sm="12" md="12" lg="12">
                  <Card className="global-margin-top">
                    <Card.Body>
                      <Card.Title className="mt-3 title">Detalle de productos</Card.Title>
                      <Table striped bordered hover responsive>
                        <thead>
                          <tr>
                            <th>ID</th>
                            <th>Nombre</th>
                            <th>Precio</th>
                            <th>Cantidad</th>
                            <th>Subtotal</th>
                            <th>Acciones</th>
                          </tr>
                        </thead>
                        <tbody>
                        {detallesVenta.map((detalle) => (
                          <tr key={detalle.id_producto}>
                            <td>{detalle.id_producto}</td>
                            <td>{detalle.nombreProducto}</td>
                            <td>{detalle.precio}</td>
                            <td>{detalle.cantidad}</td>
                            <td>{detalle.cantidad * detalle.precio}</td>
                            <td className="align-button">
                              <Button 
                                size="sm"
                                onClick={() => EliminarDetalle(detalle.id_producto)}
                                variant="danger">
                                  
                                <FaTrashAlt />
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
                <Button variant="primary" onClick={validarVenta} className="mt-3" size="lg">
                  Registrar
                </Button>
              </div>
            </Form>
          </Card.Body>
        </Card>
      </Container>

      <Modal show={showClienteModal} onHide={closeClienteModal} centered scrollable size='md'>
        <Modal.Header closeButton>
          <Modal.Title>Seleccionar Cliente</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Row className="mb-3">
            <Col sm="12" md="12" lg="12">
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

          <Table striped bordered hover responsive>
            <thead>
              <tr>
                <th>Nombre</th>
              </tr>
            </thead>
            <tbody>
              {filteredClientes.map((cliente) => (
                <tr key={cliente.id_cliente} onClick={() => selectCliente(cliente)}>
                  <td>{cliente.nombre}</td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Modal.Body>
      </Modal>


      <Modal show={showProductoModal} onHide={closeProductoModal} centered>
        <Modal.Header closeButton>
          <Modal.Title>Seleccionar Producto</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {productos.map((producto) => (
            <div className="Seleccion" key={producto.id_producto} onClick={() => selectProducto(producto)}>
              {producto.nombreProducto}
            </div>
          ))}
        </Modal.Body>
      </Modal>

    </div>
  );
}

export default Venta;