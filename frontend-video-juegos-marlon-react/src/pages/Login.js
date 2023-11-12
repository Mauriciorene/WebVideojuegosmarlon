import React, { useState } from 'react';
import { Form, Button, Card, Container, Row, Col, FloatingLabel } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

const Login = ({ setRol }) => {
  const navigate = useNavigate();

  const [nombre_Usuario, setNombre_Usuario] = useState('');
  const [contraseña, setContrasena] = useState('');
  const [error, setError] = useState('');

  // Función para manejar el envío del formulario
  const handleSubmit = async event => {
    event.preventDefault();

    // // Validación de campos vacíos y notificar al usuario sobre los campos incompletos
    
    if (!nombre_Usuario && !contraseña) {
      setError('Por favor, complete ambos campos.');
      return;
    }

    if (!nombre_Usuario) {
      setError('Por favor, ingrese su usuario.');
      return;
    }

    if (!contraseña) {
      setError('Por favor, ingrese su contraseña.');
      return;
    }

    // Objeto con los datos del formulario
    const formData = {
      nombre_Usuario,
      contraseña
    };

    try {
      // Realiza la solicitud POST al servidor para autenticar al usuario
      const response = await fetch('http://localhost:5000/crud/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });
  
      if (response.ok) {
        const { Rol } = await response.json();

        setRol(Rol); // Actualiza el estado del rol solo si las credenciales son correctas 
        navigate('/home');
      } else {
        console.log('Credenciales incorrectas');
        alert('¡Credenciales incorrectas!');
      }
    } catch (error) {
      console.error('Error en la solicitud: ', error);
    }
  };

//Validacion y limite de lingitud de caracteres para el usuario------------------------------------------

//Validacion y limite de longitud de caracteres para el usuario------------------------------------------
const handleNombre_UsuarioChange = (e) => {
  // Validar que solo se ingresen letras y espacios
  const regex = /^[A-Za-z\s]+$/;

  // Validar longitud máxima
  if (regex.test(e.target.value) || e.target.value === '') {
    setNombre_Usuario(e.target.value.slice(0, 20)); // Limitar la longitud a 20 caracteres
  }
};

//Validacion y limite de lingitud de caracteres para la Contraseña------------------------------------------

// Función para validar y limitar la longitud de la contraseña
const handleContrasenaChange = (e) => {
  // Validar que solo se ingresen números
  const regex = /^[0-9]+$/;

  // Validar longitud máxima
  if (regex.test(e.target.value) || e.target.value === '') {
    setContrasena(e.target.value.slice(0, 8)); // Limitar la longitud a 8 caracteres
  }
};
  

  return (
    <Container className="d-flex justify-content-center align-items-center" style={{ height: "100vh" }}>
      <Row className="justify-content-md-center">
        <Col md={12}>
          <Card>
            <Card.Body>
              <Card.Title className="mb-3">Inicio de Sesión</Card.Title>
              <Form onSubmit={handleSubmit}>

                <Row>
                  <Col sm="12" md="12" lg="12" className="mb-3">
                    <FloatingLabel controlId="nombre_Usuario" label="Ingrese su usuario">
                      <Form.Control
                        placeholder="Ingrese su usuario"
                        type="text"
                        value={nombre_Usuario}
                        onChange={handleNombre_UsuarioChange}
                      />
                    </FloatingLabel>
                    {error && error.includes('usuario') && <div className="text-danger">{error}</div>}
                  </Col>

                  <Col sm="12" md="12" lg="12">
                    <FloatingLabel controlId="contraseña" label="Ingrese su contraseña">
                      <Form.Control
                        placeholder="Ingrese su contraseña"
                        type="password"
                        value={contraseña}
                        onChange={handleContrasenaChange}
                      />
                    </FloatingLabel>
                    {error && error.includes('contraseña') && <div className="text-danger">{error}</div>}
                  </Col>
                </Row>

                {/* Botón de inicio de sesión */}
                <div className="center-button">
                  <Button variant="primary" type="submit" block className="mt-3">
                    Iniciar Sesión
                  </Button>
                </div>
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default Login;
