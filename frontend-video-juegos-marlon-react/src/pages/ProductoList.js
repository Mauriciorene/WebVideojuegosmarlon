import React, { useState, useEffect } from 'react';
import { Table, Button, Card, Row, Col, Form, Modal, FloatingLabel  } from 'react-bootstrap';
import Header from '../components/Header';
import { FaTrashCan, FaPencil } from 'react-icons/fa6';
import '../styles/App.css';

function ProductoList({Rol}) {
  const [productos, setProductos] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedProducto, setSelectedProducto] = useState({});
  const [formData, setFormData] = useState({
    nombreProducto: '',
    descripcion: '',
    precio: '',
    Stock: '',
    id_categoria: '',
    imagen: ''
  });

  //Variables de estado de productos
  const [categorias, setCategorias] = useState([]); 

  useEffect(() => {
    // Realiza una solicitud a tu ruta para obtener las especialidades
    fetch('http://localhost:5000/crud/readcategoria')
      .then(response => response.json())
      .then(data => {
        // Actualiza el estado con las especialidades obtenidas
        setCategorias(data);
      })
      .catch(error => {
        console.error('Error al obtener las categorías.', error);
      });
  }, []);

  const handleImagenChange = (event) => {
    const file = event.target.files[0]; // Obtener el primer archivo seleccionado
  
    const reader = new FileReader();
    reader.onload = () => {
      const base64String = reader.result; // Obtener la imagen en formato base64
      setFormData({
        ...formData,
        imagen: base64String
      });
    }; 
    if (file) {
      reader.readAsDataURL(file); // Lee el contenido del archivo como base64
    }
  };

      // Crear busqueda
      const [searchQuery, setSearchQuery] = useState('');
  
      const handleSearchChange = (e) => {
        setSearchQuery(e.target.value);
      };

  const filteredProductos = productos.filter((producto) => {
    // Convierte los valores de los campos a minúsculas para realizar una búsqueda insensible a mayúsculas y minúsculas
    const nombreproducto = producto.nombreProducto.toLowerCase();
    const descripcion = producto.descripcion.toLowerCase();
    const search = searchQuery.toLowerCase();
  
    // Verifica si la cadena de búsqueda se encuentra en algún campo
    return (
      nombreproducto.includes(search) ||
      descripcion.includes(search) 
    );
  });

  // Función para abrir el modal y pasar los datos del docente seleccionado
  const openModal = (producto) => {
    setSelectedProducto(producto);

    setFormData({
      nombreProducto: producto.nombreProducto,
      descripcion: producto.descripcion,
      precio: producto.precio,
      Stock: producto.Stock,
      id_categoria: producto.id_categoria,
      imagen: producto.imagen
    });
    setShowModal(true);
  };

  // Función para manejar cambios en el formulario
  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const loadDocentes = () => {
    fetch('http://localhost:5000/crud/readProducto')
      .then((response) => response.json())
      .then((data) => setProductos(data))
      .catch((error) => console.error('Error al obtener los productos:', error));
  };

  useEffect(() => {
    // Realiza una solicitud a tu ruta para obtener las categorias
    fetch('http://localhost:5000/crud/readCategoria')
      .then(response => response.json())
      .then(data => {
        // Actualiza el estado con las categorias obtenidas
        setCategorias(data);
      })
      .catch(error => {
        console.error('Error al obtener las categorias', error);
      });
  }, []);


  // Función para enviar el formulario de actualización
  const handleUpdate = () => {
    // Realiza la solicitud PUT al servidor para actualizar el registro
    fetch(`http://localhost:5000/crud/updateProducto/${selectedProducto.id_producto}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    })
      .then((response) => {
        if (response.ok) {
          // La actualización fue exitosa, puedes cerrar el modal y refrescar la lista de productos
          setShowModal(false);
          loadDocentes(); // Cargar la lista de productos actualizada
        }
      })
      .catch((error) => console.error('Error al actualizar el registro:', error));
  };

  // Función para eliminar un producto
  const handleDelete = (id) => {
    const confirmation = window.confirm('¿Seguro que deseas eliminar este producto?');
    if (confirmation) {
      // Realiza la solicitud DELETE al servidor para eliminar el producto
      fetch(`http://localhost:5000/crud/deleteProducto/${id}`, {
        method: 'DELETE',
      })
        .then((response) => {
          if (response.ok) {
            // La eliminación fue exitosa, refresca la lista de productos
            loadDocentes();
          }
        })
        .catch((error) => console.error('Error al eliminar el producto:', error));
    }
  };

  // Realiza una solicitud GET al servidor para obtener los productos
  useEffect(() => {
    fetch('http://localhost:5000/crud/readProducto')
      .then((response) => response.json())
      .then((data) => setProductos(data))
      .catch((error) => console.error('Error al obtener los productos:', error));
  }, []);

  return (
    <div>
      <Header Rol={ Rol }/>

      <Card className="margen-contenedor">
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

          <Table striped bordered hover responsive>
            <thead>
              <tr>
                <th>ID</th>
                <th>Nombre</th>
                <th>Descripcion</th>
                <th>Precio</th>
                <th>Stock</th>
                <th>Categoria</th>
                <th>Imagen</th>
              </tr>
            </thead>
            <tbody>
              {filteredProductos.map((producto) => (
                <tr key={producto.id_producto}>
                  <td>{producto.id_producto}</td>
                  <td>{producto.nombreProducto}</td>
                  <td>{producto.descripcion}</td>
                  <td>{producto.precio}</td>
                  <td>{producto.Stock}</td>
                  <td>{producto.id_categoria}</td>
                  <td>
                  {/* Muestra la imagen en base64 */}
                  <img src={producto.imagen} alt={producto.nombre} style={{ width: '50px' }} />
                </td>
                <td>
                    <Button variant="success" onClick={() => openModal(producto)} style={{ marginRight: '15px' }}> <FaPencil /></Button>
                    <Button variant="danger" onClick={() => handleDelete(producto.id_producto)}><FaTrashCan /></Button>
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

                <Col sm="6" md="6" lg="8">
                  <FloatingLabel controlId="nombreProducto" label="Nombre">
                    <Form.Control
                      type="text"
                      placeholder="Ingrese el nombre de producto"
                      name='nombreProducto'
                      value={formData.nombreProducto}
                      onChange={handleFormChange}
                    />
                  </FloatingLabel>
                </Col>

                <Col sm="12" md="6" lg="4">
                  <FloatingLabel controlId="id_categoria" label="Categoria">
                    <Form.Select 
                      aria-label="Categoria"
                      name='id_categoria'
                      value={formData.id_categoria}
                      onChange={handleFormChange}
                    >
                      <option>Seleccione la categoria</option>
                      {categorias.map((categoria) => (
                        <option key={categoria.id_categoria} value={categoria.id_categoria}>
                          {categoria.nombre}
                        </option>
                      ))}
                    </Form.Select>
                  </FloatingLabel>
                </Col>

                <Col sm="6" md="6" lg="12">
                  <FloatingLabel controlId="descripcion" label="Descripcion">
                    <Form.Control
                      type="text"
                      placeholder="Escriba aqui"
                      name='descripcion'
                      value={formData.descripcion}
                      onChange={handleFormChange}
                    />
                  </FloatingLabel>
                </Col>               

                <Col sm="12" md="6" lg="6">
                  <FloatingLabel controlId="precio" label="Precio">
                    <Form.Control 
                      type="number" 
                      placeholder="Ingrese el precio"
                      name='precio'
                      value={formData.precio}
                      onChange={handleFormChange} 
                    />
                  </FloatingLabel>
                </Col>

                <Col sm="12" md="6" lg="6">
                  <FloatingLabel controlId="Stock" label="Stock">
                    <Form.Control 
                      type="number" 
                      placeholder="Ingrese el stock"
                      name='Stock'
                      value={formData.Stock}
                      onChange={handleFormChange} 
                    />
                  </FloatingLabel>
                </Col>

                <Col sm="12" md="12" lg="12">
                    <Form.Group controlId="imagen" className="" >
                      <Form.Control 
                        type="file" 
                        accept=".jpg, .png, .jpeg"
                        size="lg"
                        name="imagen"
                        onChange={handleImagenChange}
                      />
                    </Form.Group>
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