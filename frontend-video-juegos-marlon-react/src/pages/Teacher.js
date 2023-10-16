import React, { useState } from 'react';
import { Form, Row, Col, Container, FloatingLabel, Card, Button } from 'react-bootstrap';
import Header from '../components/Header';
import '../styles/App.css';

function Teacher() {

  // Crear un estado para cada campo del formulario
  const [Nombres, setNombres] = useState('');
  const [Apellidos, setApellidos] = useState('');
  const [Fecha_Nacimiento, setFechaNacimiento] = useState('');
  const [Direccion, setDireccion] = useState('');
  const [Genero, setGenero] = useState('');
  const [Telefono, setTelefono] = useState('');
  const [Correo, setCorreo] = useState('');
  const [Especialidad, setEspecialidad] = useState('');

  // Función para manejar el envío del formulario
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Crear un objeto con los datos del formulario
    const formData = {
      Nombres,
      Apellidos,
      Fecha_Nacimiento,
      Direccion,
      Genero,
      Telefono,
      Correo,
      Especialidad,
    };

    try {
      // Realizar una solicitud HTTP al backend para enviar los datos
      const response = await fetch('http://localhost:5000/crud/createDocente', {
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
        setNombres('');
        setApellidos('');
        setFechaNacimiento('');
        setDireccion('');
        setGenero('');
        setTelefono('');
        setCorreo('');
        setEspecialidad('');
      } else {
        alert('Error al registrar el cliente');
      }
    } catch (error) {
      console.error('Error en la solicitud:', error);
      alert('Error en la solicitud al servidor');
    }
  };

  return(
    <div>
      <Header />
      
      <Container>
        <Card className="mt-3">
          <Card.Body>
            <Card.Title>Registro de Docente</Card.Title>
            <Form className="mt-3" onSubmit={handleSubmit}>
              <Row className="g-3">

                <Col sm="6" md="6" lg="4">
                  <FloatingLabel controlId="nombres" label="Nombres">
                    <Form.Control
                      type="text"
                      placeholder="Ingrese los nombres"
                      value={Nombres}
                      onChange={(e) => setNombres(e.target.value)}
                    />
                  </FloatingLabel>
                </Col>

                <Col sm="6" md="6" lg="4">
                  <FloatingLabel controlId="apellidos" label="Apellidos">
                    <Form.Control
                      type="text"
                      placeholder="Ingrese los apellidos"
                      value={Apellidos}
                      onChange={(e) => setApellidos(e.target.value)}
                    />
                  </FloatingLabel>
                </Col>

                <Col sm="12" md="6" lg="4">
                  <FloatingLabel controlId="fechaNacimiendo" label="Fecha de nacimiento">
                    <Form.Control 
                      type="date" 
                      placeholder="Seleccione la fecha de nacimiento"
                      value={Fecha_Nacimiento}
                      onChange={(e) => setFechaNacimiento(e.target.value)} 
                    />
                  </FloatingLabel>
                </Col>

                <Col sm="12" md="6" lg="4">
                  <FloatingLabel controlId="genero" label="Género">
                    <Form.Select 
                      aria-label="Genero"
                      value={Genero}
                      onChange={(e) => setGenero(e.target.value)}
                    >
                      <option>Seleccione el género</option>
                      <option value="M">Mujer</option>
                      <option value="H">Hombre</option>
                    </Form.Select>
                  </FloatingLabel>
                </Col>

                <Col sm="12" md="6" lg="8">
                  <FloatingLabel controlId="direccion" label="Dirección">
                    <Form.Control 
                      type="text" 
                      placeholder="Ingrese la dirección"
                      value={Direccion}
                      onChange={(e) => setDireccion(e.target.value)} 
                    />
                  </FloatingLabel>
                </Col>

                <Col sm="12" md="6" lg="4">
                  <FloatingLabel controlId="telefono" label="Teléfono">
                    <Form.Control 
                      type="number" 
                      placeholder="Ingrese el teléfono"
                      value={Telefono}
                      onChange={(e) => setTelefono(e.target.value)} 
                    />
                  </FloatingLabel>
                </Col>

                <Col sm="12" md="6" lg="4">
                  <FloatingLabel controlId="correo" label="Correo">
                    <Form.Control 
                      type="email" 
                      placeholder="Ingrese el correo"
                      value={Correo}
                      onChange={(e) => setCorreo(e.target.value)} 
                    />
                  </FloatingLabel>
                </Col>  

                <Col sm="12" md="6" lg="4">
                  <FloatingLabel controlId="Especialidad" label="Especialidad">
                    <Form.Select 
                      aria-label="Especialidad"
                      value={Especialidad}
                      onChange={(e) => setEspecialidad(e.target.value)}
                    >
                      <option>Seleccione la especialidad</option>
                      <option value="Matemáticas">Matemáticas</option>
                      <option value="Historia">Historia</option>
                      <option value="Geografía">Geografía</option>
                    </Form.Select>
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

export default Teacher;