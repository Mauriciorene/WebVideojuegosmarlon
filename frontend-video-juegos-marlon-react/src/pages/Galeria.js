import React, { useState, useEffect } from 'react';  // Importa las funciones useState y useEffect de React
import { Row, Col, Container, Card, Badge, Form, FloatingLabel } from 'react-bootstrap';  // Importa componentes de react-bootstrap
import Header from '../components/Header';  // Importa el componente Header desde su ubicación relativa
import '../styles/App.css';  // Importa estilos CSS del archivo App.css
import { CategoryScale } from 'chart.js';

function Galeria({Rol}) {  // Define un componente funcional Galeria que recibe props

    const [productos, setProductos] = useState([]);  // Crea un estado para almacenar la lista de productos
    const [categorias, setCategorias] = useState([]); // Nuevo estado para almacenar la lista de categorías
    const [searchQuery, setSearchQuery] = useState('');  // Crea un estado para almacenar la cadena de búsqueda

    const handleSearchChange = (e) => {  // Función para manejar cambios en la búsqueda
        setSearchQuery(e.target.value);  // Actualiza el estado con la cadena de búsqueda ingresada
    };

    useEffect(() => {
        // Obtén la lista de productos
        fetch('http://localhost:5000/crud/readproducto')
          .then((response) => response.json())
          .then((data) => setProductos(data))
          .catch((error) => console.error('Error al obtener los productos:', error));
    
        // Obtén la lista de categorías
        fetch('http://localhost:5000/crud/readcategoria')
          .then((response) => response.json())
          .then((data) => setCategorias(data))
          .catch((error) => console.error('Error al obtener las categorías:', error));
      }, []);
    
      const getCategoryNameById = (categoryId) => {
        // Encuentra el nombre de la categoría por ID
        const category = categorias.find((cat) => cat.id_categoria === categoryId);
        return category ? category.nombre : ''; // Devuelve el nombre si se encuentra, de lo contrario, devuelve una cadena vacía
      };

    const filteredProductos = productos.filter((producto) => {  // Filtra los productos según la cadena de búsqueda
        // Convierte a minúsculas los valores de los campos para realizar una búsqueda insensible a mayúsculas y minúsculas
        const id_producto = producto.id_producto;
        const id_categoria = producto.id_categoria;
        const descripcion = producto.descripcion.toLowerCase();
        const nombreProducto = producto.nombreProducto.toLowerCase(); 
        const precio = producto.precio;
        const Stock = producto.Stock;
        const search = searchQuery.toLowerCase();
        
        // Verifica si la cadena de búsqueda se encuentra en algún campo de los productos
        // Devuelve un nuevo array con los productos filtrados
        return (
        id_producto == (search) ||
        id_categoria == (search) ||
        descripcion.includes(search) ||
        nombreProducto.includes(search) ||
        precio == (search) ||
        Stock == (search) 
        );

    });

    useEffect(() => {  // Realiza una solicitud GET al servidor para obtener los productos
        fetch('http://localhost:5000/crud/readproducto')  // Realiza una petición GET al servidor
        .then((response) => response.json())  // Convierte la respuesta a formato JSON
        .then((data) => setProductos(data))  // Actualiza el estado con la lista de productos obtenida
        .catch((error) => console.error('Error al obtener los productos:', error));  // Maneja errores en la obtención de productos
    }, []);  // Se ejecuta solo en la primera renderización del componente

    return (
        <div>
        <Header Rol={ Rol } />

        <Container className="margen-contenedor">

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

        <Row className="g-3">
            {filteredProductos.map((producto) => (
            <Col sm="12" md="4" lg="3">
                <Card>
                <Card.Img className="image-card" variant="top" src={producto.imagen} alt={producto.nombre} />
                <Card.Body>
                    <Card.Title>{producto.nombreProducto}</Card.Title>
                    <Card.Text>
                    {producto.descripcion}
                    </Card.Text>
                    <div>
                    <Badge bg="primary">Stock: {producto.Stock}</Badge>
                    <Badge bg="success">Precio: {producto.precio}</Badge>
                    <Badge bg="warning" text="dark">
                        Categoria: {getCategoryNameById(producto.id_categoria)}
                    </Badge>
                    </div>
                </Card.Body>
                <Card.Body>
                    <Card.Link href="/producto">Comprar</Card.Link>
                </Card.Body>
                </Card>
            </Col>            
            ))}
        </Row>
        </Container>

    </div>
    );
    }

export default Galeria;  // Exporta el componente Galeria
