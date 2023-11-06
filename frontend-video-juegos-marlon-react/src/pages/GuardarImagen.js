import React, { useState } from 'react';
import { Form, Row, Col, Container, Card, Button } from 'react-bootstrap';
import axios from 'axios';
import Header from '../components/Header';
import '../styles/App.css';

function GuardarImagen(){

    const [selectedFile, setSelectedFile] = useState(null);

    const handleFileChange = (event) => {
        setSelectedFile(event.target.files[0]);
    };

    const handleFileUpload = async (e) => {
        e.preventDefault();

        try {
        const formDataImage = new FormData();
        formDataImage.append('image', selectedFile);

        const response = await axios.post('http://localhost:5000/crud/guardarImagen', formDataImage, {
            headers: { 'Content-Type': 'multipart/form-data' },
        });
        setSelectedFile(null);
        alert('Imagen guardada', response.data.imageUrl);
        //window.location.reload();
        } catch (error) {
        console.error('Error al cargar la imagen:', error);
        }
    };


    return(
        <div>
        <Header />
        
        <Container>
            <Card className="mt-3">
            <Card.Body>
            <Card.Title>Registro de imagenes</Card.Title>
            <Form className="mt-3" onSubmit={handleFileUpload} >
                <Row className="g-3">
                <Col sm="6" md="6" lg="6">
                    <Form.Group controlId="selectedFile" className="mb-3" >
                    <Form.Control 
                        type="file" 
                        accept=".jpg, .png, .jpeg"
                        size="lg"
                        onChange={handleFileChange}
                        />
                    </Form.Group>
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

export default GuardarImagen;