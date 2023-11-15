import React , { useState, useEffect } from 'react';
import { Button, Container, Card, Row, Col, Form, Modal, FloatingLabel, Table } from 'react-bootstrap';
import { FaSearch, FaPlus, FaTrashAlt } from 'react-icons/fa';
import Header from '../components/Header';
import '../styles/App.css';

function Venta({ rol }) {

  const [formData, setFormData] = useState({
    Id_Cliente: '',
    Id_Producto: ''
  });

  const [Fecha_Pedido, setFecha_Pedido] = useState('');
  const [Cantidad, setCantidad] = useState('');
  const [Direccion, setDireccion] = useState('');
  const [Estado_Pedido, setEstado_Pedido] = useState('');


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
    if (selectedProducto && Cantidad) {
      const nuevoDetalle = {
        Id_Producto: selectedProducto.Id_Producto,
        Nombre_Producto: selectedProducto.Nombre_Producto,
        Precio: selectedProducto.Precio,
        Cantidad: Cantidad
      };
      setDetallesVenta([...detallesVenta, nuevoDetalle]);
      setCantidad('');
      setSelectedProducto('');
    } else {
      alert('Asegúrese de selecionar un producto o ingresar una cantidad.');
    }
  };

  const EliminarDetalle = (idProducto) => {
    const detallesActualizados = detallesVenta.filter(detalle => detalle.idProducto !== idProducto);
    setDetallesVenta(detallesActualizados);
  };


  const filteredClientes = clientes.filter((cliente) => {
    // Convierte los valores de los campos a minúsculas para realizar una búsqueda insensible a mayúsculas y minúsculas
    const Id_Cliente = cliente.Id_Cliente;
    const Nombre = cliente.Nombre.toLowerCase(); 
    const search = searchQuery.toLowerCase();
    
    // Verifica si la cadena de búsqueda se encuentra en algún campo
    return (
      Id_Cliente == (search) ||
      Nombre.includes(search)
    );
  });
  

  //Manejo de carga y selección de Clientes --------------------------------------
  const loadClientes = () => {
    fetch('http://localhost:5000/crud/readCliente')
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
      Id_Cliente: cliente.Id_Cliente,
    });
    closeClienteModal();
  };

  //Manejo de carga y selección de Productos --------------------------------------
  const loadProductos = () => {
    fetch('http://localhost:5000/crud/readProducto')
      .then((response) => response.json())
      .then((data) => setProductos(data))
      .catch((error) => console.error('Error al obtener los productos:', error));
  };

  //Control de apertura de modal de Empleados
  const openProductoModal = () => {
    setShowProductoModal(true);
  };

  //Control de clierre de modal de Empleados
  const closeProductoModal = () => {
    setShowProductoModal(false);
  };

  //Actualización de valor de variable de estado de Empleado selecionado
  const selectProducto = (producto) => {
    setSelectedProducto(producto);
    setFormData({
      ...formData,
      Id_Producto: producto.Id_Producto,
    });
    closeProductoModal();
  };

  //Carga de datos de Clientes, Empleados y Productos
  useEffect(() => {
    loadClientes ();
    loadProductos();
  }, []);


  const registrarVenta = () => {
    if (Fecha_Pedido && selectedCliente && detallesVenta.length > 0) {
      const data = {
        Fecha_Pedido: Fecha_Pedido,
        Direccion: Direccion,
        Estado_Pedido: Estado_Pedido,
        Id_Cliente: selectedCliente.Id_Cliente,
        detallesPedido: detallesVenta,
      };

      fetch('http://localhost:5000/crud/createPedido', {
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
            setFecha_Pedido('');
            setDireccion('');
            setDetallesVenta([]);
            setSelectedCliente('');
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


  return(
    <div>
      <Header rol={ rol } />

      <Container className="margen-contenedor">
        <Card className="global-margin-top">
          <Card.Body>
            <Card.Title className="mt-3 title">Registro de Venta</Card.Title>
            <Form className="mt-3" >
              <Row className="g-3">

                <Col sm="12" md="4" lg="4">
                  <FloatingLabel controlId="Fecha_Pedido" label="Fecha">
                    <Form.Control 
                      type="date" 
                      placeholder="Seleccione la fecha venta"
                      value={Fecha_Pedido}
                      onChange={(e) => setFecha_Pedido(e.target.value)} 
                    />
                  </FloatingLabel>
                </Col>

                <Col sm="12" md="6" lg="4">
                  <FloatingLabel controlId="cliente" label="Cliente">
                    <Form.Control
                      type="text"
                      placeholder="Seleccionar Cliente"
                      name="cliente"
                      value={selectedCliente ? selectedCliente.Nombre : ''}
                      readOnly
                    />
                    <div className="button-container">
                      <Button className="search-button" variant="outline-primary" onClick={openClienteModal}>
                        <FaSearch />
                      </Button>
                    </div>
                  </FloatingLabel>
                </Col>

                <Col sm="12" md="6" lg="4">
                  <FloatingLabel controlId="producto" label="Producto">
                    <Form.Control
                      type="text"
                      placeholder="Seleccionar Producto"
                      name="producto"
                      value={selectedProducto ? selectedProducto.Nombre_Producto : ''}
                      readOnly
                    />
                    <div className="button-container">
                      <Button className="search-button" variant="outline-primary" onClick={openProductoModal}>
                        <FaSearch />
                      </Button>
                    </div>
                  </FloatingLabel>
                </Col>

                <Col sm="10" md="4" lg="3" className="">
                  <FloatingLabel controlId="cantidad" label="Cantidad">
                    <Form.Control 
                      type="number" 
                      placeholder="Cantidad de Producto"
                      value={Cantidad}
                      onChange={(e) => setCantidad
                        (e.target.value)} 
                    />
                  </FloatingLabel>
                </Col>

                <Col sm="2" md="2" lg="1" className="d-flex align-items-center">
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
                          <tr key={detalle.Id_Producto}>
                            <td>{detalle.Id_Producto}</td>
                            <td>{detalle.Nombre_Producto}</td>
                            <td>{detalle.Precio}</td>
                            <td>{detalle.Cantidad}</td>
                            <td>{detalle.Cantidad * detalle.Precio}</td>
                            <td className="align-button">
                              <Button 
                                size="sm"
                                onClick={() => EliminarDetalle(detalle.idProducto)}
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
                <Button variant="primary" onClick={registrarVenta} className="mt-3" size="lg">
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
                <tr key={cliente.Id_Cliente} onClick={() => selectCliente(cliente)}>
                  <td>{cliente.Nombre}</td>
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
            <div className="Seleccion" key={producto.Id_Producto} onClick={() => selectProducto(producto)}>
              {producto.Nombre_Producto}
            </div>
          ))}
        </Modal.Body>
      </Modal>

    </div>
  );
}

export default Venta;