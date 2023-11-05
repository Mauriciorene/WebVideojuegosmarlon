import React, { useState } from 'react';
import { Form, Button, Card, Container, Row, Col, FloatingLabel } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

const Login = ({ setRol }) => {
  const navigate = useNavigate();

  const [nombre_Usuario, setNombre_Usuario] = useState('');
  const [apellido, setApellido] = useState('');
  const [contraseña, setContrasena] = useState('');

  const handleSubmit = async event => {
    event.preventDefault(); 

    // Objeto con los datos del formulario
    const formData = {
      nombre_Usuario,
      apellido,
      contraseña
    };

    try {
      const response = await fetch('http://localhost:5000/crud/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });
  
      if (response.ok) {
        const { rol } = await response.json();
        
        console.log('Rol establecido:', rol); // Mensaje de depuración

        setRol(rol); // Actualiza el estado del rol solo si las credenciales son correctas
        
        navigate('/home');
      } else {
        console.log('Credenciales incorrectas');
        alert('¡Credenciales incorrectas!');
      }
    } catch (error) {
      console.error('Error en la solicitud: ', error);
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
                        onChange={(e) => setNombre_Usuario(e.target.value)}
                      />
                    </FloatingLabel>
                  </Col>

                  <Col sm="12" md="12" lg="12" className="mb-3">
                    <FloatingLabel controlId="apellido" label="Ingrese su apellido">
                      <Form.Control
                        placeholder="Ingrese su apellido"
                        type="text"
                        value={apellido}
                        onChange={(e) => setApellido(e.target.value)}
                      />
                    </FloatingLabel>
                  </Col>

                  <Col sm="12" md="12" lg="12">
                    <FloatingLabel controlId="contrasena" label="Ingrese su contraseña">
                      <Form.Control
                        placeholder="Ingrese su contraseña"
                        type="password"
                        value={contraseña}
                        onChange={(e) => setContrasena(e.target.value)}
                      />
                    </FloatingLabel>
                  </Col>
                </Row>

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
