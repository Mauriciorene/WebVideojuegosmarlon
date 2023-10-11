import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css'; // Importa el CSS de Bootstrap
import Navbar from 'react-bootstrap/Navbar'; // Importa el componente Navbar de Bootstrap
import Nav from 'react-bootstrap/Nav'; // Importa el componente Nav de Bootstrap
import Offcanvas from 'react-bootstrap/Offcanvas'; // Importa el componente Offcanvas de Bootstrap
import Button from 'react-bootstrap/Button'; // Importa el componente Button de Bootstrap
import NavDropdown from 'react-bootstrap/NavDropdown'; // Importa el componente NavDropDown de Bootstrap
import Container from 'react-bootstrap/Container'; // Importa el componente Container de Bootstrap


function Header() {
  const [showMenu, setShowMenu] = useState(false);

  const toggleMenu = () => {
    setShowMenu(!showMenu);
  };

  return (
    <div>
      {/* Navbar principal */}
      <Navbar className="navbar-color" variant="dark" expand="md">
        <Container>
          <Navbar.Brand href="#home">VideoJuegos Marlon</Navbar.Brand>
          <Navbar.Toggle 
            aria-controls="basic-navbar-nav"
            style={{ display: 'none' }}
            className="d-sm-none d-xs-none"
          />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ml-auto">
              <Nav.Link href="#home">Inicio</Nav.Link>
              <NavDropdown title="Productos" id="productos">
                <NavDropdown.Item href="#">Registrar Producto</NavDropdown.Item>
                <NavDropdown.Item href="#">
                  Actualizar Producto
                </NavDropdown.Item>
                <NavDropdown.Item href="#">Ver Producto</NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item href="#">
                  Eliminar Producto
                </NavDropdown.Item>
              </NavDropdown>
              <NavDropdown title="Catálogo" id="catálogo">
                <NavDropdown.Item href="#">Registrar Nuevo Catálogo</NavDropdown.Item>
                <NavDropdown.Item href="#">
                  Actualizar Catálogo
                </NavDropdown.Item>
                <NavDropdown.Item href="#">Ver Catálogo</NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item href="#">
                  Eliminar Catálogo
                </NavDropdown.Item>
              </NavDropdown>
              <NavDropdown title="Ventas" id="ventas">
                <NavDropdown.Item href="#">Registrar Nueva Venta</NavDropdown.Item>
                <NavDropdown.Item href="#">
                  Actualizar Venta
                </NavDropdown.Item>
                <NavDropdown.Item href="#">Ver Ventas</NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item href="#">
                  Eliminar Registro de una venta
                </NavDropdown.Item>
              </NavDropdown>
            </Nav>
          </Navbar.Collapse>
          {/* Botón para mostrar/ocultar el menú lateral */}
          <Button
            variant="outline-light"
            onClick={toggleMenu}
            className="d-md-none d-block"
            aria-controls="basic-navbar-nav"
            aria-expanded={showMenu ? 'true' : 'false'}
          >
            Menú
          </Button>
        </Container>
      </Navbar>


      {/* Menú lateral (Offcanvas) */}
      <Offcanvas show={showMenu} onHide={toggleMenu} placement="start">
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>Menú</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          <Nav className="flex-column">
            <Nav.Link href="#home">Inicio</Nav.Link>
            <NavDropdown title="Productos" id="productos">
              <NavDropdown.Item href="#">Registrar Producto</NavDropdown.Item>
              <NavDropdown.Item href="#">
                Actualizar Producto
              </NavDropdown.Item>
              <NavDropdown.Item href="#">Ver Producto</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href="#">
                Eliminar Producto
              </NavDropdown.Item>
            </NavDropdown>
            <NavDropdown title="Catálogo" id="catálogo">
              <NavDropdown.Item href="#">Registrar Nuevo Catálogo</NavDropdown.Item>
              <NavDropdown.Item href="#">
                Actualizar Catálogo
              </NavDropdown.Item>
              <NavDropdown.Item href="#">Ver Catálogo</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href="#">
                Eliminar Catálogo
              </NavDropdown.Item>
            </NavDropdown>
            <NavDropdown title="Ventas" id="ventas">
              <NavDropdown.Item href="#">Registrar Nueva Venta</NavDropdown.Item>
              <NavDropdown.Item href="#">
                Actualizar Venta
              </NavDropdown.Item>
              <NavDropdown.Item href="#">Ver Venta</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href="#">
                Eliminar Registro de una Venta
              </NavDropdown.Item>
            </NavDropdown>
          </Nav>
        </Offcanvas.Body>
      </Offcanvas>
    </div>
  );
}

export default Header;