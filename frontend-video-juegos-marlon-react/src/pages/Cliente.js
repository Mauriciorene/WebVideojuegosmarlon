import React, { useState } from 'react';
import { Form, Row, Col, Container, FloatingLabel, Card, Button } from 'react-bootstrap';
import Header from '../components/Header';
import '../styles/App.css';

function Cliente({ userRol }) {
  // Crear un estado para cada campo del formulario
  const [nombre, setNombre] = useState('');
  const [apellido, setApellido] = useState('');
  const [telefono, setTelefono] = useState('');
  const [nombre_Usuario, setNombre_Usuario] = useState('');
  const [contraseña, setContraseña] = useState('');
  const [error, setError] = useState('');

  const Rol = 'cliente';

  // Validar y limitar longitud de caracteres para el Cliente
  const handleNombreChange = (e) => {
  const regex = /^[A-Za-z\s]+$/;

    if (regex.test(e.target.value) || e.target.value === '') {
      setNombre(e.target.value.slice(0, 20)); // Limitar la longitud a 20 caracteres
      setError(''); // Limpiar el mensaje de error si el campo no está vacío
    } else {
      setError('Por favor, ingrese solo letras y espacios.');
    }
  };

  const handleApellidoChange = (e) => {
    const regex = /^[A-Za-z\s]+$/;
    
    if (regex.test(e.target.value) || e.target.value === '') {
      setApellido(e.target.value.slice(0, 20)); // Limitar la longitud a 20 caracteres
      setError(''); // Limpiar el mensaje de error si el campo no está vacío
    } else {
      setError('Por favor, ingrese solo letras y espacios.');
    }
  };

  const handleTelefonoChange = (e) => {
    const regex = /^[0-9]*$/;
    if (regex.test(e.target.value) || e.target.value === '') {
      setTelefono(e.target.value.slice(0, 8)); // Limitar la longitud a 8 caracteres
      setError(''); // Limpiar el mensaje de error si el campo no está vacío
    } else {
      setError('Por favor, ingrese solo números.');
    }

    if (e.target.value.trim() === '') {
      setError('Por favor, ingrese el número de teléfono.');
    } else {
      setError(''); // Limpiar el mensaje de error si el campo no está vacío
    }
  };

  const handleNombreUsuarioChange = (e) => {
    const regex = /^[A-Za-z\s]+$/;
    if (regex.test(e.target.value) || e.target.value === '') {
      setNombre_Usuario(e.target.value.slice(0, 20)); // Limitar la longitud a 20 caracteres
      setError(''); // Limpiar el mensaje de error si el campo no está vacío
    } else {
      setError('Por favor, ingrese solo letras y espacios.');
    }

    if (e.target.value.trim() === '') {
      setError('Por favor, ingrese el usuario.');
    } else {
      setError(''); // Limpiar el mensaje de error si el campo no está vacío
    }
  };

  const handleContraseñaChange = (e) => {
    // Limitar la longitud a 8 caracteres
    setContraseña(e.target.value.slice(0, 8));

    if (e.target.value.trim() === '') {
      setError('Por favor, ingrese la contraseña.');
    } else {
      setError(''); // Limpiar el mensaje de error si el campo no está vacío
    }
  };

  // Función para manejar el envío del formulario
  const handleSubmit = async (e) => {
    e.preventDefault();

   // Validación de campos vacíos y notificar al usuario sobre los campos incompletos
    if (!nombre_Usuario || !nombre || !contraseña || !apellido || !telefono) {
    setError('Por favor, complete todos los campos.');
    return;
    }

    if (!nombre) {
      setError('Por favor, ingrese el nombre.');
      return;
    }

    if (!apellido) {
      setError('Por favor, ingrese el apellido.');
      return;
    }

    if (!telefono) {
      setError('Por favor, ingrese el número de teléfono.');
      return;
    }

    if (!nombre_Usuario) {
      setError('Por favor, ingrese el usuario.');
      return;
    }

    if (!contraseña) {
      setError('Por favor, ingrese la contraseña.');
      return;
    }

    // Crear un objeto con los datos del formulario
    const formData = {
      nombre,
      apellido,
      telefono,
      nombre_Usuario,
      contraseña,
      Rol,
    };

    try {
      // Realizar una solicitud HTTP al backend para enviar los datos
      const response = await fetch('http://localhost:5000/crud/createCliente', {
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
        setNombre('');
        setApellido('');
        setTelefono('');
        setNombre_Usuario('');
        setContraseña('');
      } else {
        alert('Error al registrar el cliente');
      }
    } catch (error) {
      console.error('Error en la solicitud:', error);
      alert('Error en la solicitud al servidor');
    }
  };

  return (
    <div>
      <Header Rol={userRol} />

      <Container>
        <Card className="margen-contenedor">
          <Card.Body>
            <Card.Title>Registro de Cliente</Card.Title>
            <Form className="mt-3" onSubmit={handleSubmit}>
              <Row className="g-3">
                <Col sm="6" md="6" lg="4">
                  {/* Campo de nombre */}
                  <FloatingLabel controlId="nombre" label="Nombre">
                    <Form.Control
                      type="text"
                      placeholder="Ingrese el nombre"
                      value={nombre}
                      onChange={handleNombreChange}
                    />
                  </FloatingLabel>
                  {error && error.includes('nombre') && <div className="text-danger">{error}</div>}
                </Col>

                <Col sm="6" md="6" lg="4">
                  {/* Campo de apellido */}
                  <FloatingLabel controlId="apellido" label="Apellido">
                    <Form.Control
                      type="text"
                      placeholder="Ingrese el apellido"
                      value={apellido}
                      onChange={handleApellidoChange}
                    />
                  </FloatingLabel>
                  {error && error.includes('apellido') && <div className="text-danger">{error}</div>}
                </Col>

                <Col sm="12" md="6" lg="4">
                  {/* Campo de teléfono */}
                  <FloatingLabel controlId="telefono" label="Teléfono">
                    <Form.Control
                      type="text"
                      placeholder="Ingrese el teléfono"
                      value={telefono}
                      onChange={handleTelefonoChange}
                    />
                  </FloatingLabel>
                  {error && error.includes('telefono') && <div className="text-danger">{error}</div>}
                </Col>

                <Col sm="12" md="6" lg="4">
                  {/* Campo de nombre de usuario */}
                  <FloatingLabel controlId="nombre_Usuario" label="Nombre Usuario">
                    <Form.Control
                      type="text"
                      placeholder="Ingrese el Nombre Usuario"
                      value={nombre_Usuario}
                      onChange={handleNombreUsuarioChange}
                    />
                  </FloatingLabel>
                  {error && error.includes('nombre_Usuario') && (
                    <div className="text-danger">{error}</div>
                  )}
                </Col>

                <Col sm="12" md="6" lg="4">
                  {/* Campo de contraseña */}
                  <FloatingLabel controlId="contraseña" label="Contraseña">
                    <Form.Control
                      type="text"
                      placeholder="Ingrese la contraseña"
                      value={contraseña}
                      onChange={handleContraseñaChange}
                    />
                  </FloatingLabel>
                  {error && error.includes('contraseña') && (
                    <div className="text-danger">{error}</div>
                  )}
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

export default Cliente;
