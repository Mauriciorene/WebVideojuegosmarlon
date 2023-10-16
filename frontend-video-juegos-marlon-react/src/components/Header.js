import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Navbar, Nav, Offcanvas, Button, NavDropdown, Container } from 'react-bootstrap';
import { Link } from 'react-router-dom';

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
          <Navbar.Brand href="#home">Videojuegos Marlon</Navbar.Brand>
          <Navbar.Toggle
            aria-controls="basic-navbar-nav"
            style={{ display: 'none' }}
            className="d-sm-none d-xs-none"
          />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ml-auto">

              <Nav.Link>
                <Link to="/" className="link-unstyled">Inicio</Link>
              </Nav.Link>

              <Nav.Link>
                <Link to="/about" className="link-unstyled">Informacion</Link>
              </Nav.Link>

              <NavDropdown title="Productos" id="productos">
                <NavDropdown.Item>
                  <Link to="/customer" className="link-unstyled">Registrar Producto</Link>
                </NavDropdown.Item>

                <NavDropdown.Item>
                  <Link to="/actualizar-producto" className="link-unstyled">Listar Productos</Link>
                </NavDropdown.Item>
              </NavDropdown>

              <NavDropdown title="Categoria" id="categoria">
                <NavDropdown.Item>
                  <Link to="/customer" className="link-unstyled">Registrar Categoria</Link>
                </NavDropdown.Item>

                <NavDropdown.Item>
                  <Link to="/actualizar-categoria" className="link-unstyled">Ver Categorias</Link>
                </NavDropdown.Item>
              </NavDropdown>

              <NavDropdown title="Ventas" id="ventas">
                <NavDropdown.Item>
                  <Link to="/teacher" className="link-unstyled">Registrar Ventas</Link>
                </NavDropdown.Item>

                <NavDropdown.Item>
                  <Link to="/teacherList" className="link-unstyled">Listar Ventas</Link>
                </NavDropdown.Item>
              </NavDropdown>

            </Nav>
          </Navbar.Collapse>
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

            <Nav.Link>
              <Link to="/" className="link-unstyled">Inicio</Link>
            </Nav.Link>

            <Nav.Link>
              <Link to="/about" className="link-unstyled">about</Link>
            </Nav.Link>

            <NavDropdown title="Productos" id="productos">
              <NavDropdown.Item>
                <Link to="/customer" className="link-unstyled">Registrar Producto</Link>
              </NavDropdown.Item>
              <NavDropdown.Item>
                <Link to="/actualizar-producto" className="link-unstyled">Listar Productos</Link>
              </NavDropdown.Item>
            </NavDropdown>

            <NavDropdown title="Categoria" id="categoria">
              <NavDropdown.Item>
                <Link to="/customer" className="link-unstyled">Registrar Categoria</Link>
              </NavDropdown.Item>
              <NavDropdown.Item>
                <Link to="/actualizar-categoria" className="link-unstyled">Ver Categoria</Link>
              </NavDropdown.Item>
            </NavDropdown>

            <NavDropdown title="Ventas" id="ventas">
              <NavDropdown.Item>
                <Link to="/teacher" className="link-unstyled">Registrar Ventas</Link>
              </NavDropdown.Item>

              <NavDropdown.Item>
                <Link to="/teacherList" className="link-unstyled">Listar Ventas</Link>
              </NavDropdown.Item>
            </NavDropdown>

          </Nav>
        </Offcanvas.Body>
      </Offcanvas>
    </div>
  );
}

export default Header;