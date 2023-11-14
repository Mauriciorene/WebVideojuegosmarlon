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
  const [errors, setErrors] = useState({});

  const Rol = 'cliente';

  // Validar y limitar longitud de caracteres para el Cliente
  const handleNombreChange = (e) => {
    // Validar que solo se ingresen letras y espacios
    const regex = /^[A-Za-z\s]+$/;

    // Validar longitud máxima
    if (regex.test(e.target.value) || e.target.value === '') {
      // Limitar la longitud a 20 caracteres
      setNombre(e.target.value.slice(0, 20));
      clearError('nombre'); // Limpiar el mensaje de error si el campo no está vacío
    } else {
      setError('nombre', 'Por favor, ingrese solo letras y espacios.');
    }
  };

  // Validar y limitar longitud de caracteres para el Apellido
  const handleApellidoChange = (e) => {
    // Validar que solo se ingresen letras y espacios 
    const regex = /^[A-Za-z\s]+$/;

    // Validar longitud máxima
    if (regex.test(e.target.value) || e.target.value === '') {
      // Limitar la longitud a 20 caracteres
      setApellido(e.target.value.slice(0, 20));
      clearError('apellido'); // Limpiar el mensaje de error si el campo no está vacío
    } else {
      setError('apellido', 'Por favor, ingrese solo letras y espacios.');
    }
  };

  // Validar y limitar longitud de caracteres para el telefono
  const handleTelefonoChange = (e) => {
    // Validar que solo se ingresen números
    const regex = /^[0-9]*$/;

    // Validar longitud máxima
    if (regex.test(e.target.value) || e.target.value === '') {
      // Limitar la longitud a 8 caracteres
      setTelefono(e.target.value.slice(0, 8));
      clearError('telefono'); // Limpiar el mensaje de error si el campo no está vacío
    } else {
      setError('telefono', 'Por favor, ingrese solo números.');
    }

    if (e.target.value.trim() === '') {
      setError('telefono', 'Por favor, ingrese el número de teléfono.');
    } else {
      clearError('telefono'); // Limpiar el mensaje de error si el campo no está vacío
    }
  };

  // Validar y limitar longitud de caracteres para el nombre usuario
  const handleNombreUsuarioChange = (e) => {
    // Validar que solo se ingresen letras yespacios
    const regex = /^[A-Za-z\s]+$/;

    if (regex.test(e.target.value) || e.target.value === '') {
      // Limitar la longitud a 20 caracteres
      setNombre_Usuario(e.target.value.slice(0, 20));
      clearError('nombre_Usuario'); // Limpiar el mensaje de error si el campo no está vacío
    } else {
      setError('nombre_Usuario', 'Por favor, ingrese solo letras y espacios.');
    }

    if (e.target.value.trim() === '') {
      setError('nombre_Usuario', 'Por favor, ingrese el usuario.');
    } else {
      clearError('nombre_Usuario'); // Limpiar el mensaje de error si el campo no está vacío
    }
  };

  // Validar y limitar longitud de caracteres para la contraseña
  const handleContraseñaChange = (e) => {
    // Limitar la longitud a 8 caracteres
    setContraseña(e.target.value.slice(0, 8));

    if (e.target.value.trim() === '') {
      setError('contraseña', 'Por favor, ingrese la contraseña.');
    } else {
      clearError('contraseña'); // Limpiar el mensaje de error si el campo no está vacío
    }
  };

  // Función para manejar el envío del formulario
  const handleSubmit = async (e) => {
    e.preventDefault();

    const newErrors = validateForm();
    if (Object.keys(newErrors).length === 0) {
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
          clearFields();
        } else {
          // Capturar errores específicos del servidor si es necesario
          const responseData = await response.json(); // Si el servidor envía información adicional sobre el error
          console.error('Error al registrar el cliente:', responseData.error);
          // Actualizar el estado con el mensaje de error
          setErrors({ general: 'Error al registrar el cliente' });
        }
      } catch (error) {
        console.error('Error en la solicitud:', error);
        // Actualizar el estado con el mensaje de error
        setErrors({ general: 'Error en la solicitud al servidor' });
      }
    } else {
      // Actualizar el estado con los nuevos errores
      setErrors(newErrors);
    }
  };

  // Validación de campos vacíos y notificar al usuario sobre los campos incompletos
  const validateForm = () => {
    const newErrors = {};

    if (!nombre.trim()) {
      newErrors.nombre = 'Por favor, ingrese el nombre.';
    }

    if (!apellido.trim()) {
      newErrors.apellido = 'Por favor, ingrese el apellido.';
    }

    if (!telefono.trim()) {
      newErrors.telefono = 'Por favor, ingrese el número de teléfono.';
    }

    if (!nombre_Usuario.trim()) {
      newErrors.nombre_Usuario = 'Por favor, ingrese el usuario.';
    }

    if (!contraseña.trim()) {
      newErrors.contraseña = 'Por favor, ingrese la contraseña.';
    }

    return newErrors;
  };

  const setError = (fieldName, errorMessage) => {
    setErrors((prevErrors) => ({ ...prevErrors, [fieldName]: errorMessage }));
  };

  const clearError = (fieldName) => {
    setErrors((prevErrors) => {
      const newErrors = { ...prevErrors };
      delete newErrors[fieldName];
      return newErrors;
    });
  };

  const clearFields = () => {
    setNombre('');
    setApellido('');
    setTelefono('');
    setNombre_Usuario('');
    setContraseña('');
    setErrors({});
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
                  {errors.nombre && <div className="text-danger">{errors.nombre}</div>}
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
                  {errors.apellido && <div className="text-danger">{errors.apellido}</div>}
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
                  {errors.telefono && <div className="text-danger">{errors.telefono}</div>}
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
                  {errors.nombre_Usuario && <div className="text-danger">{errors.nombre_Usuario}</div>}
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
                  {errors.contraseña && <div className="text-danger">{errors.contraseña}</div>}
                </Col>
              </Row>
              {errors.general && <div className="text-danger">{errors.general}</div>}
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
