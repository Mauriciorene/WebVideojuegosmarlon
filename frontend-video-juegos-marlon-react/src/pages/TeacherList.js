import React, { useState, useEffect } from 'react';
import { Table, Button, Container, Card, Row, Col, Form, Modal, FloatingLabel  } from 'react-bootstrap';
import Header from '../components/Header';

function TeacherList() {
  const [docentes, setDocentes] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedDocente, setSelectedDocente] = useState({});
  const [formData, setFormData] = useState({
    Nombres: '',
    Apellidos: '',
    Fecha_Nacimiento: '',
    Direccion: '',
    Genero: '',
    Telefono: '',
    Correo: '',
    Especialidad: '',
  });

  // Función para abrir el modal y pasar los datos del docente seleccionado
  const openModal = (docente) => {
    setSelectedDocente(docente);

    // Formatea la fecha para el campo "Fecha_Nacimiento"
    const formattedFechaNacimiento = formatDateForInput(docente.Fecha_Nacimiento);

    setFormData({
      Nombres: docente.Nombres,
      Apellidos: docente.Apellidos,
      Fecha_Nacimiento: formattedFechaNacimiento,
      Direccion: docente.Direccion,
      Genero: docente.Genero,
      Telefono: docente.Telefono,
      Correo: docente.Correo,
      Especialidad: docente.Especialidad,
    });
    setShowModal(true);
  };

  function formatDateForInput(dateTimeString) {
    const date = new Date(dateTimeString);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Agregar ceros iniciales
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  }

  // Función para manejar cambios en el formulario
  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const loadDocentes = () => {
    fetch('http://localhost:5000/crud/readDocentePersona')
      .then((response) => response.json())
      .then((data) => setDocentes(data))
      .catch((error) => console.error('Error al obtener los docentes y personas:', error));
  };


  // Función para enviar el formulario de actualización
  const handleUpdate = () => {
    // Realiza la solicitud PUT al servidor para actualizar el registro
    fetch(`http://localhost:5000/crud/updateDocente/${selectedDocente.ID_Persona}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    })
      .then((response) => {
        if (response.ok) {
          // La actualización fue exitosa, puedes cerrar el modal y refrescar la lista de docentes
          setShowModal(false);
          loadDocentes(); // Cargar la lista de docentes actualizada
        }
      })
      .catch((error) => console.error('Error al actualizar el registro:', error));
  };

  // Función para eliminar un docente
  const handleDelete = (idPersona) => {
    const confirmation = window.confirm('¿Seguro que deseas eliminar este docente?');
    if (confirmation) {
      // Realiza la solicitud DELETE al servidor para eliminar el docente
      fetch(`http://localhost:5000/crud/deleteDocentePersona/${idPersona}`, {
        method: 'DELETE',
      })
        .then((response) => {
          if (response.ok) {
            // La eliminación fue exitosa, refresca la lista de docentes
            loadDocentes();
          }
        })
        .catch((error) => console.error('Error al eliminar el docente:', error));
    }
  };

  // Realiza una solicitud GET al servidor para obtener los docentes
  useEffect(() => {
    fetch('http://localhost:5000/crud/readDocentePersona')
      .then((response) => response.json())
      .then((data) => setDocentes(data))
      .catch((error) => console.error('Error al obtener los docentes y personas:', error));
  }, []);

  return (
    <div>
      <Header />

      <Card className="m-3">
        <Card.Body>
          <Card.Title className="mb-3">Listado de Docente</Card.Title>
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>ID</th>
                <th>Nombres</th>
                <th>Apellidos</th>
                <th>Fecha de Nacimiento</th>
                <th>Dirección</th>
                <th>Género</th>
                <th>Teléfono</th>
                <th>Correo</th>
                <th>Especialidad</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {docentes.map((docente) => (
                <tr key={docente.ID_Docente}>
                  <td>{docente.ID_Docente}</td>
                  <td>{docente.Nombres}</td>
                  <td>{docente.Apellidos}</td>
                  <td>{formatDateForInput(docente.Fecha_Nacimiento)}</td>
                  <td>{docente.Direccion}</td>
                  <td>{docente.Genero}</td>
                  <td>{docente.Telefono}</td>
                  <td>{docente.Correo}</td>
                  <td>{docente.Especialidad}</td>
                  <td>
                    <Button variant="primary" onClick={() => openModal(docente)}>Actualizar</Button>
                    <Button variant="danger" onClick={() => handleDelete(docente.ID_Persona)}>Eliminar</Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Card.Body>
      </Card>

      <Modal show={showModal} onHide={() => setShowModal(false)} size="lg">
        <Modal.Header closeButton>
          <Modal.Title>Actualizar Docente</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Card className="mt-3">
            <Card.Body>
              <Card.Title>Registro de Docente</Card.Title>
              <Form className="mt-3">
                <Row className="g-3">

                  <Col sm="6" md="6" lg="4">
                    <FloatingLabel controlId="nombres" label="Nombres">
                      <Form.Control
                        type="text"
                        placeholder="Ingrese los nombres"
                        name="Nombres"
                        value={formData.Nombres}
                        onChange={handleFormChange}
                      />
                    </FloatingLabel>
                  </Col>

                  <Col sm="6" md="6" lg="4">
                    <FloatingLabel controlId="apellidos" label="Apellidos">
                      <Form.Control
                        type="text"
                        placeholder="Ingrese los apellidos"
                        name="Apellidos"
                        value={formData.Apellidos}
                        onChange={handleFormChange}
                      />
                    </FloatingLabel>
                  </Col>

                  <Col sm="12" md="6" lg="4">
                    <FloatingLabel controlId="fechaNacimiendo" label="Fecha de nacimiento">
                      <Form.Control 
                        type="date" 
                        placeholder="Seleccione la fecha de nacimiento"
                        name="Fecha_Nacimiento"
                        value={formData.Fecha_Nacimiento}
                        onChange={handleFormChange} 
                      />
                    </FloatingLabel>
                  </Col>

                  <Col sm="12" md="6" lg="4">
                    <FloatingLabel controlId="genero" label="Género">
                      <Form.Select 
                        aria-label="Genero"
                        name="Genero"
                        value={formData.Genero}
                        onChange={handleFormChange}
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
                        name="Direccion"
                        value={formData.Direccion}
                        onChange={handleFormChange} 
                      />
                    </FloatingLabel>
                  </Col>

                  <Col sm="12" md="6" lg="4">
                    <FloatingLabel controlId="telefono" label="Teléfono">
                      <Form.Control 
                        type="number" 
                        placeholder="Ingrese el teléfono"
                        name="Telefono"
                        value={formData.Telefono}
                        onChange={handleFormChange} 
                      />
                    </FloatingLabel>
                  </Col>

                  <Col sm="12" md="6" lg="4">
                    <FloatingLabel controlId="correo" label="Correo">
                      <Form.Control 
                        type="email" 
                        placeholder="Ingrese el correo"
                        name="Correo"
                        value={formData.Correo}
                        onChange={handleFormChange} 
                      />
                    </FloatingLabel>
                  </Col>  

                  <Col sm="12" md="6" lg="4">
                    <FloatingLabel controlId="Especialidad" label="Especialidad">
                      <Form.Select 
                        aria-label="Especialidad"
                        value={formData.Especialidad}
                        onChange={handleFormChange}
                        name="Especialidad"
                      >
                        <option>Seleccione la especialidad</option>
                        <option value="Matemáticas">Matemáticas</option>
                        <option value="Historia">Historia</option>
                        <option value="Geografía">Geografía</option>
                      </Form.Select>
                    </FloatingLabel>
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

export default TeacherList;
