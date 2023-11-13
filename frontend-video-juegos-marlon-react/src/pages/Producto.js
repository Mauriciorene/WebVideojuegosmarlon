import React, { useState, useEffect } from 'react';
import { Form, Row, Col, Container, FloatingLabel, Card, Button } from 'react-bootstrap';
import Header from '../components/Header';
import '../styles/App.css';

function Producto({Rol}) {

    //Validacion y limite de lingitud de caracteres para el Producto------------------------------------------
    const handleNombreChange = (e) => {
      // Validar que solo se ingresen letras y espacios
      const regex = /^[A-Za-z\s]+$/;
  
          // Validar longitud máxima
        if (regex.test(e.target.value) || e.target.value === '') {
        setNombreProducto(e.target.value.slice(0, 30)); // Limitar la longitud a 20 caracteres
      }
    };

        //Validacion y limite de lingitud de caracteres para el Producto------------------------------------------
        const handleDescripcionChange = (e) => {
          // Validar que solo se ingresen letras y espacios 
          const regex = /^[A-Za-z\s]+$/;
          
          // Validar longitud máxima
          if (regex.test(e.target.value) || e.target.value === '') {
            setDescripcion(e.target.value.slice(0, 100)); // Limitar la longitud a 100 caracteres
          }
        };

        //Validacion y limite de lingitud de caracteres para el Precio------------------------------------------
        const handlePrecioChange = (e) => {
          // Validar que solo se ingresen números y no hay límite de longitud
          const regex = /^[0-9]+$/;
          
          // Validar que solo se ingresen números
          if (regex.test(e.target.value) || e.target.value === '') {
            setPrecio(e.target.value);
          }
        };

        //Validacion y limite de lingitud de caracteres para el Stock------------------------------------------
        const handleStockChange = (e) => {
          // Validar que solo se ingresen números y no hay límite de longitud
          const regex = /^[0-9]+$/;
          
          // Validar que solo se ingresen números
          if (regex.test(e.target.value) || e.target.value === '') {
            setStock(e.target.value);
          }
        };

  // Crear un estado para cada campo del formulario
  const [descripcion, setDescripcion] = useState('');
  const [nombreProducto, setNombreProducto] = useState('');
  const [precio, setPrecio] = useState('');
  const [Stock, setStock] = useState('');
  const [categorias, setCategorias] = useState([]); // Estado para almacenar las categorias
  const [id_categoria, setIDCategoria] = useState(''); // Estado para el valor seleccionado
  const [imagen, setImagen] = useState('');
  const [error, setError] = useState('');

  const handleImagenChange = (event) => {
    const file = event.target.files[0]; // Obtener el primer archivo seleccionado
  
    const reader = new FileReader();
    reader.onload = () => {
      const base64String = reader.result; // Obtener la imagen en formato base64
      setImagen(base64String); // Puedes visualizar la imagen en base64 en la consola para asegurarte de que la conversión se hizo correctamente
    }; 
    if (file) {
      reader.readAsDataURL(file); // Lee el contenido del archivo como base64
    }
  };

  // Función para manejar el envío del formulario
  const handleSubmit = async (e) => {
    e.preventDefault();

// Validación de campos vacíos y notificar al usuario sobre los campos incompletos
if (!descripcion || !nombreProducto || !precio || !Stock || !id_categoria || !imagen) {
  setError('Por favor, complete todos los campos.');
  return;
}

        // Validación individual de campos
        if (!nombreProducto) {
          setError('Por favor, ingrese el nombre del producto.');
          return;
        }
    
        if (!id_categoria || id_categoria === 'Seleccione la categoria') {
          setError('Por favor, seleccione una categoría.');
          return;
        }
    
        if (!descripcion) {
          setError('Por favor, ingrese la descripción.');
          return;
        }
    
        if (!precio) {
          setError('Por favor, ingrese el precio.');
          return;
        }
    
        if (!Stock) {
          setError('Por favor, ingrese el stock.');
          return;
        }
    
        if (!imagen) {
          setError('Por favor, seleccione una imagen.');
          return;
        }

    // Crear un objeto con los datos del formulario
    const formData = {
      descripcion,
      nombreProducto,
      precio,
      Stock,
      id_categoria,
      imagen
    };

    try {
      // Realizar una solicitud HTTP al backend para enviar los datos
      const response = await fetch('http://localhost:5000/crud/createProducto', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        // El registro se creó exitosamente
        alert('Registro exitoso');
        // Reiniciar los campos del formulario
        setDescripcion('');
        setNombreProducto('');
        setPrecio('');
        setStock('');
        setIDCategoria('');
      } else {
        alert('Error al registrar el producto');
      }
    } catch (error) {
      console.error('Error en la solicitud:', error);
      alert('Error en la solicitud al servidor');
    }
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

  return(
    <div>
      <Header Rol={ Rol } />
      
      <Container>
        <Card className="margen-contenedor">
          <Card.Body>
            <Card.Title>Registro de Productos</Card.Title>
            <Form className="mt-3" onSubmit={handleSubmit}>
              <Row className="g-3">

                <Col sm="6" md="6" lg="8">
                  <FloatingLabel controlId="nombreProducto" label="Nombre">
                    <Form.Control
                      type="text"
                      placeholder="Ingrese el nombre de producto"
                      value={nombreProducto}
                      onChange={handleNombreChange}
                    />
                  </FloatingLabel>
                  {error && error.includes('nombreProducto') && <div className="text-danger">{error}</div>}
                </Col>

                <Col sm="12" md="6" lg="4">
                  <FloatingLabel controlId="id_categoria" label="Categoria">
                    <Form.Select 
                      aria-label="Categoria"
                      value={id_categoria}
                      onChange={(e) => setIDCategoria(e.target.value)}
                    >
                      <option>Seleccione la categoria</option>
                      {categorias.map((categoria) => (
                        <option key={categoria.id_categoria} value={categoria.id_categoria}>
                          {categoria.nombre}
                        </option>
                      ))}
                    </Form.Select>
                  </FloatingLabel>
                  {error && error.includes('Categoria') && <div className="text-danger">{error}</div>}
                </Col>

                <Col sm="6" md="6" lg="12">
                  <FloatingLabel controlId="descripcion" label="Descripcion">
                    <Form.Control
                      type="text"
                      placeholder="Escriba aqui"
                      value={descripcion}
                      onChange={handleDescripcionChange}
                    />
                  </FloatingLabel>
                  {error && error.includes('descripcion') && <div className="text-danger">{error}</div>}
                </Col>               

                <Col sm="12" md="6" lg="6">
                  <FloatingLabel controlId="precio" label="Precio">
                    <Form.Control 
                      type="text" 
                      min={1} 
                      placeholder="Ingrese el precio"
                      value={precio}
                      onChange={handlePrecioChange} 
                    />
                  </FloatingLabel>
                  {error && error.includes('precio') && <div className="text-danger">{error}</div>}
                </Col>

                <Col sm="12" md="6" lg="6">
                  <FloatingLabel controlId="Stock" label="Stock">
                    <Form.Control 
                      type="text"
                      min={1} 
                      placeholder="Ingrese el stock"
                      value={Stock}
                      onChange={handleStockChange} 
                    />
                  </FloatingLabel>
                  {error && error.includes('Stock') && <div className="text-danger">{error}</div>}
                </Col>

                <Col sm="12" md="6" lg="6">
                  <Form.Group controlId="imagen" className="" >
                    <Form.Control 
                      type="file" 
                      accept=".jpg, .png, .jpeg"
                      size="lg"
                      onChange={handleImagenChange}
                    />
                  </Form.Group>
                  {error && error.includes('imagen') && <div className="text-danger">{error}</div>}
                </Col>

              </Row>
              <div className="center-button">
                <Button variant="primary" type="submit" className="mt-3" size="lg">
                  Registrar
                </Button>
              </div>
            </Form>
          </Card.Body>
        </Card>
      </Container>

    </div>
  );
}

export default Producto;