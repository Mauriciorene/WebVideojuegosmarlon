import React, { useState } from 'react';
import { Form, Row, Col, Container, FloatingLabel, Card, Button } from 'react-bootstrap';
import Header from '../components/Header';
import '../styles/App.css';

function Cliente({userRol}) {

  // Crear un estado para cada campo del formulario
  const [nombre, setNombre] = useState('');
  const [apellido, setApellido] = useState('');
  const [telefono, setTelefono] = useState('');
  const [nombre_Usuario, setNombre_Usuario] = useState('');
  const [contraseña, setContraseña] = useState('');

  const Rol = 'cliente';

  //Validacion y limite de lingitud de caracteres para el Cliente------------------------------------------
  const handleNombreChange = (e) => {
    // Validar que solo se ingresen letras y espacios
    const regex = /^[A-Za-z\s]+$/;

        // Validar longitud máxima
      if (regex.test(e.target.value) || e.target.value === '') {
      setNombre(e.target.value.slice(0, 20)); // Limitar la longitud a 20 caracteres
    }
  };

    //Validacion y limite de lingitud de caracteres para el Apellido------------------------------------------
  const handleApellidoChange = (e) => {
    // Validar que solo se ingresen letras y espacios
    const regex = /^[A-Za-z\s]+$/;
  
    // Validar longitud máxima
    if (regex.test(e.target.value) || e.target.value === '') {
      setApellido(e.target.value.slice(0, 20)); // Limitar la longitud a 20 caracteres
    }
  };

    //Validacion y limite de lingitud de caracteres para el Telefono------------------------------------------
  const handleTelefonoChange = (e) => {
    // Validar que solo se ingresen números
    const regex = /^[0-9]*$/;
  
    // Validar longitud máxima
    if (regex.test(e.target.value) || e.target.value === '') {
      setTelefono(e.target.value.slice(0, 8)); // Limitar la longitud a 8 caracteres
    }
  };
  
    //Validacion y limite de lingitud de caracteres para el Nombre_usuario------------------------------------------
  const handleNombreUsuarioChange = (e) => {
    // Validar que solo se ingresen letras y espacios
    const regex = /^[A-Za-z\s]+$/;
  
    // Validar longitud máxima
    if (regex.test(e.target.value) || e.target.value === '') {
      setNombre_Usuario(e.target.value.slice(0, 20)); // Limitar la longitud a 20 caracteres
    }
  };

    //Validacion y limite de lingitud de caracteres para la Contraseña------------------------------------------
  const handleContraseñaChange = (e) => {
    // Validar que solo se ingresen números
    const regex = /^[0-9]*$/;
  
    // Validar longitud máxima
    if (regex.test(e.target.value) || e.target.value === '') {
      setContraseña(e.target.value.slice(0, 8)); // Limitar la longitud a 8 caracteres
    }
  };

  // Función para manejar el envío del formulario
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Crear un objeto con los datos del formulario
    const formData = {
      nombre,
      apellido,
      telefono,
      nombre_Usuario,
      contraseña,
      Rol
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
      <Header Rol={ userRol } />

      <Container>
        <Card className="margen-contenedor">
          <Card.Body>
            <Card.Title>Registro de Cliente</Card.Title>
            <Form className="mt-3" onSubmit={handleSubmit}>
              <Row className="g-3">

                <Col sm="6" md="6" lg="4">
                  <FloatingLabel controlId="nombre" label="Nombre">
                    <Form.Control
                      type="text"
                      placeholder="Ingrese el nombre"
                      value={nombre}
                      onChange={handleNombreChange}
                    />
                  </FloatingLabel>
                </Col>

                <Col sm="6" md="6" lg="4">
                  <FloatingLabel controlId="apellido" label="Apellido">
                    <Form.Control
                      type="text"
                      placeholder="Ingrese el apellido"
                      value={apellido}
                      onChange={handleApellidoChange}
                    />
                  </FloatingLabel>
                </Col>

                <Col sm="12" md="6" lg="4">
                  <FloatingLabel controlId="telefono" label="Teléfono">
                    <Form.Control
                      type="text"
                      placeholder="Ingrese el teléfono"
                      value={telefono}
                      onChange={handleTelefonoChange}
                    />
                  </FloatingLabel>
                </Col>

                <Col sm="12" md="6" lg="4">
                  <FloatingLabel controlId="nombre_Usuario" label="Nombre Usuario">
                    <Form.Control
                      type="text"
                      placeholder="Ingrese el Nombre Usuario"
                      value={nombre_Usuario}
                      onChange={handleNombreUsuarioChange}
                    />
                  </FloatingLabel>
                </Col>

                <Col sm="12" md="6" lg="4">
                  <FloatingLabel controlId="contraseña" label="Contraseña">
                    <Form.Control
                      type="text"
                      placeholder="Ingrese el contraseña"
                      value={contraseña}
                      onChange={handleContraseñaChange}
                    />
                  </FloatingLabel>
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
